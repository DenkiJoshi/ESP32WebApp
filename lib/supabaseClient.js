import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcsetiikvpisbqcmhyoy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjc2V0aWlrdnBpc2JxY21oeW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTg3MjQsImV4cCI6MjA2NTkzNDcyNH0.ntRguNMGUQO48uLTgNnxc2ziQuU8E7yXxD62F_8eSWY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
