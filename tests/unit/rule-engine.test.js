import { describe, it, expect } from 'vitest';
import { evaluateRules } from '../../engine/rules/rule-engine.js';

describe('Rule Engine Validation', () => {
  it('should pass for valid blocks', () => {
    const nodes = [{ id: '1', category: 'motion', type: 'move', label: 'Maju' }];
    const res = evaluateRules(nodes);
    expect(res.passed).toBe(true);
  });

  it('should fail when repeat count is excessive', () => {
    const nodes = [{ id: '1', category: 'control', type: 'repeat', label: 'Ulangi 999x', value: 999 }];
    const res = evaluateRules(nodes);
    expect(res.passed).toBe(false);
    expect(res.code).toBe('LOOP_LIMIT_EXCEEDED');
  });
});
