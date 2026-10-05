import { describe, it, expect } from 'vitest';

describe('Adaptive Grade System', () => {
  it('should correctly determine adaptive phase for grade level', () => {
    const getMode = (grade: number) => {
      if (grade <= 2) return 'Dunia Ikon & Suara';
      if (grade <= 4) return 'Dunia Blok & Logika';
      return 'Dunia Algoritma & Game';
    };

    expect(getMode(1)).toBe('Dunia Ikon & Suara');
    expect(getMode(4)).toBe('Dunia Blok & Logika');
    expect(getMode(6)).toBe('Dunia Algoritma & Game');
  });
});
