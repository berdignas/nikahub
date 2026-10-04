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

async function deleteDummy() {
  const dummyIds = [
    'prod-tenda-maroko-vip',
    'prod-catering-sultan-500',
    'prod-mua-signature-glam',
    'prod-foto-sinema-cinematic',
    'prod-undangan-web-luxury',
    'prod-dummy-pelaminan-mewah'
  ];

  const { data, error } = await supabase
    .from('products')
    .delete()
    .in('id', dummyIds);

  if (error) {
    console.error("Failed to delete dummy products:", error);
  } else {
    console.log("Successfully deleted dummy products from Supabase!");
  }
}

deleteDummy();
