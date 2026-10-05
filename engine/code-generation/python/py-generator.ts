import { BlockASTNode } from '../../blocks/ast/ast-node';

export function generatePythonFromAST(nodes: BlockASTNode[]): string {
  let code = '# Python Code generated from Blokuma AST\n';
  nodes.forEach((node) => {
    if (node.type === 'move') {
      code += `character.move(${node.value || 10})\n`;
    } else if (node.type === 'repeat') {
      code += `for i in range(${node.value || 3}):\n`;
      if (node.children && node.children.length > 0) {
        code += generatePythonFromAST(node.children).split('\n').map(l => '    ' + l).join('\n') + '\n';
      } else {
        code += `    pass\n`;
      }
    } else if (node.type === 'say') {
      code += `character.say("${node.value || 'Halo'}")\n`;
    }
  });
  return code.trim();
}
