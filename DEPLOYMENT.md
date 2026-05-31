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

3. **Environment Variables** (Set in Vercel UI)
   - Go to: Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-api.com`

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Your site will be available at: `https://invenflow.vercel.app`

---

## Netlify Deployment (Frontend Only)

### Prerequisites
- GitHub repository pushed
- Netlify account (https://netlify.com)

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
   - Go to: Site Settings → Build & Deploy → Environment
   - Add: `VITE_API_BASE_URL` = `https://your-backend-api.com`
   - Add: `NPM_FLAGS` = `--include=dev`

4. **Deploy**
   - Netlify will auto-deploy on every push
   - Your site will be available at: `https://invenflow.netlify.app`

---

## Backend Deployment (Docker)

### Option 1: Docker Hub

```bash
# Build and push backend image
docker build -t your-username/inventory-backend:latest ./backend
docker push your-username/inventory-backend:latest

# Build and push frontend image
docker build -t your-username/inventory-frontend:latest ./frontend
docker push your-username/inventory-frontend:latest
```

### Option 2: AWS, DigitalOcean, or Railway

See respective platform documentation for containerized deployment.

---

## API Configuration

The frontend automatically reads the API base URL from the `VITE_API_BASE_URL` environment variable. 

- **Local Development**: `http://localhost:8000`
- **Production**: Set in deployment platform environment variables

Example API endpoint: `{VITE_API_BASE_URL}/api/v1/products`

---

## Troubleshooting

### 404 Errors on Routes
- ✅ Already fixed with `vercel.json` rewrites
- ✅ Already fixed with Netlify `_redirects`

### Build Failures
- Check that all dependencies are installed: `npm install`
- Verify Node version: `node --version` (18+ recommended)
- Clear build cache and redeploy

### API Connection Issues
- Verify backend is running
- Check `VITE_API_BASE_URL` environment variable
- Enable CORS on backend API

---

## Project URLs

- **GitHub**: https://github.com/3006Rohit/InvenFlow
- **Frontend (Vercel)**: https://invenflow.vercel.app
- **Frontend (Netlify)**: https://invenflow.netlify.app
- **API Docs (Local)**: http://localhost:8000/docs
