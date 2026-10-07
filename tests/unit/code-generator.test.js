import { describe, it, expect } from 'vitest';
import { generateJavaScriptFromAST } from '../../engine/code-generation/javascript/js-generator.js';
import { generatePythonFromAST } from '../../engine/code-generation/python/py-generator.js';

describe('Real-time Code Generator', () => {
  const sampleAST = [
    { id: '1', category: 'motion', type: 'move', label: 'Maju', value: 10 },
    { id: '2', category: 'looks', type: 'say', label: 'Bicara', value: 'Halo Blokuma!' },
  ];

  it('should generate valid JavaScript snippet', () => {
    const js = generateJavaScriptFromAST(sampleAST);
    expect(js).toContain('character.move(10);');
    expect(js).toContain('character.say("Halo Blokuma!");');
  });

  it('should generate valid Python snippet', () => {
    const py = generatePythonFromAST(sampleAST);
    expect(py).toContain('character.move(10)');
    expect(py).toContain('character.say("Halo Blokuma!")');
  });
});
