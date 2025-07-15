# Netlify Direct Upload Guide

## Method 1: Drag & Drop Upload (Easiest)

### Step 1: Build Your Project
In your Replit terminal, run:
```bash
npm run build
```
This creates a `dist` folder with your built app.

### Step 2: Upload to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. On the dashboard, look for "Deploy manually"
4. **Drag and drop your `dist` folder** onto the deployment area
5. Netlify will deploy instantly!

### Step 3: Configure Environment Variables
In Netlify dashboard → Your site → Site settings → Environment variables:

```
DATABASE_URL=your_database_url_here
SESSION_SECRET=anyrandomstring123
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-site.netlify.app
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

## Method 2: Netlify CLI Upload

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build and Deploy
```bash
npm run build
netlify deploy --dir=dist --prod
```

## Database Options for Netlify

### Option 1: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Use as `DATABASE_URL`

### Option 2: PlanetScale
1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Use as `DATABASE_URL`

## Important Notes

- **Backend Functions**: Your Express server will run as Netlify Functions
- **Database**: Use external database (Supabase recommended)
- **Domain**: Update `REPLIT_DOMAINS` with your Netlify URL
- **Free Tier**: 100GB bandwidth, 300 build minutes/month

## After Upload

1. Get your Netlify URL (e.g., `https://amazing-site-123.netlify.app`)
2. Update `REPLIT_DOMAINS` environment variable
3. Test your app with real ₹2,500 payments

## Updating Your App

To update after changes:
1. Run `npm run build` again
2. Drag and drop the new `dist` folder
3. Netlify will redeploy automatically

Your job posting platform will be live with full functionality!