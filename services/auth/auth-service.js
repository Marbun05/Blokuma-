import { supabaseClient } from '../../lib/supabase/client.js';

/**
 * Register a new user in Supabase Auth & public.profiles
 */
export async function registerUser({ email, password, fullName, nickname, role, grade, avatarUrl }) {
  // 1. Sign up user in Supabase Auth
  const { data: authData, error: authError } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        nickname: nickname || fullName.split(' ')[0],
        role: role || 'student',
        grade: grade || 4,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const user = authData.user;
  if (!user) {
    throw new Error('Gagal mendaftarkan pengguna di Supabase Auth.');
  }

  // 2. Insert profile into public.profiles table
  const profileData = {
    id: user.id,
    role: role || 'student',
    full_name: fullName,
    nickname: nickname || fullName.split(' ')[0],
    avatar_url: avatarUrl || '🧑‍🚀',
    grade: role === 'student' ? Number(grade || 4) : null,
  };

  const { data: profile, error: profileError } = await supabaseClient
    .from('profiles')
    .upsert([profileData])
    .select()
    .single();

  if (profileError) {
    console.warn('Profile upsert warning:', profileError.message);
  }

  // 3. If student, insert initial progress into public.student_progress
  if (role === 'student') {
    await supabaseClient.from('student_progress').upsert([
      {
        student_id: user.id,
        xp: 100,
        level: 1,
        streak_days: 1,
        skills: { algorithm: 10, logic: 10, sequence: 10, problemSolving: 10 },
      },
    ]);
  }

  return profile || profileData;
}

/**
 * Sign in user with email & password, then fetch profile
 */
export async function loginUser({ email, password }) {
  // 1. Authenticate with Supabase
  const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    throw new Error('Email atau password tidak sesuai. Silakan periksa kembali.');
  }

  const userId = authData.user?.id;

  // 2. Fetch profile from public.profiles table
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profile) {
    return {
      id: profile.id,
      fullName: profile.full_name,
      nickname: profile.nickname || profile.full_name.split(' ')[0],
      email: authData.user.email,
      role: profile.role,
      grade: profile.grade,
      avatarUrl: profile.avatar_url || '🧑‍🚀',
    };
  } else {
    throw new Error('Profil pengguna tidak ditemukan. Silakan hubungi admin.');
  }
}

/**
 * Sign out current user from Supabase Auth
 */
export async function logoutUser() {
  await supabaseClient.auth.signOut();
}
