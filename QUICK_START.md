# 🚀 Quick Start: Deploy to Vercel

## ✅ What You Need to Do (In Order)

### 1️⃣ Create Vercel Account (5 minutes)
- Go to: https://vercel.com/signup
- Click "Continue with GitHub"
- Authorize Vercel

### 2️⃣ Install Git (5 minutes - if not installed)
- Download: https://git-scm.com/download/win
- Install with default settings
- Restart PowerShell

### 3️⃣ Create GitHub Repository (2 minutes)
- Go to: https://github.com/new
- Name: `data-center-news-rfps`
- Make it Public
- Do NOT initialize with README
- Click "Create repository"

### 4️⃣ Push Your Code to GitHub (5 minutes)
Run these commands in PowerShell:

```powershell
cd "C:\Users\jreich\OneDrive - FTI Consulting\Github Copilot\data-center-news-rfps"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/data-center-news-rfps.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5️⃣ Deploy on Vercel (3 minutes)
1. Go to: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Find `data-center-news-rfps` and click "Import"
4. Keep all default settings
5. Click "Deploy"
6. Wait 2-5 minutes
7. Your app will be live! 🎉

---

## 🎯 Total Time: ~20 minutes

## 📝 Notes
- Everything is already configured in your project
- Vercel will automatically detect and build both frontend and backend
- You'll get a free URL like: `https://data-center-news-rfps.vercel.app`
- Every time you push to GitHub, Vercel auto-deploys

## ❓ Need Help?
Open `VERCEL_DEPLOYMENT.md` for detailed instructions and troubleshooting.

---

## After Deployment

Test your app:
1. Visit your Vercel URL
2. Click "Fetch" to test the news scraping
3. Check if everything works!

If you see errors, check the Vercel dashboard logs.
