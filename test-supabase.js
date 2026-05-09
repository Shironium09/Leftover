const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  // First login as some user or just try to insert and see if it's RLS or unique constraint
  // We don't have a user, so it might fail with RLS. 
  // Let's just try to see if the table has the unique constraint by querying the openapi spec
  const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
  const spec = await res.json();
  console.log(JSON.stringify(spec.definitions.recipes, null, 2));
}
test();
