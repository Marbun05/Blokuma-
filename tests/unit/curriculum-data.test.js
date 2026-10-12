import { describe, expect, it } from 'vitest';
import {
  getCurriculumMission,
  getCurriculumWorld,
  normalizeStudentClass,
} from '../../src/data/curriculumData.js';
import { validateMissionAnswer } from '../../app/(student)/app/playground/executionQueue.js';

describe('Adaptive adventure curriculum', () => {
  it('provides six missions for each grade and three learning worlds', () => {
    [1, 2, 3, 4, 5, 6].forEach((studentClass) => {
      const world = getCurriculumWorld(studentClass);
      expect(world.missions).toHaveLength(6);
      expect(world.missions.every((mission) => mission.solutions.length > 0)).toBe(true);
    });
    expect(getCurriculumWorld(1).title).toBe('Dunia Ikon & Suara');
    expect(getCurriculumWorld(3).title).toBe('Dunia Blok & Logika');
    expect(getCurriculumWorld(5).title).toBe('Dunia Algoritma & Game');
  });

  it('keeps the specified repeat-based solutions and alternatives', () => {
    expect(getCurriculumMission(1, 2).solutions).toEqual([['sound', 'repeat']]);
    expect(getCurriculumMission(3, 1).solutions).toEqual([
      ['move', 'repeat'],
      ['move', 'move', 'move'],
    ]);
    expect(getCurriculumMission(5, 6).solutions).toEqual([
      ['move', 'jump', 'repeat', 'sound', 'repeat'],
    ]);
  });

  it('matches the requested action sequences for all six islands in each grade band', () => {
    const expectedByClass = {
      1: [
        [['move', 'move', 'move']],
        [['sound', 'repeat']],
        [['move', 'jump']],
        [['move', 'jump', 'move']],
        [['move', 'sound']],
        [['jump', 'sound']],
      ],
      3: [
        [['move', 'repeat'], ['move', 'move', 'move']],
        [['jump', 'repeat']],
        [['jump', 'move', 'move']],
        [['move', 'jump', 'repeat']],
        [['sound', 'repeat']],
        [['move', 'jump', 'repeat', 'sound']],
      ],
      5: [
        [['move', 'repeat']],
        [['jump', 'repeat', 'move']],
        [['jump', 'move', 'repeat']],
        [['jump', 'sound', 'move', 'repeat']],
        [['sound', 'jump', 'repeat']],
        [['move', 'jump', 'repeat', 'sound', 'repeat']],
      ],
    };

    Object.entries(expectedByClass).forEach(([studentClass, expectedSolutions]) => {
      expect(getCurriculumWorld(studentClass).missions.map((mission) => mission.solutions))
        .toEqual(expectedSolutions);
    });
  });

  it('accepts every answer key defined for all three grade bands', () => {
    [1, 3, 5].forEach((representativeClass) => {
      const world = getCurriculumWorld(representativeClass);
      world.missions.forEach((mission) => {
        mission.solutions.forEach((solution) => {
          const answer = solution.map((id) => ({ id }));
          expect(validateMissionAnswer(answer, mission).error).toBeUndefined();
        });
      });
    });
  });

  it('accepts only explicitly allowed block patterns, including stated alternatives', () => {
    const earlyGradeVillage = getCurriculumMission(1, 1);
    expect(validateMissionAnswer(
      [{ id: 'move' }, { id: 'repeat' }],
      earlyGradeVillage
    )).toEqual({ error: 'mission_mismatch' });

    const middleGradeVillage = getCurriculumMission(3, 1);
    expect(validateMissionAnswer(
      [{ id: 'move' }, { id: 'move' }, { id: 'move' }],
      middleGradeVillage
    ).error).toBeUndefined();
  });

  it('normalizes class labels and uses a safe default for invalid values', () => {
    expect(normalizeStudentClass('Kelas 5 SD')).toBe(5);
    expect(normalizeStudentClass('2')).toBe(2);
    expect(normalizeStudentClass('unknown')).toBe(3);
  });
});
