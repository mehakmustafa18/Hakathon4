# OTT Platform - Setup & Run Guide

This project consists of a **MERN Stack** application (MongoDB, Express, React, Node.js).

## Prerequisites

1.  **Node.js**: Installed on your system.
2.  **MongoDB**: Installed and running locally on `mongodb://127.0.0.1:27017/`.

---

## 🚀 How to Run

### 1. Backend (Server)

The backend is responsible for APIs and Database connectivity.

- Open a terminal in the `backend` folder.
- Run the following command:
  ```bash
  node server.js
  ```
  _(Note: It may already be running in one of your terminals)_

### 2. Frontend (React UI)

The frontend is the visual interface matching the Figma designs.

- Open a **new** terminal in the `frontend` folder.
- Run the following command:
  ```bash
  npm run dev
  ```
- Once started, open the local URL (usually `http://localhost:5173`) in your browser.

---

## 🔑 Admin Credentials

To access the Admin Panel (`/admin`), you can either:

1.  **Register** a new account and manually change its role to `super_admin` in MongoDB.
2.  Or use the following pre-configured admin for testing (if already in DB):
    - **Email**: `admin@streamvibe.com`
    - **Password**: `admin123`

---

## 🛠 Features

- **Home Page**: Complete responsive layout.
- **Movies & Shows**: Interactive sliders and hero banners.
- **Movie Details**: Full metadata, cast, and reviews view.
- **Admin Panel**: User blocking and Video management (Upload/Delete/Hide).

---

## 🌐 Deployment

**Want to deploy your app live on the internet?**

Follow these guides in order:

1. **[README_DEPLOYMENT.md](./README_DEPLOYMENT.md)** ← Start here! Overview of what we've set up.
2. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** ← Step-by-step checklist (5 min read).
3. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** ← Detailed instructions with screenshots (30 min read).

**Quick Summary:**

- **Backend**: Deploy to Railway (Free)
- **Frontend**: Deploy to Vercel (Free)
- **Database**: Use MongoDB Atlas (Free)
- **Time**: ~20 minutes total
- **Result**: Live app at `https://your-app.vercel.app`

**Start with:** Open `README_DEPLOYMENT.md` right now! 🚀
