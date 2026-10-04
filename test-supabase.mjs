import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const url = envVars.VITE_SUPABASE_URL || envVars.SUPABASE_URL;
const key = envVars.VITE_SUPABASE_ANON_KEY || envVars.SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function checkSupabase() {
  const { data, error } = await supabase.from('products').select('*');
  console.log(JSON.stringify(data, null, 2));
}

checkSupabase();
