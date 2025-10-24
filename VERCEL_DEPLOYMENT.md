# Vercel Deployment Guide

## Overview
Vercel will host both your frontend (React app) and backend (Node.js server) together.

---

## Step-by-Step Instructions

### Step 1: Create a Vercel Account
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Sign in with your GitHub account (or create one if you don't have it)
4. Authorize Vercel to access your GitHub repositories

**Status:** ⏳ Not started

---

### Step 2: Install Git (if not already installed)
1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart PowerShell after installation
4. Verify by running: `git --version`

**Status:** ⏳ Not started

---

### Step 3: Create a GitHub Repository

#### Option A: Via GitHub Website (Easier)
1. Go to https://github.com/new
2. Repository name: `data-center-news-rfps` (or any name you prefer)
3. Description: "Data center news and RFP tracking application"
4. Keep it **Public** (required for free Vercel hosting)
5. Do NOT initialize with README (we already have files)
6. Click "Create repository"

#### Option B: Via Command Line
```powershell
# Navigate to your project
cd "C:\Users\jreich\OneDrive - FTI Consulting\Github Copilot\data-center-news-rfps"

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - data center news and RFP tracker"

# Add your GitHub repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/data-center-news-rfps.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Status:** ⏳ Not started

---

### Step 4: Set Up Environment Variables

Before deploying, check if you need any API keys:

1. Open `server/src/services/perplexity.ts` to see if you need a Perplexity API key
2. Check other services for required keys

You'll add these in the Vercel dashboard later.

**Status:** ⏳ Not started

---

### Step 5: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest - Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - Find `data-center-news-rfps` in the list
   - Click "Import"
4. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (Vercel will detect automatically)
   - **Output Directory**: Leave empty
5. Add Environment Variables (if needed):
   - Click "Environment Variables"
   - Add any API keys required:
     - Name: `PERPLEXITY_API_KEY`
     - Value: (your API key)
6. Click "Deploy"
7. Wait 2-5 minutes for deployment
8. Your app will be live at: `https://your-project-name.vercel.app`

#### Option B: Via Vercel CLI (Advanced)

```powershell
# Install Vercel CLI
cd "C:\Users\jreich\OneDrive - FTI Consulting\Github Copilot\data-center-news-rfps"
.\portable-node\npm.cmd install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N
# - What's your project's name? data-center-news-rfps
# - In which directory is your code located? ./
# - Want to override settings? N
```

**Status:** ⏳ Not started

---

## After Deployment

### Verify Everything Works
1. Visit your Vercel URL (e.g., `https://your-project-name.vercel.app`)
2. Test the frontend loads correctly
3. Click the "Fetch" button to test if the backend API works
4. Check the Vercel dashboard for any errors

### Update API URL (if needed)
If the frontend can't reach the backend, update the API base URL:

In `client/src/services/api.ts`, make sure it's using relative paths like:
```typescript
const API_BASE_URL = '/api'; // Relative path works on Vercel
```

---

## Troubleshooting

### Build Failed
1. Go to Vercel dashboard → Your project → Deployments
2. Click the failed deployment
3. Check the build logs for errors
4. Common issues:
   - Missing dependencies: Run `npm install` in both client and server
   - TypeScript errors: We already fixed these!
   - Environment variables missing: Add them in Vercel settings

### API Not Working
1. Check Vercel logs: Dashboard → Your project → Logs
2. Verify environment variables are set correctly
3. Check that API routes start with `/api/`

### Port Issues
Vercel automatically handles ports. Make sure your server code uses:
```javascript
const PORT = process.env.PORT || 5000;
```

---

## Automatic Deployments

Once set up, every time you push to GitHub:
1. Vercel automatically detects the change
2. Builds and deploys your updated app
3. You get a new URL for each deployment
4. Production URL stays the same

---

## Cost
- **Free tier includes:**
  - Unlimited deployments
  - 100 GB bandwidth per month
  - Automatic HTTPS
  - Custom domains
  - Serverless functions

This is more than enough for your project!

---

## Quick Summary Checklist

- [ ] Create Vercel account (linked with GitHub)
- [ ] Install Git on your computer
- [ ] Create GitHub repository
- [ ] Push your code to GitHub
- [ ] Import project in Vercel
- [ ] Add environment variables (if needed)
- [ ] Deploy and test

---

## Need Help?

If you get stuck at any step, let me know and I'll help you troubleshoot!

**Next:** Start with Step 1 - Create a Vercel account at https://vercel.com/signup
