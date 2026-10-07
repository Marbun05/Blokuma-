import { create } from 'zustand';

export const useLearningStore = create((set, get) => ({
  grade: 4,
  setGrade: (grade) => set({ grade }),
  getPhaseModeTitle: () => {
    const { grade } = get();
    if (grade <= 2) return 'Dunia Ikon & Suara';
    if (grade <= 4) return 'Dunia Blok & Logika';
    return 'Dunia Algoritma & Game';
  },
}));
