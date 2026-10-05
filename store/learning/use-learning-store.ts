import { create } from 'zustand';
import { GradeLevel } from '../../domain/users/types';

interface LearningState {
  grade: GradeLevel;
  setGrade: (grade: GradeLevel) => void;
  getPhaseModeTitle: () => string;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  grade: 4,
  setGrade: (grade) => set({ grade }),
  getPhaseModeTitle: () => {
    const { grade } = get();
    if (grade <= 2) return 'Dunia Ikon & Suara';
    if (grade <= 4) return 'Dunia Blok & Logika';
    return 'Dunia Algoritma & Game';
  },
}));
