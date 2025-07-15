# Simple Vercel Deployment

## What You Need to Do:

### 1. Go to Vercel
- Visit [vercel.com](https://vercel.com)
- Click "Sign up" and choose "Continue with GitHub"

### 2. Import Your Repository
- Click "New Project"
- Find your GitHub repository
- Click "Import"
- Vercel will auto-detect your settings
- Click "Deploy"

### 3. Add Environment Variables
After deployment, click "Settings" → "Environment Variables" and add:

```
DATABASE_URL=your_database_url_here
SESSION_SECRET=anyrandomstring123
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-vercel-app.vercel.app
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

### 4. Get Free Database
- Sign up at [neon.tech](https://neon.tech)
- Create new project
- Copy the connection string
- Use this as your `DATABASE_URL`

### 5. Update Domain
- After deployment, you'll get a URL like `https://your-app.vercel.app`
- Update `REPLIT_DOMAINS` with this URL

## That's It!

Your app will be live at `https://your-app.vercel.app` with real ₹2,500 payments working.

## Cost: FREE
- Vercel: Free tier (generous limits)
- Neon Database: Free tier (0.5GB)
- Total: $0/month