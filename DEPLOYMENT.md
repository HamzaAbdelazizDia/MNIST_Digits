# 🚀 DIGITIHA Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Supabase database tables created (see `SUPABASE_SETUP.md`)
- ✅ All environment variables in `.env.local`
- ✅ GitHub repository pushed with latest changes
- ✅ Vercel account (free tier works fine)

## Step 1: Set Up Supabase Database

If you haven't already:
1. Follow the instructions in `SUPABASE_SETUP.md`
2. Run the SQL script from `supabase-schema.sql`
3. Verify tables are created by checking Table Editor in Supabase dashboard

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Connect your GitHub account if not already connected
4. Select the repository: `HamzaAbdelazizDia/MNIST_Digits`
5. Click **Import**
6. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

7. Add environment variables (click **Environment Variables**):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://eijmptueuwuoupbvixdt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   NEXT_PUBLIC_ADMIN_USERNAME=forsa
   NEXT_PUBLIC_ADMIN_PASSWORD=forsa2025
   ```
   
   **Important**: Add these to **all** environments (Production, Preview, Development)

8. Click **Deploy**
9. Wait 2-3 minutes for deployment to complete
10. Your site will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via CLI

1. Install Vercel CLI or use npx:
   ```bash
   npx vercel
   ```

2. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project name? **digitiha** (or any name)
   - In which directory is your code? **./** (press Enter)
   - Want to override settings? **N**

3. Add environment variables via Vercel dashboard or CLI:
   ```bash
   npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
   # Paste: https://eijmptueuwuoupbvixdt.supabase.co
   
   npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   # Paste your anon key
   
   npx vercel env add NEXT_PUBLIC_ADMIN_USERNAME production
   # Enter: forsa
   
   npx vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production
   # Enter: forsa2025
   ```

4. Deploy to production:
   ```bash
   npx vercel --prod
   ```

## Step 3: Verify Deployment

1. Visit your deployed site (e.g., `https://digitiha.vercel.app`)
2. Test the main features:
   - Enter a username
   - Draw a digit
   - Submit and verify success animation
   - Check leaderboard updates
   - Access admin dashboard (username: forsa, password: forsa2025)
   - Verify drawings appear in admin dashboard with visual thumbnails

3. Check Supabase:
   - Go to your Supabase project dashboard
   - Open Table Editor → `drawings`
   - Verify new entries appear with correct data structure

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `digitiha.com`)
4. Follow Vercel's DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Run `npm install` locally first
- Check `package.json` has all dependencies
- Commit and push `package-lock.json`

**Error: "Type errors"**
- Run `npm run build` locally to see errors
- Fix TypeScript errors before deploying

### Runtime Errors

**Error: "Failed to fetch"**
- Check Supabase URL and anon key are correct
- Verify environment variables are set in Vercel
- Check Supabase project is not paused (free tier pauses after inactivity)

**Error: "Invalid credentials"**
- Verify admin username/password environment variables
- Make sure they match `.env.local` values

**No data showing in admin dashboard**
- Open browser console (F12)
- Check for CORS errors or network failures
- Verify Supabase RLS policies are set correctly
- Test queries in Supabase SQL Editor

### Environment Variables Not Working

1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Verify all 4 variables are present
3. Make sure they're enabled for all environments
4. After adding/editing variables, **redeploy** the project (Vercel → Deployments → Click ⋯ → Redeploy)

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (from project settings) |
| `NEXT_PUBLIC_ADMIN_USERNAME` | Admin dashboard username |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin dashboard password |

**Note**: All variables have `NEXT_PUBLIC_` prefix because they're used client-side.

## Security Checklist

- ✅ `.env.local` is in `.gitignore` (never committed)
- ✅ Admin credentials are in environment variables (not hardcoded)
- ✅ Supabase RLS policies are enabled
- ✅ Anon key is safe to expose (read/write only, no delete/admin access)
- ✅ No sensitive data in drawings table (only usernames and pixel data)

## Updating the Deployment

To deploy changes:

1. Make changes locally
2. Test with `npm run dev`
3. Build and verify: `npm run build`
4. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
5. Vercel automatically redeploys on push to `main` branch

Or manually trigger deployment:
```bash
npx vercel --prod
```

## Cost Estimates

- **Vercel**: Free tier includes:
  - 100 GB bandwidth/month
  - 100 GB-hours compute/month
  - Unlimited projects
  
- **Supabase**: Free tier includes:
  - 500 MB database space
  - 2 GB file storage
  - 50,000 monthly active users
  - Unlimited API requests

For DIGITIHA's use case (storing 28x28 = 784 numbers per drawing), you can store approximately **500,000 drawings** on the free tier before needing to upgrade.

## Performance Optimization

Your site should score well on performance, but here are some tips:

1. **Image Optimization**: Drawings are already optimized (28x28 arrays)
2. **Caching**: Vercel automatically caches static assets
3. **CDN**: Vercel serves from global CDN by default
4. **Supabase Connection Pooling**: Already handled by Supabase

## Monitoring

### Vercel Analytics
1. Go to Vercel dashboard → Your Project → Analytics
2. View page views, visitor locations, and performance metrics

### Supabase Dashboard
1. Go to Supabase dashboard → Database → Logs
2. Monitor query performance and errors

## Next Steps

After successful deployment:
- Share the URL with users to start collecting data
- Monitor the admin dashboard for statistics
- Export data regularly for analysis
- Consider upgrading to paid tiers if usage grows significantly
