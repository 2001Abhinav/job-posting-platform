# Railway Deployment Guide

## Step 1: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub** (this gives Railway access to your repositories)
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your job posting platform repository**
6. **Railway will automatically detect your app** and start building

## Step 2: Add Environment Variables

In Railway dashboard, go to your project → Variables tab and add:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
SESSION_SECRET=your_random_secret_here
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-railway-domain.railway.app
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

## Step 3: Database Setup

Railway provides free PostgreSQL:

1. **In Railway dashboard, click "New"**
2. **Select "Database" → "PostgreSQL"**
3. **Railway will create a database and provide connection details**
4. **Copy the DATABASE_URL** from the database service
5. **Add it to your app's environment variables**

## Step 4: Final Configuration

1. **Generate SESSION_SECRET**: Use any random string like `mysecretkey123`
2. **Set REPL_ID**: Your current Replit app ID  
3. **Set REPLIT_DOMAINS**: After deployment, you'll get a Railway URL like `your-app.railway.app`
4. **Update REPLIT_DOMAINS** with your actual Railway domain

## Step 5: Deploy and Test

1. **Railway will automatically build and deploy**
2. **You'll get a public URL** like `https://your-app.railway.app`
3. **Test the app**:
   - Sign in with Replit auth
   - Post a job with ₹2,500 payment
   - Browse jobs and applications

## What's Ready:

✅ **railway.json** - Railway configuration file
✅ **Build scripts** - `npm run build` and `npm start`
✅ **PostgreSQL support** - Works with Railway's database
✅ **Real payments** - ₹2,500 Razorpay integration
✅ **Authentication** - Replit OIDC configured

## Cost:

- **Railway**: $5 monthly credit (free tier)
- **Database**: Included in Railway free tier
- **Total**: Free for small to medium usage

## Monitoring:

Railway provides:
- Real-time logs
- Usage metrics
- Automatic deployments on GitHub pushes
- Custom domains support

Your job posting platform will be live with full functionality!