#!/bin/bash
# Quick Commands for Deployment
# Copy-paste these commands in order

echo "=== HACKATHON4 OTT DEPLOYMENT COMMANDS ==="

# 1. PREPARE FOR DEPLOYMENT
echo "Step 1: Preparing for deployment..."
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. LOCAL TESTING (Optional but recommended)
echo "Step 2: Testing locally..."
echo "Terminal 1: cd backend && npm install && node seedMovies.js"
echo "Terminal 2: cd frontend && npm install && npm run dev"
echo "Wait 30 seconds and check http://localhost:5173"

# 3. MONGODB ATLAS INSTRUCTIONS
echo ""
echo "Step 3: MongoDB Atlas Setup"
echo "1. Go to https://www.mongodb.com/cloud/atlas"
echo "2. Sign up and create free cluster"
echo "3. Create database user: otpadmin"
echo "4. Whitelist IP: 0.0.0.0/0"
echo "5. Get connection string and SAVE IT"
echo ""

# 4. RAILWAY BACKEND DEPLOYMENT
echo "Step 4: Railway Backend Deployment"
echo "1. Go to https://railway.app"
echo "2. Sign up with GitHub"
echo "3. Import repository: DevSquad_26/Hackathon4"
echo "4. Add environment variables:"
echo "   - MONGO_URI=<your_mongodb_connection_string>"
echo "   - JWT_SECRET=supersecretjwtkey_for_hackathon"
echo "   - NODE_ENV=production"
echo "5. Deploy and wait 2-3 minutes"
echo "6. SAVE your Railway backend URL"
echo ""

# 5. UPDATE FRONTEND ENV
echo "Step 5: Update frontend environment"
echo "Edit frontend/.env.production and add:"
echo "VITE_API_URL=<your_railway_backend_url>"
echo "Then: git add . && git commit -m 'Update prod URL' && git push"
echo ""

# 6. VERCEL FRONTEND DEPLOYMENT
echo "Step 6: Vercel Frontend Deployment"
echo "1. Go to https://vercel.com"
echo "2. Sign up with GitHub"
echo "3. Import repository"
echo "4. Configure:"
echo "   - Root: frontend"
echo "   - Build: npm run build"
echo "   - Output: dist"
echo "5. Add environment: VITE_API_URL=<railway_url>"
echo "6. Deploy and wait 2-3 minutes"
echo ""

# 7. TESTING
echo "Step 7: Testing Live App"
echo "⏳ Wait for Vercel deployment to complete"
echo "Open: https://your-project.vercel.app"
echo "Test: Signup → Login → Browse → Play → Admin"
echo ""

echo "=== DEPLOYMENT COMPLETE ==="
echo "Frontend: https://your-project.vercel.app"
echo "Backend: https://your-project.railway.app"
echo "Database: MongoDB Atlas"
echo ""
echo "🎉 Your OTT platform is LIVE!"
