import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://sjmnjoiqrtgxhknbnjyd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data } = await supabase.from('profiles').select('*').limit(5);
  console.log(data);
}
test();
