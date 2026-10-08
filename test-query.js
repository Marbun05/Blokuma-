import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://sjmnjoiqrtgxhknbnjyd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { count: studentCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student');
  const { count: teacherCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher');
  const { count: projectCount } = await supabase.from('projects').select('id', { count: 'exact', head: true });
  console.log(studentCount, teacherCount, projectCount);
}
test();
