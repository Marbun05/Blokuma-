import { create } from 'zustand';
import { loginUser, registerUser, logoutUser } from '../../services/auth/auth-service.js';
import { supabaseClient } from '../../lib/supabase/client.js';

// Load initial user state from localStorage for zero-delay refresh persistence
const getSavedUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('blokuma_user_session');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const savedUser = getSavedUser();

export const useAuthStore = create((set, get) => ({
  user: savedUser,
  isAuthenticated: !!savedUser,
  loading: false,

  setUserProfile: (profile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blokuma_user_session', JSON.stringify(profile));
    }
    set({ user: profile, isAuthenticated: true });
  },

  // Initialize Supabase Auth Session on refresh
  initAuthSession: async () => {
    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const sessionUser = sessionData?.session?.user;

      if (sessionUser) {
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();

        const userProfile = {
          id: sessionUser.id,
          fullName: profile?.full_name || sessionUser.user_metadata?.full_name || 'Siswa Blokuma',
          nickname: profile?.nickname || sessionUser.user_metadata?.nickname || 'Kiko',
          email: sessionUser.email,
          role: profile?.role || sessionUser.user_metadata?.role || 'student',
          grade: profile?.grade || sessionUser.user_metadata?.grade || 4,
          avatarUrl: profile?.avatar_url || '🧑‍🚀',
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('blokuma_user_session', JSON.stringify(userProfile));
        }

        set({ user: userProfile, isAuthenticated: true });
      }
    } catch (err) {
      console.warn('Auth session init warning:', err);
    }
  },

  loginWithSupabase: async (email, password) => {
    set({ loading: true });
    try {
      const profile = await loginUser({ email, password });
      if (typeof window !== 'undefined') {
        localStorage.setItem('blokuma_user_session', JSON.stringify(profile));
      }
      set({ user: profile, isAuthenticated: true, loading: false });
      return profile;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  registerWithSupabase: async (userData) => {
    set({ loading: true });
    try {
      const profile = await registerUser(userData);
      const userProfile = {
        id: profile.id,
        fullName: profile.full_name,
        nickname: profile.nickname,
        email: userData.email,
        role: profile.role,
        grade: profile.grade,
        avatarUrl: profile.avatar_url || '🧑‍🚀',
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('blokuma_user_session', JSON.stringify(userProfile));
      }
      set({ user: userProfile, isAuthenticated: true, loading: false });
      return userProfile;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blokuma_user_session');
      localStorage.removeItem('student_nickname');
      localStorage.removeItem('student_class');
    }
    await logoutUser();
    set({ user: null, isAuthenticated: false });
  },
}));
