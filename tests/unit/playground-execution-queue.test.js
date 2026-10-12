import { describe, expect, it } from 'vitest';
import { buildExecutionQueue, validateMissionAnswer } from '../../app/(student)/app/playground/executionQueue.js';

describe('Playground execution queue', () => {
  it('executes the command immediately before repeat exactly three times', () => {
    const jump = { id: 'jump', label: 'Melompat' };
    const result = buildExecutionQueue([jump, { id: 'repeat' }]);

    expect(result.queue.map((step) => [step.block.id, step.repetition, step.isRepeat])).toEqual([
      ['jump', 1, false],
      ['jump', 1, true],
      ['jump', 2, true],
      ['jump', 3, true]
    ]);
  });

  it('repeats only the immediately preceding command', () => {
    const blocks = [
      { id: 'move', label: 'Maju' },
      { id: 'jump', label: 'Melompat' },
      { id: 'repeat', label: 'Ulangi 3 Kali' },
      { id: 'sound', label: 'Suara Pop' }
    ];
    const result = buildExecutionQueue(blocks);

    expect(result.queue.map((step) => [step.block.id, step.repetition, step.isRepeat])).toEqual([
      ['move', 1, false],
      ['jump', 1, false],
      ['jump', 1, true],
      ['jump', 2, true],
      ['jump', 3, true],
      ['sound', 1, false]
    ]);
  });

  it('rejects a repeat block without an executable command immediately before it', () => {
    expect(buildExecutionQueue([{ id: 'repeat', label: 'Ulangi 3 Kali' }])).toEqual({
      error: 'orphan_loop'
    });
    expect(buildExecutionQueue([
      { id: 'move', label: 'Maju' },
      { id: 'repeat', label: 'Ulangi 3 Kali' },
      { id: 'repeat', label: 'Ulangi 3 Kali' }
    ])).toEqual({ error: 'orphan_loop' });
  });

  it('rejects unsupported blocks instead of reporting successful execution', () => {
    const unsupportedBlock = { id: 'dance', label: 'Menari' };
    expect(buildExecutionQueue([unsupportedBlock])).toEqual({
      error: 'unsupported_block',
      block: unsupportedBlock
    });
  });

  it('accepts a mission solution and rejects a different valid queue', () => {
    const mission = {
      solutions: [['move', 'repeat'], ['move', 'move', 'move']]
    };
    expect(validateMissionAnswer([{ id: 'move' }, { id: 'repeat' }], mission).queue).toHaveLength(4);
    expect(validateMissionAnswer([{ id: 'jump' }, { id: 'repeat' }], mission)).toEqual({
      error: 'mission_mismatch'
    });
  });

  it('checks the mission key before an action queue can be run', () => {
    const mission = { solutions: [['sound', 'repeat']] };
    expect(validateMissionAnswer([{ id: 'repeat' }], mission)).toEqual({ error: 'orphan_loop' });
    expect(validateMissionAnswer([{ id: 'sound' }, { id: 'repeat' }], mission).queue).toHaveLength(4);
  });

  it('produces four sequential sound actions for one sound followed by repeat', () => {
    const result = buildExecutionQueue([{ id: 'sound' }, { id: 'repeat' }]);

    expect(result.queue.map(({ block }) => block.id)).toEqual([
      'sound',
      'sound',
      'sound',
      'sound'
    ]);
  });
});
