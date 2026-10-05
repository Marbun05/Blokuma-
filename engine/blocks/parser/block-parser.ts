import { BlockASTNode } from '../ast/ast-node';

export function parseBlockList(nodes: BlockASTNode[]): BlockASTNode[] {
  return nodes.map((node) => ({
    ...node,
    children: node.children ? parseBlockList(node.children) : undefined,
  }));
}
