# Complete Render Setup Guide

## All Environment Variables You Need

```
DATABASE_URL=postgresql://username:password@hostname:port/database
SESSION_SECRET=your_random_secret_string
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-app.onrender.com
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

## Step-by-Step Render Setup

### Step 1: Create Database
1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click "New +" → "PostgreSQL"
3. Fill in:
   - **Name**: `jobboard-db`
   - **Database**: `jobboard`
   - **User**: `jobboard`
   - **Region**: Choose closest to you
4. Click "Create Database"
5. **Copy the External Database URL** (starts with `postgresql://`)

### Step 2: Deploy Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `jobboard`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: Yes

### Step 3: Add Environment Variables
In your web service → Environment tab, add each variable:

**DATABASE_URL**
- Value: The External Database URL from Step 1
- Example: `postgresql://jobboard:password@hostname:5432/jobboard`

**SESSION_SECRET**
- Value: Any random string (generate one)
- Example: `mysecretkey123random456`

**REPL_ID**
- Value: Your current Replit app ID
- Example: `your-replit-id`

**REPLIT_DOMAINS**
- Value: Your Render domain (you'll get this after deployment)
- Example: `jobboard.onrender.com`

**RAZORPAY_KEY_ID**
- Value: `rzp_live_SIDzkLGGibqEns`

**RAZORPAY_KEY_SECRET**
- Value: `Z0Bh3UCPSCAet8FSu9CrfA9a`

**NODE_ENV**
- Value: `production`

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Get your live URL from Render dashboard
4. Update `REPLIT_DOMAINS` with your actual Render URL

### Step 5: Test Your App
1. Visit your Render URL
2. Sign in with Replit account
3. Post a job with ₹2,500 payment
4. Browse jobs and test all features

## Important Notes

- **Database**: Use the External Database URL (not Internal)
- **Domain**: Update REPLIT_DOMAINS after you get your Render URL
- **Free Tier**: 750 hours/month, sleeps after 15 minutes
- **Auto-deploy**: Pushes to GitHub automatically redeploy

## Your App Will Be Live At:
`https://your-app-name.onrender.com`

## Troubleshooting

**Build Fails**: Check build logs in Render dashboard
**Database Issues**: Verify DATABASE_URL is the External URL
**Auth Issues**: Ensure REPLIT_DOMAINS matches your Render URL exactly
**Payment Issues**: Verify Razorpay keys are correct

Your job posting platform will be fully functional with real ₹2,500 payments!