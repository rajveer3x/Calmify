# Calmify - Stress Management Portal

A full-stack MERN application aimed at providing users with relaxation techniques and stress management resources for a college project.

## Tech Stack

- **Frontend**: React (v18), Vite, Tailwind CSS, Framer Motion, Zustand, React Query, Axios.
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, express-rate-limit, Helmet.

## Installation

To run this application locally, you'll need Node.js and MongoDB installed.

1. **Clone the repository** (if applicable)
2. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```
3. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory (you can copy `.env.example`):
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/calmify
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running the Development Servers

You will need to run the client and server concurrently across two terminals.

**Start the Backend server:**
```bash
cd server
npm run dev
```

**Start the Frontend dev server:**
```bash
cd client
npm run dev
```

## Project Structure

```text
calmify/
├── client/                    ← React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        ← Reusable UI components
│   │   │   ├── ui/            ← Base UI primitives
│   │   │   └── layout/        ← Layout components
│   │   ├── pages/             ← Page-level components
│   │   ├── hooks/             ← Custom React hooks
│   │   ├── store/             ← Zustand global state
│   │   ├── services/          ← Axios API calls
│   │   ├── utils/             ← Helper functions
│   │   └── styles/            ← Global CSS + design tokens
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                    ← Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── index.js
│   └── package.json
├── .gitignore
├── .env.example
└── README.md
```
