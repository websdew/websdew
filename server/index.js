import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// basic mail transporter using Ethereal in development
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

function sendEmail(to, subject, text) {
  transporter.sendMail({ from: 'noreply@example.com', to, subject, text })
    .then(info => console.log('Email sent', info.messageId))
    .catch(err => console.error('Email error', err.message));
}

function sendSMS(to, message) {
  console.log(`SMS to ${to}: ${message}`);
}

app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: process.env.DB_PATH || './database.db',
    driver: sqlite3.Database
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'client'
  )`);
  try {
    await db.exec('ALTER TABLE users ADD COLUMN role TEXT DEFAULT "client"');
  } catch (e) {}
  await db.exec(`CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY,
    score INTEGER DEFAULT 0,
    active_projects INTEGER DEFAULT 0,
    history INTEGER DEFAULT 0,
    FOREIGN KEY(id) REFERENCES users(id)
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    client_id INTEGER,
    partner_id INTEGER,
    status TEXT DEFAULT 'pool',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(client_id) REFERENCES users(id),
    FOREIGN KEY(partner_id) REFERENCES users(id)
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    partner_id INTEGER,
    signed INTEGER DEFAULT 0,
    contract_text TEXT,
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(partner_id) REFERENCES users(id)
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    partner_id INTEGER,
    quality INTEGER,
    speed INTEGER,
    satisfaction INTEGER,
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(partner_id) REFERENCES users(id)
  )`);
})();

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d'
  });
}

app.post('/api/register', async (req, res) => {
  const { email, password, role = 'client' } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { lastID } = await db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', email, hashed, role);
    if (role === 'partner') {
      await db.run('INSERT INTO partners (id) VALUES (?)', lastID);
    }
    const token = generateToken({ id: lastID, email });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token });
});

async function allocateProject(projectId) {
  const project = await db.get('SELECT * FROM projects WHERE id = ?', projectId);
  if (!project || project.status !== 'pool') return null;
  const partner = await db.get(`
    SELECT u.id, u.email, p.score, p.active_projects
    FROM users u JOIN partners p ON u.id = p.id
    ORDER BY p.score DESC, p.active_projects ASC
    LIMIT 1`);
  if (!partner) return null;
  await db.run('UPDATE projects SET partner_id = ?, status = ? WHERE id = ?', partner.id, 'assigned', projectId);
  await db.run('UPDATE partners SET active_projects = active_projects + 1 WHERE id = ?', partner.id);
  const contractText = `Contract for project ${project.name}`;
  await db.run('INSERT INTO contracts (project_id, partner_id, contract_text) VALUES (?, ?, ?)', projectId, partner.id, contractText);
  const client = await db.get('SELECT email FROM users WHERE id = ?', project.client_id);
  sendEmail(client?.email || '', 'Project assigned', `Your project ${project.name} has been assigned.`);
  sendEmail(partner.email, 'New project', `You have been assigned project ${project.name}.`);
  sendSMS(client?.email || '', `Project ${project.name} assigned`);
  sendSMS(partner.email, `New project ${project.name}`);
  return partner;
}

app.post('/api/projects', async (req, res) => {
  const { name, description, client_id } = req.body;
  if (!name || !client_id) return res.status(400).json({ message: 'Missing name or client' });
  const { lastID } = await db.run('INSERT INTO projects (name, description, client_id) VALUES (?, ?, ?)', name, description || '', client_id);
  const partner = await allocateProject(lastID);
  res.json({ id: lastID, partner });
});

app.post('/api/projects/:id/reject', async (req, res) => {
  const { id } = req.params;
  const { partner_id } = req.body;
  const project = await db.get('SELECT * FROM projects WHERE id = ?', id);
  if (!project || project.partner_id !== partner_id) return res.status(400).json({ message: 'Invalid project or partner' });
  await db.run('UPDATE projects SET partner_id = NULL, status = ? WHERE id = ?', 'pool', id);
  await db.run('UPDATE partners SET active_projects = active_projects - 1 WHERE id = ?', partner_id);
  const partner = await allocateProject(id);
  res.json({ reassigned: !!partner, partner });
});

app.post('/api/contracts/:id/sign', async (req, res) => {
  const { id } = req.params;
  const { partner_id } = req.body;
  await db.run('UPDATE contracts SET signed = 1 WHERE id = ? AND partner_id = ?', id, partner_id);
  res.json({ signed: true });
});

app.post('/api/ratings', async (req, res) => {
  const { project_id, partner_id, quality, speed, satisfaction } = req.body;
  await db.run('INSERT INTO ratings (project_id, partner_id, quality, speed, satisfaction) VALUES (?, ?, ?, ?, ?)', project_id, partner_id, quality, speed, satisfaction);
  const ratings = await db.all('SELECT quality, speed, satisfaction FROM ratings WHERE partner_id = ?', partner_id);
  let total = 0;
  ratings.forEach(r => { total += (r.quality + r.speed + r.satisfaction) / 3; });
  const avg = ratings.length ? total / ratings.length : 0;
  await db.run('UPDATE partners SET score = ?, active_projects = active_projects - 1, history = history + 1 WHERE id = ?', avg, partner_id);
  await db.run('UPDATE projects SET status = ? WHERE id = ?', 'completed', project_id);
  res.json({ average: avg });
});

app.get('/api/plans', (req, res) => {
  const plans = [
    { id: 1, name: 'Trial', price: 0 },
    { id: 2, name: 'Starter', price: 750000 },
    { id: 3, name: 'Pro', price: 1550000 }
  ];
  res.json(plans);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

