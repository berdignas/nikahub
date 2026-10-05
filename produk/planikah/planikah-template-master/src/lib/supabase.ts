import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://niohagnvvxvlocllrkxi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb2hhZ252dnh2bG9jbGxya3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MDU5NTQsImV4cCI6MjEwNjQ4MTk1NH0.MDINmfxUinMOWFM_HDJN5VXKFGJTqptehBxOFoUNVJg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co');
};
