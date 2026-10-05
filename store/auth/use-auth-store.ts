import { create } from 'zustand';
import { UserProfile, UserRole } from '../../domain/users/types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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

  login: (role: UserRole, name?: string) => {
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
