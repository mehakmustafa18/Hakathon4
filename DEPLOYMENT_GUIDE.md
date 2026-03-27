# 🚀 Complete Deployment Guide - Hackathon4 OTT Platform

## Quick Summary

- **Database**: MongoDB Atlas (Free Cloud)
- **Backend**: Railway (Node.js)
- **Frontend**: Vercel (React/Vite)
- **Total Setup Time**: ~15-20 minutes

---

## PHASE 1: MongoDB Atlas Setup (5 minutes) ☁️

### Step 1.1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with Email (or use Google/GitHub)
4. Verify email

### Step 1.2: Create Organization & Project

1. After login, create Organization
2. Create Project named: `Hackathon4-OTT`
3. Click Next

### Step 1.3: Create Free Cluster

1. Choose "Build a Cluster"
2. Select Plan: **M0 Free** (Don't worry, it's unlimited for development)
3. Select Cloud Provider: **AWS** or **Google Cloud** (choose nearest region)
4. Region: Select India (Mumbai) if available
5. Click "Create Deployment"
6. Wait 2-3 minutes for cluster to be ready

### Step 1.4: Create Database User

1. Go to **Database Access** → **Add New Database User**
2. Username: `otpadmin`
3. Password: Generate strong password (save it somewhere!)
4. Click "Add User"

### Step 1.5: Whitelist IP Address

1. Go to **Network Access** → **Add IP Address**
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### Step 1.6: Get Connection String

1. Go to **Databases** → Click "Connect" button
2. Choose "Drivers" → **Node.js 4.1 or later**
3. Copy the connection string, it looks like:
   ```
   mongodb+srv://otpadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. **Replace `<password>` with your actual password**
5. Add `/hackathon_ott` at the end:
   ```
   mongodb+srv://otpadmin:YourPassword123@cluster0.xxxxx.mongodb.net/hackathon_ott?retryWrites=true&w=majority
   ```
6. Save this! (We'll use it later)

---

## PHASE 2: Backend Deployment on Railway (5 minutes) 🚂

### Step 2.1: Update Backend .env File

Edit file: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://otpadmin:YourPassword123@cluster0.xxxxx.mongodb.net/hackathon_ott?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_for_hackathon
NODE_ENV=production
```

### Step 2.2: Create Railway Account

1. Go to https://railway.app
2. Click "Start New Project"
3. Sign up with **GitHub** (important!)
4. Login to your GitHub account when asked

### Step 2.3: Connect GitHub Repository

1. Click "Deploy from GitHub"
2. Search for your repository (DevSquad_26/Hackathon4)
3. Click "Import"

### Step 2.4: Configure Railway Project

1. In Railway dashboard, click **Variables** tab
2. Add these environment variables:
   ```
   MONGO_URI=mongodb+srv://otpadmin:YourPassword123@cluster0.xxxxx.mongodb.net/hackathon_ott?retryWrites=true&w=majority
   JWT_SECRET=supersecretjwtkey_for_hackathon
   NODE_ENV=production
   ```
3. Click **Deploy**

### Step 2.5: Get Backend URL

1. Railway automatically deploys
2. Go to **Settings** tab
3. Look for **Domain** - you'll see something like:
   ```
   https://hackathon4-ott-production.railway.app
   ```
4. **Save this URL!** (You need it for frontend)

### Step 2.6: Verify Backend is Running

Open this URL in browser (replace with your actual URL):

```
https://hackathon4-ott-production.railway.app/api/videos
```

Should return JSON array of videos ✅

---

## PHASE 3: Frontend Deployment on Vercel (5 minutes) 🎨

### Step 3.1: Update Frontend API URL

Edit file: `frontend/src/context/api.js`

```javascript
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hackathon4-ott-production.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Step 3.2: Create .env.production File

Create file: `frontend/.env.production`

```env
VITE_API_BASE_URL=https://hackathon4-ott-production.railway.app
```

### Step 3.3: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with **GitHub** (same GitHub account)
4. Authorize Vercel to access your repositories

### Step 3.4: Import Project to Vercel

1. Click "New Project"
2. Search for repository
3. Click "Import"

### Step 3.5: Configure Build Settings

1. **Framework Preset**: Vue (select Vite)
2. **Project Root**: `frontend/`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Environment Variables:
   ```
   REACT_APP_API_URL=https://hackathon4-ott-production.railway.app
   VITE_API_BASE_URL=https://hackathon4-ott-production.railway.app
   ```
6. Click **Deploy**

### Step 3.6: Get Frontend URL

1. Vercel will build automatically (takes ~2 minutes)
2. Once done, you'll see:
   ```
   https://hackathon4-ott.vercel.app
   ```
3. **This is your live app URL!** 🎉

---

## PHASE 4: Testing & Verification ✅

### Test Your Live App

1. Open: https://hackathon4-ott.vercel.app
2. Try **Signup**: Create new account
3. Try **Login**: Login with those credentials
4. Try **Browse Movies**: Check if videos load
5. Try **Play Video**: See if video player works
6. Try **Admin Login**: Check admin panel (user: admin@demo.com if seeded)

### Common Issues & Fixes

| Problem                       | Solution                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| **"Cannot find module"**      | Your `package.json` might be missing dependencies. Run `npm install` in both folders |
| **Database connection error** | Check MongoDB Atlas IP whitelist or connection string                                |
| **CORS errors**               | Backend is already configured with CORS, should work                                 |
| **Videos not showing**        | Run seed script: `cd backend && node seedMovies.js`                                  |
| **Auth not working**          | Check JWT secret matches in Railway variables                                        |

---

## Additional Notes 📝

### Optional: Custom Domain

If you have custom domain:

1. In Vercel → Settings → Domains
2. Add your domain
3. Update DNS records (Vercel will show instructions)

### Optional: Seed Data

If videos don't show, seed them:

1. Go to Railway local terminal
2. Run: `node seedMovies.js`

### Optional: Monitoring

- **Railway**: View logs in Dashboard
- **Vercel**: View build logs in Deployments
- **MongoDB**: View data in Atlas dashboard

---

## Your Live URLs 🌐

Once deployed, your URLs will be:

```
Frontend (Vercel):  https://hackathon4-ott.vercel.app
Backend (Railway):  https://hackathon4-ott-production.railway.app
Database (Atlas):   mongodb+srv://...
```

---

## Next Steps After Deployment

1. **Monitor & Debug**: Check logs in Railway/Vercel if issues
2. **Add Production Features**:
   - Real payment gateway (Stripe)
   - Email verification (SendGrid)
   - Analytics (Mixpanel/Segment)
3. **Performance**: Add CDN for images
4. **Security**: Set up WAF, rate limiting

---

**Ab live ho gaya! 🎬🍿**
