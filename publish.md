# Deploying SarthiGrid to Production 🚀

This document provides detailed instructions on how to publish the **SarthiGrid** application suite.

---

## 1. Directory & Stack Overview

The SarthiGrid project contains three main components:
1. **Static HTML/JS Frontend** (Root Directory):
   - Contains the main application views:
     - `admin-dashboard.html` (Command Center)
     - `locator-map.html` (Pilgrim Locator)
     - `ambulance-reroute.html` (Ambulance Dispatch)
     - `pandharpur-terminal.html` (Pandharpur Terminal Dashboard)
     - `login.html`, `index.html` (Home/Landing)
2. **Next.js Web Portal** (`frontend2/` directory):
   - Advanced Next.js React client-side application for multi-agent simulation panels.
3. **Python Flask Backend Server** (`server.py`):
   - Serves dispatch approvals, runs agent navigators, and sends Twilio SMS notifications.

---

## 2. Deploying the Static HTML App to Vercel ⚡

Vercel is the fastest way to deploy static HTML frontend pages.

### Step-by-Step Vercel Deployment:
1. **Sign Up/Log In**: Go to [Vercel](https://vercel.com/) and link your GitHub account.
2. **Import Project**:
   - Click **Add New** ➔ **Project**.
   - Select the `SarthiGrid` repository.
3. **Configure Settings**:
   - **Framework Preset**: Choose **Other** (since it is a static HTML project).
   - **Root Directory**: Select `/` (the root directory of the repo).
   - **Build Command**: Leave blank (no build command needed).
   - **Output Directory**: Leave blank (it defaults to root, serving your `index.html`, `admin-dashboard.html`, etc.).
4. **Deploy**:
   - Click **Deploy**. Vercel will instantly generate a live URL (e.g., `https://sarthigrid.vercel.app`).
   - Any modifications pushed to the `main` branch of your GitHub repository will trigger an automatic rebuild and update.

---

## 3. Deploying the Next.js Dashboard (`frontend2`) to Vercel ⚛️

To deploy the modern React dashboard contained in the `frontend2` subdirectory:

1. **Import Project**: In Vercel, select the same `SarthiGrid` repository.
2. **Configure Settings**:
   - **Framework Preset**: **Next.js** (detected automatically).
   - **Root Directory**: Edit and set this to `frontend2`.
   - **Environment Variables**: Add your Supabase environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy**: Click **Deploy**. Vercel will compile the React code and host the Next.js app.

---

## 4. Deploying the Flask Backend Server (`server.py`) 🐍

The Flask backend manages real-time approvals, OSRM ambulance pathfinding, and Twilio SMS. Vercel is serverless and cannot run persistent Flask servers. Instead, deploy it to a free-tier hosting provider like **Render** or **Railway**.

### Deployment via Render:
1. Go to [Render](https://render.com/) and sign up.
2. Create a **New Web Service** and link your `SarthiGrid` repository.
3. **Configuration**:
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt` (or configure packages: `pip install flask flask-cors twilio networkx pydantic`)
   - **Start Command**: `python server.py`
4. **Add Environment Variables**:
   - Click **Env Groups** or **Environment** inside your service and define:
     - `TWILIO_ACCOUNT_SID` = `your_sid`
     - `TWILIO_AUTH_TOKEN` = `your_token`
     - `TWILIO_PHONE_NUMBER` = `your_number`
     - `SUPABASE_URL` = `your_supabase_url`
     - `SUPABASE_ANON_KEY` = `your_anon_key`
5. **Deploy**: Click **Create Web Service**. Render will host the service and expose a public API URL (e.g., `https://sarthigrid-backend.onrender.com`).

---

## 5. Connecting Frontend to the Live Backend URL 🔗

Once your backend is live on Render or Railway:
1. Open the frontend Javascript files/HTML where backend calls occur (e.g., `locator-map.html`, `admin-dashboard.html`, `truck_driver/index.html`).
2. Replace:
   ```javascript
   const response = await fetch('http://localhost:5005/api/...');
   ```
   with your production backend URL:
   ```javascript
   const response = await fetch('https://sarthigrid-backend.onrender.com/api/...');
   ```
3. Commit and push the updates to GitHub:
   ```bash
   git add .
   git commit -m "Update API endpoints to production URL"
   git push origin main
   ```
   Vercel will redeploy your live site automatically!
