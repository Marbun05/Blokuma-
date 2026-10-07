export function validateBlockNode(node) {
  if (node?.type === 'repeat' && typeof node.value === 'number' && node.value > 100) {
    return { isValid: false, errorMessage: 'Jumlah perulangan terlalu besar.' };
  }
  return { isValid: true };
}
