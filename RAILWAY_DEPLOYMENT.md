# Railway Deployment Guide - InvenFlow Backend

## Prerequisites

1. **GitHub Account** - Repository pushed to GitHub
2. **Railway Account** - Sign up at https://railway.app
3. **Backend Code** - Ready to deploy

---

## Step-by-Step Railway Deployment

### Step 1: Create Railway Account

1. Go to: https://railway.app
2. Click "Start Free" or "Sign In with GitHub"
3. Authorize Railway to access your GitHub
4. Confirm your email

---

### Step 2: Deploy Backend Service

1. **Go to Dashboard**: https://railway.app/dashboard
2. **Click "New Project"** (or "+" button)
3. **Select "Deploy from GitHub"**
4. **Select Repository**: Choose `3006Rohit/InvenFlow`
5. **Select Branch**: `main`
6. **Select Directory**: `backend` (important!)
7. Click **"Deploy"**

Railway will start building. This takes **2-5 minutes**.

---

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will provision a PostgreSQL database
4. Environment variables will be **automatically added**:
   - `DATABASE_URL` 
   - `POSTGRES_HOST`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - etc.

---

### Step 4: Verify Database Connection

1. Click on your **Backend service**
2. Go to **"Logs"** tab
3. Look for messages like:
   ```
   INFO:     Application startup complete
   ```
4. If you see **errors**, check the logs for details

---

### Step 5: Get Your Backend URL

1. Click on your **Backend service**
2. Go to **"Settings"** tab
3. Under **"Domains"**, you'll see your URL:
   ```
   https://invenflow-backend-xyz.railway.app
   ```
4. **Copy this URL** - you'll need it for Vercel

---

### Step 6: Test Backend Health

1. Open your backend URL in browser:
   ```
   https://invenflow-backend-xyz.railway.app/health
   ```
2. Should see:
   ```json
   {"status":"ok","version":"1.0.0"}
   ```

3. If it works, your backend is deployed! ✅

---

## Add Backend URL to Vercel

Now that backend is deployed, tell Vercel where it is:

### On Vercel Dashboard:

1. Go to: https://vercel.com/dashboard
2. Select **InvenFlow** (frontend project)
3. Click **Settings** → **Environment Variables**
4. **Add Variable**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://invenflow-backend-xyz.railway.app` (your Railway URL)
5. Click **"Add"**
6. **Redeploy**: Go to **Deployments** → Click **"Redeploy"**

---

## Test Full Connection

1. Go to your Vercel frontend URL
2. Open browser console (F12 → Console)
3. Look for:
   ```
   [API] Environment: Production
   [API] Base URL: https://invenflow-backend-xyz.railway.app
   ```
4. Try loading Products/Customers/Orders
5. Should load data from backend! ✅

---

## Troubleshooting Railway Deployment

### Backend Won't Deploy
**Check logs:**
1. Click Backend service
2. Go to **"Logs"** tab
3. Look for error messages

**Common issues:**
- Python version mismatch → Railway uses 3.11
- Missing dependencies → Check `requirements.txt`
- Database connection error → Railway PostgreSQL should auto-provision

### Database Connection Error
```
psycopg2.OperationalError: could not connect to server
```
- Railway PostgreSQL takes a moment to start
- Wait 30 seconds and redeploy
- Click **"Redeploy"** button

### Health Check Fails
```
ERROR: Cannot connect to database
```
- Click Backend service
- Check **"Variables"** tab
- Ensure `DATABASE_URL` is set
- If not, add PostgreSQL again

---

## Environment Variables on Railway

Railway automatically provides these when you add PostgreSQL:

```
DATABASE_URL=postgresql://user:pass@host:5432/railway
POSTGRES_HOST=host
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=railway
POSTGRES_PORT=5432
```

You can also **add custom variables**:

1. Click Backend service
2. Go to **"Variables"** tab
3. Add any custom variables
4. Redeploy

---

## Monitoring Your Backend

### View Logs
1. Backend service → **"Logs"** tab
2. Real-time logs showing all API requests

### View Resources
1. Backend service → **"Resources"** tab
2. CPU, Memory, Disk usage

### View Deployments
1. Backend service → **"Deployments"** tab
2. See all past deployments
3. Can rollback to previous version

---

## Next: Update Vercel Frontend

After getting backend URL:

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. Select **InvenFlow**
3. **Settings** → **Environment Variables**
4. Add: `VITE_API_BASE_URL` = `https://your-railway-url.app`
5. **Redeploy**

Your full-stack app is now live! 🚀

---

## Useful Railway Links

- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app
- Support: https://railway.app/support

---

## Summary

| Step | Status |
|------|--------|
| Deploy Backend to Railway | ✅ |
| Add PostgreSQL Database | ✅ |
| Get Backend URL | ✅ |
| Update Vercel with Backend URL | ⏳ Next |
| Test Full Connection | ⏳ After Vercel |
| Full App Live | 🚀 Done |
