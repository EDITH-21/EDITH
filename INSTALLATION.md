# EDITH – Step-by-Step Installation Guide

Follow these instructions to set up EDITH locally on Windows, macOS, or Linux.

## Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB (Local Community Server or MongoDB Atlas account)

---

## 1. Clone & Project Directory
Ensure you are in the project folder:
```bash
cd edith-app
```

---

## 2. Server Configuration & Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a `.env` file in `server/` with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/edith_db
   JWT_SECRET=edith_super_secret_jwt_key_2026
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=edith_super_secret_refresh_key_2026
   CLIENT_URL=http://localhost:5173
   ```
4. Seed Database (Optional but recommended):
   ```bash
   npm run seed
   ```
5. Start Server:
   ```bash
   npm run dev
   ```

---

## 3. Client Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Development Server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: `http://localhost:5173`

---

## Default Demo Credentials
- **Email**: `shivam@edith.ai`
- **Password**: `password123`
