import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL) ||
  'https://sjmnjoiqrtgxhknbnjyd.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
