# Supabase Database Setup Guide

## Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Log in to your account
3. Select your project: `eijmptueuwuoupbvixdt`
4. Click on **SQL Editor** in the left sidebar

## Step 2: Create Database Tables

1. Click **New Query** button
2. Copy the entire content from `supabase-schema.sql`
3. Paste it into the SQL editor
4. Click **Run** or press `Ctrl/Cmd + Enter`

The script will create:
- `users` table (stores user information and drawing counts)
- `drawings` table (stores all 28x28 digit drawings)
- Indexes for better query performance
- Row Level Security (RLS) policies for public access
- Optional views for leaderboard and statistics

## Step 3: Verify Tables

After running the SQL:

1. Click on **Table Editor** in the left sidebar
2. You should see two tables:
   - `users`
   - `drawings`

## Step 4: Test the Connection

Run the development server:
```bash
npm run dev
```

Then:
1. Open http://localhost:3000
2. Enter a username
3. Draw a digit
4. Go back to Supabase Table Editor
5. Refresh the `drawings` table - you should see your entry!

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the entire SQL script
- Check that you're in the correct Supabase project

### Error: "permission denied"
- Verify RLS policies were created
- Check that the anon key in `.env.local` matches your Supabase project

### No data appearing in tables
- Check browser console for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Make sure you're not using localStorage (old code) - all storage functions should be async

## Database Schema Details

### users table
| Column | Type | Description |
|--------|------|-------------|
| username | TEXT (PK) | Unique username |
| count | INTEGER | Number of drawings submitted |
| joined_at | TIMESTAMP | When user first joined |
| created_at | TIMESTAMP | Database creation time |

### drawings table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Unique drawing ID |
| username | TEXT (FK) | Reference to users table |
| digit | INTEGER | Digit drawn (0-9) |
| image_data | JSONB | 784-value array (28x28 pixels) |
| timestamp | TIMESTAMP | When drawing was submitted |
| created_at | TIMESTAMP | Database creation time |

## Security Notes

- RLS is enabled on both tables
- Public policies allow read/insert/update for all users
- Admin authentication is handled client-side via environment variables
- No sensitive data is stored in the database (only drawings and usernames)

## Next Steps

After database setup is complete:
1. Test the application locally
2. Deploy to Vercel with `npx vercel --prod`
3. Configure environment variables in Vercel dashboard
