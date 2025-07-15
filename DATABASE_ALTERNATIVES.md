# Free Database Alternatives for Vercel

## Option 1: Supabase (Recommended)
**Why it's better**: Very easy setup, good free tier

### Steps:
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Click "New Project"
4. Choose organization → Enter project name
5. Choose region → Click "Create new project"
6. Go to Settings → Database
7. Copy the connection string (URI format)
8. Use this as your `DATABASE_URL`

**Free Tier**: 500MB storage, 2GB bandwidth

## Option 2: PlanetScale
**Why it's good**: MySQL-compatible, very reliable

### Steps:
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up with GitHub
3. Click "Create database"
4. Choose database name → Select region
5. Click "Create database"
6. Go to "Connect" → Select "General"
7. Copy the connection string
8. Use this as your `DATABASE_URL`

**Free Tier**: 1GB storage, 1 billion reads/month

## Option 3: Railway Database
**Why it's good**: Simple setup, PostgreSQL

### Steps:
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click on the database service
5. Go to "Connect" tab
6. Copy the "Postgres Connection URL"
7. Use this as your `DATABASE_URL`

**Free Tier**: $5 monthly credit (covers database usage)

## Option 4: Aiven
**Why it's good**: 1-month free trial, then affordable

### Steps:
1. Go to [aiven.io](https://aiven.io)
2. Sign up and verify email
3. Create new service → Choose PostgreSQL
4. Select cloud provider and region
5. Choose plan (free trial)
6. Get connection details
7. Use this as your `DATABASE_URL`

**Free Trial**: 1 month, then $20/month

## Recommended: Supabase
It's the easiest to set up and has a generous free tier. Most users prefer it over Neon.

## Connection String Format
All these will give you a connection string like:
```
postgresql://username:password@hostname:port/database
```

Just copy and paste this as your `DATABASE_URL` in Vercel!