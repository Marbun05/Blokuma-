export function parseBlockList(nodes) {
  if (!Array.isArray(nodes)) return [];
  return nodes.map((node) => ({
    ...node,
    children: node.children ? parseBlockList(node.children) : undefined,
  }));
}
