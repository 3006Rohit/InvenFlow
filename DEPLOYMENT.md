# InvenFlow Deployment Guide

## Local Development

```bash
# Start all services
docker-compose up -d

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

---

## Vercel Deployment (Frontend Only)

### Prerequisites
- GitHub account with repository pushed
- Vercel account (https://vercel.com)
- **Backend API deployed** (see Backend Deployment section below)

### Steps

1. **Connect to Vercel**
   - Sign up/login at https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Project Name**: InvenFlow
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Set Environment Variables** (IMPORTANT!)
   - Go to: **Settings** → **Environment Variables**
   - Add:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://your-backend-api-url.com` (without `/api/v1`)
   - Click "Save"

   **Example values:**
   - Local: `http://localhost:8000`
   - Railway: `https://invenflow-backend-xyz.railway.app`
   - Render: `https://invenflow-backend.onrender.com`
   - Heroku: `https://invenflow-backend.herokuapp.com`
   - AWS: `https://api.yourdomain.com`

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Your site will be available at: `https://invenflow.vercel.app`
   - Frontend will connect to your backend via the `VITE_API_BASE_URL`

---

## Backend Deployment Options

### Option 1: Railway (Recommended - Simple)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your InvenFlow repository
4. Select the `backend` directory
5. Add environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/inventory_db
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your-secure-password
   POSTGRES_DB=inventory_db
   ```
6. Deploy
7. Get your backend URL: `https://your-app-name.railway.app`
8. Add this to Vercel's `VITE_API_BASE_URL`

### Option 2: Render (Free Tier Available)

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Settings:
   - **Name**: InvenFlow Backend
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (same as above)
6. Deploy
7. Get URL and add to Vercel

### Option 3: Heroku (Paid)

```bash
# Install Heroku CLI
heroku login
heroku create invenflow-backend

# Set environment variables
heroku config:set POSTGRES_DB=inventory_db --app invenflow-backend

# Deploy
git push heroku main

# Get URL
heroku info --app invenflow-backend
```

### Option 4: Docker Hub + Self-Hosted

```bash
# Build and push to Docker Hub
docker build -t your-username/invenflow-backend:latest ./backend
docker push your-username/invenflow-backend:latest

# Then host on:
# - AWS EC2, DigitalOcean, or Linode
# - Update VITE_API_BASE_URL to your server IP/domain
```

---

## Netlify Deployment (Frontend Only)

### Prerequisites
- GitHub repository pushed
- Netlify account (https://netlify.com)
- Backend API deployed

### Steps

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository

2. **Configure Build**
   - **Build Command**: `cd frontend && npm run build`
   - **Publish Directory**: `frontend/dist`

3. **Environment Variables**
   - Go to: **Site Settings** → **Build & Deploy** → **Environment**
   - Add:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://your-backend-api-url.com`
     - **Key**: `NPM_FLAGS`
     - **Value**: `--include=dev`

4. **Deploy**
   - Netlify will auto-deploy on every push
   - Your site will be available at: `https://invenflow.netlify.app`

---

## Full-Stack Docker Deployment

### Using Docker Compose on Cloud Server

1. **Upload to cloud server** (DigitalOcean, AWS, Azure, etc.)
   ```bash
   scp -r . user@server:/app
   ```

2. **Run on server**
   ```bash
   cd /app
   docker-compose up -d
   ```

3. **Access**
   - Frontend: `http://your-server-ip:3000`
   - Backend: `http://your-server-ip:8000`
   - API Docs: `http://your-server-ip:8000/docs`

---

## Troubleshooting Network Errors

### Frontend Shows "Network Error"
- ✅ Check `VITE_API_BASE_URL` in Vercel environment variables
- ✅ Verify backend is deployed and running
- ✅ Check backend URL is accessible (test in browser)
- ✅ Verify CORS is enabled on backend
- ✅ Check browser console for specific error message

### "Cannot connect to API" Error
This means:
1. Backend URL is wrong - update `VITE_API_BASE_URL`
2. Backend is down - restart the backend service
3. Network/firewall issue - check if backend URL is accessible

### How to Test Backend Connection
```bash
# Test if backend is running
curl https://your-backend-url.com/health

# Should return:
# {"status":"ok","version":"1.0.0"}
```

---

## Project Structure

```
InvenFlow/
├── frontend/          # React + Vite
│   ├── src/
│   ├── vite.config.js
│   └── package.json
├── backend/           # FastAPI
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── vercel.json        # Vercel config
└── netlify.toml       # Netlify config
```

---

## Project URLs (After Deployment)

- **GitHub**: https://github.com/3006Rohit/InvenFlow
- **Frontend (Vercel)**: https://invenflow.vercel.app
- **Frontend (Netlify)**: https://invenflow.netlify.app
- **Backend API**: https://your-backend-url.com (set your own)
- **API Docs**: https://your-backend-url.com/docs

---

## Quick Checklist Before Going Live

- [ ] Backend deployed and running
- [ ] `VITE_API_BASE_URL` set in Vercel/Netlify
- [ ] Backend health endpoint working: `curl {VITE_API_BASE_URL}/health`
- [ ] Database connected and migrated
- [ ] CORS enabled on backend
- [ ] Environment variables set
- [ ] Frontend deployment successful
- [ ] All routes working (/, /products, /customers, /orders)
- [ ] API calls returning data

