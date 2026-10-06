export function executeAST(nodes) {
  let posX = 0;
  let posY = 0;
  let sayMsg = null;
  const logs = ['[Runtime] Memulai eksekusi blok...'];

  if (Array.isArray(nodes)) {
    nodes.forEach((node) => {
      if (node.type === 'move') {
        posX += Number(node.value || 10);
        logs.push(`[Runtime] Karakter bergerak ke X: ${posX}`);
      } else if (node.type === 'say') {
        sayMsg = String(node.value || 'Halo!');
        logs.push(`[Runtime] Karakter berkata: "${sayMsg}"`);
      }
    });
  }

  return {
    characterPositionX: posX,
    characterPositionY: posY,
    characterSayMessage: sayMsg,
    logs,
  };
}
