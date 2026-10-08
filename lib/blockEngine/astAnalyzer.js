/**
 * AST (Abstract Syntax Tree) Parser & Analyzer untuk Blokuma
 * Mengubah susunan balok logika anak menjadi struktur AST
 * dan menganalisa kesalahan logika tanpa memberikan jawaban langsung (Socratic approach).
 */

/**
 * Mengonversi daftar balok datar menjadi AST terstruktur
 * @param {Array} blocks - List balok dari kanvas
 * @returns {Object} AST Node Root
 */
export function parseBlocksToAST(blocks = []) {
  const root = {
    type: 'Program',
    body: [],
    totalBlocks: blocks.length,
    blockCounts: {},
  };

  if (!Array.isArray(blocks) || blocks.length === 0) {
    return root;
  }

  let currentLoop = null;

  blocks.forEach((block, index) => {
    // Catat frekuensi balok
    const type = block.id || block.type || 'unknown';
    root.blockCounts[type] = (root.blockCounts[type] || 0) + 1;

    const astNode = {
      id: block.instanceId || `node_${index}`,
      type: type,
      label: block.label || type,
      index: index + 1,
      params: block.params || {},
    };

    if (type === 'repeat') {
      astNode.iterations = block.params?.count || 3;
      astNode.children = [];
      root.body.push(astNode);
      currentLoop = astNode;
    } else if (currentLoop && type !== 'repeat') {
      // Masukkan ke dalam body loop jika sebelumnya ada loop
      currentLoop.children.push(astNode);
    } else {
      root.body.push(astNode);
    }
  });

  return root;
}

/**
 * Menganalisis AST terhadap target misi untuk menemukan gap logika
 * @param {Object} ast - AST dari parser
 * @param {Object} targetLevel - Metadata target (umpama: jarak sungai, jumlah rintangan)
 * @returns {Object} Hasil Diagnosa Logika
 */
export function analyzeASTLogic(ast, targetLevel = {}) {
  const {
    targetDistance = 4,
    hasRiver = true,
    riverStartPos = 2,
    riverWidth = 2,
    hasObstacle = false,
    requiredBlocks = ['move'],
  } = targetLevel;

  const moveCount = ast.blockCounts?.move || 0;
  const jumpCount = ast.blockCounts?.jump || 0;
  const loopCount = ast.blockCounts?.repeat || 0;
  const soundCount = ast.blockCounts?.sound || 0;

  // Hitung perkiraan total langkah maju
  let calculatedSteps = moveCount;
  if (loopCount > 0 && moveCount > 0) {
    // Jika ada loop
    calculatedSteps = moveCount * 3;
  }

  const issues = [];

  // Issue 1: Kurang langkah sebelum rintangan/sungai
  if (hasRiver && calculatedSteps < riverWidth + riverStartPos) {
    issues.push({
      code: 'UNDER_STEP',
      severity: 'medium',
      details: {
        actualSteps: calculatedSteps,
        neededSteps: riverWidth + riverStartPos,
        riverWidth: riverWidth,
      },
    });
  }

  // Issue 2: Lupa lompat saat ada rintangan/sungai
  if (hasRiver && jumpCount === 0 && calculatedSteps >= riverStartPos) {
    issues.push({
      code: 'MISSING_JUMP',
      severity: 'high',
      details: {
        riverStartPos,
      },
    });
  }

  // Issue 3: Blok ulangi dipakai tapi belum ada instruksi pendahulu
  if (loopCount > 0 && ast.body.length > 0 && ast.body[0].type === 'repeat') {
    issues.push({
      code: 'ORPHAN_LOOP',
      severity: 'high',
      details: {
        position: 1,
      },
    });
  }

  // Issue 4: Kanvas kosong
  if (ast.totalBlocks === 0) {
    issues.push({
      code: 'EMPTY_CANVAS',
      severity: 'low',
      details: {},
    });
  }

  return {
    ast,
    calculatedSteps,
    targetDistance,
    issues,
    hasIssues: issues.length > 0,
  };
}

/**
 * Fallback generator Socratic Hint Lokal jika Edge Function offline
 * @param {Object} analysis - Hasil dari analyzeASTLogic
 * @param {string} gradeLevel - Tingkat SD (SD 1-2, SD 3-4, SD 5-6)
 * @returns {Object} Socratic Hint
 */
export function generateLocalSocraticHint(analysis, gradeLevel = 'SD 3-4') {
  const { issues, calculatedSteps, targetDistance } = analysis;

  if (!issues || issues.length === 0) {
    return {
      hint: "Wah, susunan balokmu sudah kelihatan keren banget! Coba klik tombol hijau 'Jalankan Kreasimu' untuk melihat Kiko melompat!",
      emotion: 'cheerful',
      highlightBlockTypes: [],
      socraticQuestions: ['Apakah urutan balokmu sudah sesuai keinginanmu?'],
    };
  }

  const primaryIssue = issues[0];

  switch (primaryIssue.code) {
    case 'UNDER_STEP':
      if (gradeLevel === 'SD 1-2') {
        return {
          hint: `Ups! Kiko baru jalan ${calculatedSteps} langkah nih, padahal sungainya masih di depan! Coba hitung lagi yuk, butuh berapa balok maju ya? 🌊`,
          emotion: 'curious',
          highlightBlockTypes: ['move'],
          socraticQuestions: ['Berapa langkah yang Kiko butuhkan agar sampai ke seberang?'],
        };
      } else if (gradeLevel === 'SD 5-6') {
        return {
          hint: `Akumulasi langkah Kiko saat ini adalah ${calculatedSteps} unit. Padahal lebar rintangan membutuhkan ${primaryIssue.details.neededSteps} unit. Coba analisa pola pengulangannya!`,
          emotion: 'thinking',
          highlightBlockTypes: ['move', 'repeat'],
          socraticQuestions: ['Dapatkah kamu menggunakan balok Ulangi untuk menghemat susunan balok?'],
        };
      } else {
        // SD 3-4 (Default)
        return {
          hint: `Ups! Kiko cuma jalan ${calculatedSteps} langkah, padahal sungainya lebar lho. Coba cek lagi balok angka birumu, butuh berapa lompatan ya? 🚀`,
          emotion: 'curious',
          highlightBlockTypes: ['move', 'repeat'],
          socraticQuestions: [
            'Berapa lompatan yang kurang agar Kiko tidak basah?',
            'Apakah balok Ulangi bisa membantumu?',
          ],
        };
      }

    case 'MISSING_JUMP':
      return {
        hint: 'Kiko melihat ada sungai jernih di depannya! Kalau cuma jalan kaki, nanti Kiko basah kuyup. Balok mana ya yang bikin Kiko melayang ke udara? 🦘',
        emotion: 'surprised',
        highlightBlockTypes: ['jump'],
        socraticQuestions: ['Bagaimana cara Kiko melewati sungai tanpa basah?'],
      };

    case 'ORPHAN_LOOP':
      return {
        hint: 'Eh, Kiko bingung nih! Balok Ulangi dipasang di paling atas, tapi belum ada balok perintah yang mau diulangi. Coba pasang balok perintah dulu sebelum Ulangi ya! 🔁',
        emotion: 'thinking',
        highlightBlockTypes: ['repeat'],
        socraticQuestions: ['Perintah apa yang ingin kamu ulangi 3 kali?'],
      };

    case 'EMPTY_CANVAS':
      return {
        hint: 'Meja eksperimen Kiko masih sepi nih! Yuk pilih balok warna-warni di sebelah kiri untuk mulai menggerakkan Kiko! ✨',
        emotion: 'encouraging',
        highlightBlockTypes: ['move'],
        socraticQuestions: ['Gerakan apa yang pertama kali ingin kamu coba?'],
      };

    default:
      return {
        hint: 'Hampir berhasil! Coba teliti urutan balokmu dari paling atas ke paling bawah. Ada langkah yang terlewat tidak ya? 🧐',
        emotion: 'thinking',
        highlightBlockTypes: [],
        socraticQuestions: ['Coba jalankan di dalam pikiranmu: Kiko bergerak ke mana saja?'],
      };
  }
}
