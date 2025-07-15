# Free Deployment Guide

Your job posting platform is ready for deployment on several free platforms. Here are your options:

## 1. Railway (Recommended - Full Stack)
**Free Tier**: $5 credit monthly (enough for small to medium apps)
**Best for**: Your current Express + React setup

### Steps:
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect your app and deploy it
6. Add environment variables in Railway dashboard:
   - `DATABASE_URL` (Railway provides free PostgreSQL)
   - `SESSION_SECRET` (generate a random string)
   - `REPL_ID` (your Replit app ID)
   - `REPLIT_DOMAINS` (your Railway domain)
   - `RAZORPAY_KEY_ID` (your Razorpay key)
   - `RAZORPAY_KEY_SECRET` (your Razorpay secret)

## 2. Render (Full Stack)
**Free Tier**: 750 hours/month, sleeps after 15 mins of inactivity
**Best for**: Your current setup with minor adjustments

### Steps:
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Use these settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. Add environment variables in Render dashboard

## 3. Vercel (Frontend + Serverless)
**Free Tier**: Good limits for hobby projects
**Best for**: Would need to convert Express to serverless functions

## 4. Netlify (Frontend + Functions)
**Free Tier**: 100GB bandwidth, 300 build minutes
**Best for**: Would need to convert Express to Netlify functions

## Current Setup Benefits:
✅ Your app is already production-ready
✅ Build scripts are configured (`npm run build`)
✅ Production start command works (`npm start`)
✅ PostgreSQL database integration
✅ Real Razorpay payment processing
✅ Replit authentication system

## Recommended: Railway Deployment
Railway is the easiest option because:
- No code changes needed
- Supports your Express + React setup directly
- Free PostgreSQL database included
- Simple environment variable management
- Automatic HTTPS and custom domains

Your app will be live at: `https://your-app-name.railway.app`