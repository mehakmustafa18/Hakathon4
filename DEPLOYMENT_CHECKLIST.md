# ✅ Deployment Checklist - Step by Step

## PRE-DEPLOYMENT (Do This First!)

### 1. Commit Changes to Git

```bash
cd C:\Users\DELL\OneDrive\Desktop\DevSquad_26\Hackathon4
git add .
git commit -m "Prepare for deployment - add env configs"
git push origin main
```

### 2. Test Locally One More Time

```bash
# Terminal 1: Backend
cd backend
npm install
node seedMovies.js  # Seed some data
node server.js      # Should say "MongoDB Connected: 127.0.0.1"

# Terminal 2: Frontend
cd frontend
npm install
npm run dev         # Should show http://localhost:5173
```

---

## DEPLOYMENT STEPS (20 minutes total)

### STEP 1: MongoDB Atlas Setup (5 minutes)

**Actions to do on https://www.mongodb.com/cloud/atlas:**

```
☐ 1. Sign up (use GitHub/Google for easy signup)
☐ 2. Create Organization → Project "Hackathon4-OTT"
☐ 3. Build Cluster → M0 Free → AWS → Region (India/US)
☐ 4. Wait for cluster (2-3 minutes)
☐ 5. Database Access → Add User "otpadmin" with password
☐ 6. Network Access → Allow 0.0.0.0/0
☐ 7. Databases → Connect → Copy connection string
☐ 8. SAVE THIS: mongodb+srv://otpadmin:PASSWORD@cluster0.xxxxx.mongodb.net/hackathon_ott?retryWrites=true&w=majority
```

---

### STEP 2: Deploy Backend on Railway (5 minutes)

**Actions to do:**

```
☐ 1. Go to https://railway.app
☐ 2. Click "Start New Project"
☐ 3. Sign Up with GitHub (use your GitHub account)
☐ 4. Click "Deploy from GitHub"
☐ 5. Find & select DevSquad_26/Hackathon4
☐ 6. Click Import
☐ 7. Wait for Railway to detect Node.js project
☐ 8. Click "Variables" tab
☐ 9. Add these environment variables:

    PORT=5000
    MONGO_URI=mongodb+srv://otpadmin:YourPassword@cluster0.xxxxx.mongodb.net/hackathon_ott?retryWrites=true&w=majority
    JWT_SECRET=supersecretjwtkey_for_hackathon
    NODE_ENV=production

☐ 10. Click "Deploy"
☐ 11. Wait for deployment (2-3 minutes)
☐ 12. Go to "Settings" tab → Look for "Domain"
☐ 13. SAVE BACKEND URL: https://hackathon4-ott-production.railway.app
☐ 14. Test: Open in browser → https://YOUR_BACKEND_URL/api/videos
```

**Your Backend URL will look like:**

```
https://hackathon4-ott-production-xxxx.railway.app
```

---

### STEP 3: Update Frontend with Backend URL

**In VS Code:**

1. Open file: `frontend/.env.production`
2. Replace the URL:
   ```env
   VITE_API_URL=https://YOUR_BACKEND_URL.railway.app
   ```
3. Save file
4. Commit:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

---

### STEP 4: Deploy Frontend on Vercel (5 minutes)

**Actions to do on https://vercel.com:**

```
☐ 1. Go to https://vercel.com
☐ 2. Click "Sign Up"
☐ 3. Sign Up with GitHub
☐ 4. Authorize Vercel
☐ 5. Click "New Project"
☐ 6. Search for DevSquad_26/Hackathon4
☐ 7. Click "Import"
☐ 8. Configure Project:
    - Framework: Vite/React? (Choose Vite)
    - Root Directory: frontend
    - Build Command: npm run build
    - Output Directory: dist
☐ 9. Environment Variables:
    VITE_API_URL=https://YOUR_BACKEND_URL.railway.app
☐ 10. Click "Deploy"
☐ 11. Wait for build (2-3 minutes)
☐ 12. When done, Vercel shows:
    "Congratulations! Your site is live"
☐ 13. SAVE FRONTEND URL shown (like https://hackathon4-ott.vercel.app)
```

Your Frontend URL will be:

```
https://hackathon4-ott.vercel.app
```

---

## POST-DEPLOYMENT TESTING (3 minutes)

### Test Your Live App

Open: `https://hackathon4-ott.vercel.app`

**Test these features:**

```
☐ 1. Homepage loads without errors
☐ 2. SignUp works - try creating account
☐ 3. Login works - try logging in
☐ 4. Movies page loads - see video thumbnails
☐ 5. Click movie - details page opens
☐ 6. Try play button - requires subscription
☐ 7. Go to Subscriptions - see plans
☐ 8. Admin Login - if seeded (admin@demo.com : admin123)
☐ 9. Admin Dashboard - should show real stats
☐ 10. Admin Video Management - create/delete videos
```

---

## TROUBLESHOOTING

### Problem: "Cannot connect to database"

**Solution:** Check MongoDB Atlas IP whitelist and connection string

### Problem: Frontend can't reach backend

**Solution:** Verify VITE_API_URL in Vercel environment variables

### Problem: Videos not showing

**Solution:**

```bash
cd backend
# Connect to Railway terminal and run:
node seedMovies.js
```

### Problem: Login not working

**Solution:** Check JWT token is being sent correctly (check browser DevTools → Network)

### Problem: Uploads not working

**Solution:** Backend needs write permissions, check MongoDB permissions

---

## LIVE URLS 🌐

Once deployment is complete:

```
Frontend:  https://hackathon4-ott.vercel.app
Backend:   https://hackathon4-ott-production-xxxx.railway.app
Database:  MongoDB Atlas Cloud
```

---

## AFTER DEPLOYMENT - MAINTENANCE

### Daily Checks:

1. View app at https://hackathon4-ott.vercel.app
2. Check Railway logs for errors
3. Check MongoDB Atlas for data growth

### Weekly Tasks:

1. Monitor user signups & activity
2. Check database storage usage
3. Review error logs

### Monthly Tasks:

1. Add new features
2. Update security
3. Optimize performance

---

## Need Help?

**Common Errors & Quick Fixes:**

| Error        | Fix                                  |
| ------------ | ------------------------------------ |
| CORS Error   | Already fixed in backend `server.js` |
| 404 API      | Check backend URL in VITE_API_URL    |
| Auth Error   | Check JWT_SECRET matches             |
| DB Error     | Check MongoDB connection string      |
| Upload Error | Check file permissions               |

---

**Now you're ready to deploy! 🚀**

Next steps:

1. Read DEPLOYMENT_GUIDE.md for detailed instructions
2. Follow this checklist step by step
3. Test everything works
4. Share your live URL with friends!

**Tum na Hackathon4 OTT Platform ko world ke saamne le aaye! 🎬🍿**
