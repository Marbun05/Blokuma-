export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  role: UserRole;
  grade?: GradeLevel;
  avatarUrl: string;
}
