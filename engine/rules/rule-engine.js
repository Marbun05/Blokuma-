export function evaluateRules(nodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return {
      passed: false,
      code: 'EMPTY_CANVAS',
      userFriendlyMessage: 'Belum ada blok di panggung! Coba tarik blok maju atau lompat.',
    };
  }

  for (const node of nodes) {
    if (node.type === 'repeat' && Number(node.value) > 100) {
      return {
        passed: false,
        code: 'LOOP_LIMIT_EXCEEDED',
        userFriendlyMessage: 'Perulangan kamu melebihi batas (100 kali). Coba kecilkan angkanya!',
      };
    }
  }

  return {
    passed: true,
    code: 'SUCCESS',
    userFriendlyMessage: 'Susunan blok sudah rapi dan siap dijalankan!',
  };
}
