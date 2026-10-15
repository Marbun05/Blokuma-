import { create } from 'zustand';
import { loginUser, registerUser, logoutUser } from '../../services/auth/auth-service.js';
import { supabaseClient } from '../../lib/supabase/client.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  setUserProfile: (profile) => {
    set({ user: profile, isAuthenticated: !!profile });
  },

  // Initialize Supabase Auth Session on refresh directly from PostgreSQL (100% DB SSOT)
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
          grade: profile?.grade !== undefined && profile?.grade !== null ? profile.grade : (sessionUser.user_metadata?.grade ?? null),
          avatarUrl: profile?.avatar_url || '🧑‍🚀',
        };

        set({ user: userProfile, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (err) {
      console.warn('Auth session init warning:', err);
    }
  },

  loginWithSupabase: async (email, password) => {
    set({ loading: true });
    try {
      const profile = await loginUser({ email, password });
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
      set({ user: userProfile, isAuthenticated: true, loading: false });
      return userProfile;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, isAuthenticated: false });
  },
}));
