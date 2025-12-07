// Test Supabase connection and data
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'Present (length: ' + supabaseAnonKey.length + ')' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('\n📊 Fetching drawings from Supabase...');
  
  const { data: drawings, error: drawingsError } = await supabase
    .from('drawings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (drawingsError) {
    console.error('❌ Error fetching drawings:', drawingsError);
  } else {
    console.log(`✅ Found ${drawings.length} drawings`);
    if (drawings.length > 0) {
      console.log('\n📝 Latest drawing:');
      console.log('  ID:', drawings[0].id);
      console.log('  Username:', drawings[0].username);
      console.log('  Digit:', drawings[0].digit);
      console.log('  Image data length:', drawings[0].image_data?.length || 0);
      console.log('  First 10 values:', drawings[0].image_data?.slice(0, 10));
      console.log('  Last 10 values:', drawings[0].image_data?.slice(-10));
      console.log('  Unique values:', [...new Set(drawings[0].image_data)].sort((a, b) => a - b));
    }
  }

  console.log('\n👥 Fetching users from Supabase...');
  
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .order('count', { ascending: false });

  if (usersError) {
    console.error('❌ Error fetching users:', usersError);
  } else {
    console.log(`✅ Found ${users.length} users`);
    users.forEach(user => {
      console.log(`  - ${user.username}: ${user.count} drawings`);
    });
  }
}

testConnection().catch(console.error);
