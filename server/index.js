import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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
    password TEXT
  )`);
})();

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d'
  });
}

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { lastID } = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', email, hashed);
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

