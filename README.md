# EDITH – Enterprise Full-Stack MERN AI Productivity Platform

> **EDITH (Every Day Intelligent Task Hub)** is a production-ready, futuristic enterprise AI productivity platform built with React 19, Vite, Redux Toolkit, Tailwind CSS, Express.js, Node.js, and MongoDB Atlas.

---

## ⚡ Key Features

- **Futuristic Matte Black & Crimson Red UI**: Custom glassmorphic dashboard with glowing accents and metallic gold highlights.
- **Authentication System**: JWT Token auth with HTTP-only cookies, password hashing (bcryptjs), protected routes, roles (`admin` & `user`), Remember Me & Password reset.
- **Home Dashboard**: Welcome card, interactive Pomodoro Focus Timer, metrics summary, Today's schedule timeline, expense donut breakdown, AI Assistant HUD, and goal tracking.
- **To-Do Kanban Board**: Multi-column board (`To Do`, `In Progress`, `Review`, `Completed`) with priority badges, categories, completion progress bars, side calendar, and productivity score gauge.
- **Monthly Expenses Tracker**: Total income, expenses, savings, and budget tracking cards, Recharts pie & spline line trend charts, budget vs actual gauge, searchable transactions table, and CSV export.
- **Schedule & Calendar**: Interactive grid calendar with task deadline markers, expense alerts, and event creation modal.
- **Analytics Center**: Productivity score heatmap visualizer, task completion velocity, and daily focus duration trajectory.
- **Notes Suite**: Markdown-supported rich note editor with folder organization, pinned notes, and quick search.
- **User Profile & Security**: Avatar upload preview, profile updates, and password change.
- **Platform Settings**: Theme skins, notification preferences, timezone/language configuration, and JSON data export.
- **AI Assistant Interface**: Dedicated futuristic AI command center with voice orb animation and interactive query handler.

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd server
npm install
npm run seed     # Seed MongoDB with realistic sample dataset
npm run dev      # Starts API server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🌐 Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit, React Router DOM v6, Tailwind CSS, Recharts, Lucide Icons, React Hot Toast, React Hook Form
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, bcryptjs, Helmet, Morgan, Cors, Cookie Parser, Rate Limiter, Compression
