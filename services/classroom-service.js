import { supabaseClient } from '../lib/supabase/client.js';

/**
 * Fetch dynamic rombel kelas / classrooms from Supabase PostgreSQL database
 * @param {string} [teacherId] - Optional teacher ID to filter classrooms owned by teacher
 * @returns {Promise<Array>} List of classroom objects
 */
export async function fetchClassrooms(teacherId) {
  try {
    if (teacherId) {
      const { data: teacherClasses, error: teacherErr } = await supabaseClient
        .from('classrooms')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('name', { ascending: true });

      if (!teacherErr && teacherClasses && teacherClasses.length > 0) {
        return teacherClasses;
      }
    }

    // Fallback: Fetch all active rombel kelas from `classrooms` table in database
    const { data: allClassrooms, error: allErr } = await supabaseClient
      .from('classrooms')
      .select('*')
      .order('name', { ascending: true });

    if (allErr) {
      console.error('Error fetching classrooms from database:', allErr.message);
      return [];
    }

    return allClassrooms || [];
  } catch (err) {
    console.error('Error in fetchClassrooms service:', err);
    return [];
  }
}

/**
 * Create a new classroom entry in Supabase database
 * @param {Object} params
 * @param {string} params.teacherId
 * @param {string} params.name
 * @param {string} [params.joinCode]
 */
export async function createClassroom({ teacherId, name, joinCode }) {
  const code = joinCode || `BLK-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

  const { data, error } = await supabaseClient
    .from('classrooms')
    .insert([
      {
        teacher_id: teacherId,
        name: name.trim(),
        join_code: code,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
