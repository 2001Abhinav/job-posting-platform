# Render Deployment Guide

## Step 1: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. **Sign in with GitHub** (connects to your repositories)
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure deployment settings**:
   - **Name**: `job-posting-platform`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: Yes (deploys on GitHub pushes)

## Step 2: Add Environment Variables

In Render dashboard → Your service → Environment, add:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
SESSION_SECRET=your_random_secret_string
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-app.onrender.com
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

## Step 3: Database Setup

**Option A: Render PostgreSQL (Recommended)**
1. **In Render dashboard, click "New +" → "PostgreSQL"**
2. **Create free PostgreSQL database**
3. **Copy the External Database URL**
4. **Use this as your DATABASE_URL**

**Option B: External Database (Neon, Supabase, etc.)**
1. **Sign up at [neon.tech](https://neon.tech) for free PostgreSQL**
2. **Create database and get connection string**
3. **Use this as your DATABASE_URL**

## Step 4: Environment Variables Details

- **DATABASE_URL**: Your PostgreSQL connection string
- **SESSION_SECRET**: Any random string (e.g., `mysecretkey123random`)
- **REPL_ID**: Your current Replit app ID
- **REPLIT_DOMAINS**: After deployment, you'll get `your-app.onrender.com`
- **Razorpay keys**: Already provided (live keys for real payments)

## Step 5: Deploy and Monitor

1. **Click "Create Web Service"**
2. **Render will build and deploy automatically**
3. **Monitor build logs** in Render dashboard
4. **Get your live URL**: `https://your-app.onrender.com`

## Step 6: Update Domain Configuration

After deployment:
1. **Copy your Render URL** (e.g., `job-posting-platform.onrender.com`)
2. **Update REPLIT_DOMAINS** environment variable with this URL
3. **Redeploy if needed**

## What's Ready for Render:

✅ **render.yaml** - Render configuration file
✅ **Build scripts** - `npm install && npm run build`
✅ **Start command** - `npm start`
✅ **PostgreSQL support** - Works with Render's database
✅ **Real payments** - ₹2,500 Razorpay integration
✅ **Authentication** - Replit OIDC configured

## Render Free Tier:

- **750 hours/month** (enough for 24/7 operation)
- **PostgreSQL database** included
- **Auto-deploy** on GitHub pushes
- **Custom domains** supported
- **Sleeps after 15 minutes** of inactivity (wakes up automatically)

## Post-Deployment Testing:

1. **Visit your Render URL**
2. **Sign in with Replit account**
3. **Post a job** with ₹2,500 payment
4. **Browse jobs and applications**
5. **Test dashboard functionality**

## Monitoring:

Render provides:
- **Real-time logs** and metrics
- **Deployment history**
- **Environment variable management**
- **Custom domain setup**

Your job posting platform will be live with full functionality including real payments!

## Troubleshooting:

- **Build fails**: Check build logs in Render dashboard
- **Database connection**: Verify DATABASE_URL is correct
- **Authentication issues**: Ensure REPLIT_DOMAINS matches your Render URL
- **Payment issues**: Verify Razorpay keys are correctly set