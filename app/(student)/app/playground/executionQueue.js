const EXECUTABLE_BLOCK_IDS = new Set(['move', 'jump', 'sound']);

export function buildExecutionQueue(canvasBlocks) {
  // 1. Validation Guard: Cek jika 'repeat' dipasang paling awal / tanpa perintah aksi sebelumnya
  const hasInvalidRepeat = canvasBlocks.some((block, index) => (
    block.id === 'repeat'
    && (index === 0 || !EXECUTABLE_BLOCK_IDS.has(canvasBlocks[index - 1].id))
  ));

  if (hasInvalidRepeat) {
    return { error: 'orphan_loop' };
  }

  // 2. Cek apakah ada blok yang tidak didukung
  const unsupportedBlock = canvasBlocks.find((block) => (
    block.id !== 'repeat' && !EXECUTABLE_BLOCK_IDS.has(block.id)
  ));
  if (unsupportedBlock) {
    return { error: 'unsupported_block', block: unsupportedBlock };
  }

  // 3. Bangun Antrean Eksekusi Berurutan (Execution Queue)
  const queue = [];
  for (let index = 0; index < canvasBlocks.length; index += 1) {
    const block = canvasBlocks[index];

    if (block.id === 'repeat') {
      // Ambil balok perintah TEPAT SEBELUMNYA di kanvas (misal: 'jump' / MELOMPAT TINGGI)
      const previousBlock = canvasBlocks[index - 1];

      if (previousBlock && EXECUTABLE_BLOCK_IDS.has(previousBlock.id)) {
        // Masukkan 3 salinan eksplisit dari balok sebelumnya ke antrean
        queue.push(
          { block: previousBlock, repetition: 1, repetitions: 3, isRepeat: true },
          { block: previousBlock, repetition: 2, repetitions: 3, isRepeat: true },
          { block: previousBlock, repetition: 3, repetitions: 3, isRepeat: true }
        );
      }
    } else {
      // Masukkan perintah aksi biasa (1x eksekusi awal)
      queue.push({
        block,
        repetition: 1,
        repetitions: 1,
        isRepeat: false,
      });
    }
  }

  return { queue };
}

export function validateMissionAnswer(canvasBlocks, mission) {
  const execution = buildExecutionQueue(canvasBlocks);
  if (execution.error) return execution;

  if (!mission?.solutions?.length) {
    return { error: 'missing_mission_solution' };
  }

  const submittedBlocks = canvasBlocks.map(({ id }) => id);
  const isCorrect = mission.solutions.some((solution) => (
    solution.length === submittedBlocks.length
    && solution.every((blockId, index) => blockId === submittedBlocks[index])
  ));

  return isCorrect ? execution : { error: 'mission_mismatch' };
}