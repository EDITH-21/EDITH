# EDITH – Production Deployment Guide

Guide for deploying EDITH to production services (Vercel, Render/Railway, and MongoDB Atlas).

---

## 1. MongoDB Atlas Setup
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database named `edith_db`.
3. Add a database user with read/write access.
4. Whitelist IP access (`0.0.0.0/0` for cloud deployment).
5. Copy your connection string: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/edith_db?retryWrites=true&w=majority`

---

## 2. Deploying Backend (Render / Railway)

### On Render:
1. Create a new **Web Service** connected to your repository.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `<your_atlas_connection_string>`
   - `JWT_SECRET`: `<strong_secret_key>`
   - `CLIENT_URL`: `https://edith-client.vercel.app`

---

## 3. Deploying Frontend (Vercel)

### On Vercel:
1. Import project into Vercel dashboard.
2. Root Directory: `client`
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL`: `https://edith-server.onrender.com/api/v1`
7. Click **Deploy**.
