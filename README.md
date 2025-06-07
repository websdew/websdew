# Websdew Application

This repository contains a Vite + React frontend in the root and a small Express backend under `server/`. The frontend uses TailwindCSS and provides a multilingual user interface. The backend exposes basic authentication routes and an API for plan data using SQLite for storage.

## Setup

Install dependencies for the frontend:

```bash
npm install
```

Install dependencies for the backend:

```bash
cd server
npm install
```

## Development

To run the frontend development server:

```bash
npm run dev
```

To start the backend API server:

```bash
cd server
npm start
```

The API server listens on port `3001` by default. You can change this via the `PORT` environment variable. The SQLite database file path can be set with `DB_PATH`, and JWT signing secret with `JWT_SECRET`.

## Build

To build the production frontend:

```bash
npm run build
```

The output will be placed in the `dist/` directory.

