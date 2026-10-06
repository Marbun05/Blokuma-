import { supabaseClient } from '../../lib/supabase/client.js';

export const DEMO_PROFILES = {
  'kiko@blokuma.id': {
    id: 'demo-student-kiko',
    fullName: 'Kiko Pratama',
    nickname: 'Kiko',
    email: 'kiko@blokuma.id',
    role: 'student',
    grade: 4,
    avatarUrl: '🧑‍🚀',
  },
  'parent@blokuma.id': {
    id: 'demo-parent-budi',
    fullName: 'Ayah Budi',
    nickname: 'Ayah Budi',
    email: 'parent@blokuma.id',
    role: 'parent',
    avatarUrl: '👨‍👩‍👧',
  },
  'guru@blokuma.id': {
    id: 'demo-teacher-maya',
    fullName: 'Bu Maya Pertiwi',
    nickname: 'Bu Maya',
    email: 'guru@blokuma.id',
    role: 'teacher',
    avatarUrl: '👩‍🏫',
  },
  'admin@blokuma.id': {
    id: 'demo-admin-blokuma',
    fullName: 'Admin Blokuma',
    nickname: 'Admin',
    email: 'admin@blokuma.id',
    role: 'admin',
    avatarUrl: '🛡️',
  },
};

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
    updated_at: new Date().toISOString(),
  };

  try {
    await supabaseClient.from('profiles').upsert([profileData]);
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
  } catch (err) {
    console.warn('Supabase DB table sync warning:', err);
  }

  return profileData;
}

/**
 * Sign in user with email & password, then fetch profile
 */
export async function loginUser({ email, password }) {
  // Check if this is a known demo account
  const lowerEmail = (email || '').trim().toLowerCase();
  const demoProfile = DEMO_PROFILES[lowerEmail];

  try {
    // 1. Authenticate with Supabase
    const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (demoProfile) {
        return demoProfile;
      }
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
    }

    return {
      id: userId,
      fullName: authData.user.user_metadata?.full_name || 'Pengguna Blokuma',
      nickname: authData.user.user_metadata?.nickname || 'ArsitekKode',
      email: authData.user.email,
      role: authData.user.user_metadata?.role || 'student',
      grade: authData.user.user_metadata?.grade || 4,
      avatarUrl: '🧑‍🚀',
    };
  } catch (err) {
    if (demoProfile) {
      return demoProfile;
    }
    throw err;
  }
}

/**
 * Sign out current user from Supabase Auth
 */
export async function logoutUser() {
  try {
    await supabaseClient.auth.signOut();
  } catch (err) {
    // Ignore signout errors
  }
}
