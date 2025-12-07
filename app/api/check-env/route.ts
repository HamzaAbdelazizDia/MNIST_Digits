import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    adminUsername: !!process.env.NEXT_PUBLIC_ADMIN_USERNAME,
    adminPassword: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
    supabaseUrlValue: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(envCheck);
}
