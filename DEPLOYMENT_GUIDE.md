# GitHub Pages Deployment Guide

## Prerequisites
1. Install Git: https://git-scm.com/download/win
2. Create a GitHub account: https://github.com/signup
3. Create a new repository on GitHub

## Step-by-Step Deployment Instructions

### Step 1: Update package.json
Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` in `client/package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

For example, if your username is `jreich` and repo is `data-center-news-rfps`:
```json
"homepage": "https://jreich.github.io/data-center-news-rfps"
```

### Step 2: Install gh-pages package
Open PowerShell in the project directory and run:
```powershell
cd "C:\Users\jreich\OneDrive - FTI Consulting\Github Copilot\data-center-news-rfps\client"
..\portable-node\npm.cmd install --save-dev gh-pages --legacy-peer-deps
```

### Step 3: Initialize Git Repository (if not done)
```powershell
cd "C:\Users\jreich\OneDrive - FTI Consulting\Github Copilot\data-center-news-rfps"
git init
git add .
git commit -m "Initial commit"
```

### Step 4: Connect to GitHub
```powershell
# Replace with your actual repository URL
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Save the settings

### Step 6: Deploy
The GitHub Actions workflow will automatically deploy when you push to main branch.

Or you can manually deploy using:
```powershell
cd client
..\portable-node\npm.cmd run deploy
```

## Important Notes

### Server-Side Code Limitation
⚠️ **GitHub Pages only hosts static files (HTML, CSS, JavaScript)**. Your server-side code (Node.js backend) will NOT work on GitHub Pages.

For the full application to work, you have two options:

#### Option 1: Deploy Frontend Only (GitHub Pages)
- Deploy only the `client` folder to GitHub Pages
- The app will be static and won't have live data fetching
- Good for showcasing the UI

#### Option 2: Deploy Full Stack Application
Use a platform that supports both frontend and backend:
- **Vercel** (easiest for full-stack): https://vercel.com
- **Netlify**: https://netlify.com
- **Heroku**: https://heroku.com
- **Railway**: https://railway.app
- **Render**: https://render.com

### For Full Stack Deployment (Recommended)

If you want your backend to work, I recommend using Vercel:

1. Install Vercel CLI:
```powershell
..\portable-node\npm.cmd install -g vercel
```

2. Deploy:
```powershell
vercel
```

3. Follow the prompts to link your GitHub repository

Vercel will automatically detect your setup and deploy both the client and server.

## Troubleshooting

### API Calls Not Working
If your frontend is on GitHub Pages but API calls fail:
- You need to deploy the backend separately (see Option 2 above)
- Update the API URLs in `client/src/services/api.ts` to point to your backend deployment

### Build Errors
If the build fails:
```powershell
cd client
..\portable-node\npm.cmd run build
```
Fix any errors shown before deploying.

### Permission Errors
If GitHub Actions fails due to permissions:
1. Go to repository Settings > Actions > General
2. Under "Workflow permissions", select "Read and write permissions"
3. Save and re-run the workflow

## Next Steps
1. Install Git if not already installed
2. Update the homepage URL in package.json
3. Push your code to GitHub
4. Watch the deployment happen automatically!

For questions or issues, check the Actions tab in your GitHub repository for deployment logs.
