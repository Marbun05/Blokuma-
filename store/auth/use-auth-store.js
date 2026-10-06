import { create } from 'zustand';

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

  login: (role, name) => {
    set({
      isAuthenticated: true,
      user: {
        id: `usr-${Date.now()}`,
        fullName: name || 'Pengguna Blokuma',
        nickname: name?.split(' ')[0] || 'ArsitekKode',
        email: 'user@blokuma.id',
        role,
        grade: role === 'student' ? 4 : undefined,
        avatarUrl: role === 'student' ? '🧑‍🚀' : role === 'parent' ? '👨‍👩‍👧' : '👩‍🏫',
      },
    });
  },

  logout: () => set({ user: null, isAuthenticated: false }),
}));
