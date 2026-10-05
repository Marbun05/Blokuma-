import { BlockASTNode } from '../ast/ast-node';

export interface ValidationOutput {
  isValid: boolean;
  errorMessage?: string;
}

export function validateBlockNode(node: BlockASTNode): ValidationOutput {
  if (node.type === 'repeat' && typeof node.value === 'number' && node.value > 100) {
    return { isValid: false, errorMessage: 'Jumlah perulangan terlalu besar.' };
  }
  return { isValid: true };
}
