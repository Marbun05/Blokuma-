import { BlockASTNode } from '../ast/ast-node';

export interface StageState {
  characterPositionX: number;
  characterPositionY: number;
  characterSayMessage: string | null;
  logs: string[];
}

export function executeAST(nodes: BlockASTNode[]): StageState {
  let posX = 0;
  let posY = 0;
  let sayMsg: string | null = null;
  const logs: string[] = ['[Runtime] Memulai eksekusi blok...'];

  nodes.forEach((node) => {
    if (node.type === 'move') {
      posX += Number(node.value || 10);
      logs.push(`[Runtime] Karakter bergerak ke X: ${posX}`);
    } else if (node.type === 'say') {
      sayMsg = String(node.value || 'Halo!');
      logs.push(`[Runtime] Karakter berkata: "${sayMsg}"`);
    }
  });

  return {
    characterPositionX: posX,
    characterPositionY: posY,
    characterSayMessage: sayMsg,
    logs,
  };
}
