# Vercel Deployment Guide

Your job posting platform is configured for Vercel deployment. Follow these steps:

## 1. Prerequisites
- GitHub account with your code repository
- Vercel account (sign up at vercel.com)
- Neon Database (or other PostgreSQL provider)

## 2. Deploy Steps

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect your settings
5. Click "Deploy"

### Step 3: Configure Environment Variables
In Vercel dashboard, go to Project Settings → Environment Variables and add:

```
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_secret_string
REPL_ID=your_replit_id
REPLIT_DOMAINS=your-vercel-domain.vercel.app
RAZORPAY_KEY_ID=rzp_live_SIDzkLGGibqEns
RAZORPAY_KEY_SECRET=Z0Bh3UCPSCAet8FSu9CrfA9a
NODE_ENV=production
```

### Step 4: Database Setup
1. Sign up for [Neon](https://neon.tech) (free PostgreSQL)
2. Create a new database
3. Copy the connection string to `DATABASE_URL`
4. Run database migrations:
   ```bash
   npm run db:push
   ```

## 3. File Structure for Vercel
```
├── api/
│   └── index.js          # Serverless function entry point
├── client/               # React frontend
├── server/               # Express backend (modified for serverless)
├── vercel.json          # Vercel configuration
└── package.json         # Build scripts
```

## 4. How It Works
- **Frontend**: Built as static files served from `/dist/public`
- **Backend**: Runs as serverless functions in `/api/index.js`
- **Database**: PostgreSQL via Neon (or your provider)
- **Payments**: Real Razorpay integration
- **Authentication**: Replit OIDC (configured for Vercel domain)

## 5. Post-Deployment
- Your app will be available at `https://your-project.vercel.app`
- Users can sign in and post jobs with ₹2,500 payments
- All functionality works exactly as in development

## 6. Cost
- **Vercel**: Free tier (generous limits)
- **Neon Database**: Free tier (0.5GB storage)
- **Total**: Free for small to medium usage

## 7. Custom Domain (Optional)
After deployment, you can add a custom domain in Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS as instructed

Your job posting platform will be live and ready for users!