import { create } from 'zustand';
import { loginUser, registerUser, logoutUser } from '../../services/auth/auth-service.js';

export const useAuthStore = create((set) => ({
  user: {
    id: 'usr-kiko-123',
    fullName: 'Kiko Pratama',
    nickname: 'Kiko',
    email: 'kiko@blokuma.id',
    role: 'student',
    grade: 4,
    avatarUrl: '🧑‍🚀',
  },
  isAuthenticated: true,
  loading: false,

  setUserProfile: (profile) => set({ user: profile, isAuthenticated: true }),

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
