import { describe, it, expect } from 'vitest';
import { parseBlockList } from '../../engine/blocks/parser/block-parser';
import { BlockASTNode } from '../../engine/blocks/ast/ast-node';

describe('Block AST Parser', () => {
  it('should parse nested block nodes correctly', () => {
    const rawNodes: BlockASTNode[] = [
      { id: '1', category: 'motion', type: 'move', label: 'Maju 10', value: 10 },
      { id: '2', category: 'control', type: 'repeat', label: 'Ulangi 3x', value: 3, children: [
        { id: '3', category: 'looks', type: 'say', label: 'Halo' }
      ]}
    ];

    const parsed = parseBlockList(rawNodes);
    expect(parsed).toHaveLength(2);
    expect(parsed[1].children).toHaveLength(1);
  });
});
