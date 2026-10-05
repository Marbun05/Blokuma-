import { BlockASTNode } from '../../blocks/ast/ast-node';

export function generateJavaScriptFromAST(nodes: BlockASTNode[]): string {
  let code = '// JavaScript Code generated from Blokuma AST\n';
  nodes.forEach((node) => {
    if (node.type === 'move') {
      code += `character.move(${node.value || 10});\n`;
    } else if (node.type === 'repeat') {
      code += `for (let i = 0; i < ${node.value || 3}; i++) {\n`;
      if (node.children) {
        code += generateJavaScriptFromAST(node.children).split('\n').map(l => '  ' + l).join('\n') + '\n';
      }
      code += `}\n`;
    } else if (node.type === 'say') {
      code += `character.say("${node.value || 'Halo'}");\n`;
    }
  });
  return code.trim();
}
