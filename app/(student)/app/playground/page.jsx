import React, { useState } from 'react';

export default function PlaygroundModule() {
  // State untuk menyimpan daftar blok yang disusun pengguna di Kanvas
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  
  // State animasi & status maskot
  const [isRunning, setIsRunning] = useState(false);
  const [robotPosition, setRobotPosition] = useState(0); // Posisi horizontal (px)
  const [robotJump, setRobotJump] = useState(false); // Status melompat
  const [actionMessage, setActionMessage] = useState('Pilih blok lalu klik Jalankan Kode!');

  // Daftar Pilihan Blok Perintah
  const availableBlocks = [
    { id: 'move', label: '➔ MAJU 1 LANGKAH', color: 'bg-teal-500 hover:bg-teal-600 text-white' },
    { id: 'jump', label: '🦘 MELOMPAT', color: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'repeat', label: '🔁 ULANGI 3 KALI', color: 'bg-amber-400 hover:bg-amber-500 text-slate-900' },
    { id: 'sound', label: '🎵 MAINkan SUARA POP', color: 'bg-sky-500 hover:bg-sky-600 text-white' },
  ];

  // Tambahkan blok ke Kanvas
  const handleAddBlock = (block) => {
    if (isRunning) return;
    setCanvasBlocks((prev) => [...prev, { ...block, instanceId: Date.now() + Math.random() }]);
  };

  // Hapus semua blok di Kanvas & Reset Maskot ke Tengah/Posisi Awal
  const handleClearCanvas = () => {
    if (isRunning) return;
    setCanvasBlocks([]);
    setRobotPosition(0); // Kembalikan posisi maskot ke titik awal
    setRobotJump(false);
    setActionMessage('Kanvas dikosongkan & Maskot kembali ke posisi awal!');
  };

  // Pemutar Audio POP Kustom (public/sounds/pop.mp3)
  const playPopSound = () => {
    try {
      const audio = new Audio('/sounds/pop.mp3');
      audio.volume = 0.8;
      audio.play().catch((err) => {
        console.log('Autoplay diblokir browser atau file pop.mp3 belum ada:', err);
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Helper Delay Async
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Eksekutor Per-Blok
  const executeSingleBlock = async (blockId) => {
    if (blockId === 'move') {
      setActionMessage('🚀 Robot Kiko: Maju 1 Langkah!');
      setRobotPosition((prev) => Math.min(prev + 25, 140)); // Akumulasi posisi maju
      await sleep(600);
    } else if (blockId === 'jump') {
      setActionMessage('🦘 Robot Kiko: Melompat!');
      setRobotJump(true);
      await sleep(400);
      setRobotJump(false);
      await sleep(300);
    } else if (blockId === 'sound') {
      setActionMessage('🎵 Robot Kiko: Memainkan Suara POP!');
      playPopSound();
      await sleep(600);
    }
  };

  // Jalankan Kode Sesuai Urutan di Kanvas
  const handleRunCode = async () => {
    if (isRunning) return;

    if (canvasBlocks.length === 0) {
      setActionMessage('⚠️ Kanvas masih kosong! Tambahkan blok terlebih dahulu.');
      return;
    }

    // Validasi: Jika blok pertama adalah ULANGI 3 KALI (tidak ada perintah sebelumnya)
    if (canvasBlocks[0].id === 'repeat') {
      setActionMessage('⚠️ Masukkan perintah lain terlebih dahulu sebelum menambahkan blok Ulangi 3 Kali!');
      return;
    }

    setIsRunning(true);
    // Posisi tidak di-reset ke 0 di sini agar pergerakan maju terakumulasi!

    for (let i = 0; i < canvasBlocks.length; i++) {
      const currentBlock = canvasBlocks[i];

      if (currentBlock.id === 'repeat') {
        const previousBlock = i > 0 ? canvasBlocks[i - 1] : null;

        if (previousBlock && previousBlock.id !== 'repeat') {
          setActionMessage(`🔁 Mengulangi perintah "${previousBlock.label}" sebanyak 3 Kali...`);
          await sleep(500);

          for (let r = 1; r <= 3; r++) {
            setActionMessage(`🔁 Perulangan (${r}/3): ${previousBlock.label}`);
            await executeSingleBlock(previousBlock.id);
          }
        } else {
          setActionMessage('⚠️ Tidak ada perintah valid sebelum blok Ulangi!');
          await sleep(1000);
        }
      } else {
        await executeSingleBlock(currentBlock.id);
      }
    }

    setActionMessage('✨ Horay! Seluruh instruksi di Kanvas berhasil dijalankan!');
    setIsRunning(false);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-6xl mx-auto my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* 1. Panel Pilih Perintah (Kiri) */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <p className="font-heading font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
              <span>📋 Pilih Perintah:</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">Klik untuk tambah</span>
            </p>
            <div className="space-y-2.5">
              {availableBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block)}
                  disabled={isRunning}
                  className={`w-full p-3 rounded-xl font-bold text-xs shadow-sm text-left transition transform active:scale-95 flex items-center justify-between ${block.color}`}
                >
                  <span>{block.label}</span>
                  <span className="text-base">+</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 italic">
            *Pilih perintah di atas untuk menyusunnya ke Kanvas.
          </p>
        </div>

        {/* 2. Kanvas Blok (Tengah) */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-heading font-bold text-slate-800 text-sm">🧩 Kanvas Blok:</p>
              {canvasBlocks.length > 0 && (
                <button
                  onClick={handleClearCanvas}
                  disabled={isRunning}
                  className="text-xs text-rose-500 hover:underline font-bold"
                >
                  Reset Kanvas
                </button>
              )}
            </div>

            <div className="space-y-2 min-h-[160px] p-3 bg-white rounded-xl border border-dashed border-slate-200">
              {canvasBlocks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center">
                  <span>Belum ada blok dipilih.</span>
                  <span>Klik perintah di sebelah kiri!</span>
                </div>
              ) : (
                canvasBlocks.map((block, idx) => (
                  <div
                    key={block.instanceId}
                    className={`p-2.5 rounded-lg font-bold text-xs shadow-sm flex items-center justify-between ${block.color}`}
                  >
                    <span>{idx + 1}. {block.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 3. Area Maskot & Eksekusi (Kanan) */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[280px] text-center relative overflow-hidden">
          <div className="my-auto w-full flex flex-col items-center gap-3">
            <div
              className={`text-6xl transition-all duration-300 ease-out transform ${
                robotJump ? '-translate-y-10 scale-125' : 'translate-y-0'
              }`}
              style={{
                transform: `translateX(${robotPosition}px) ${robotJump ? 'translateY(-35px)' : ''}`,
              }}
            >
              🤖
            </div>
            <p className="font-heading font-bold text-teal-300 text-xs sm:text-sm transition-all min-h-[36px] flex items-center justify-center">
              {actionMessage}
            </p>
          </div>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`w-full py-3 px-6 font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2 ${
              isRunning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-600 text-white active:scale-95'
            }`}
          >
            {isRunning ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menjalankan Kode...
              </>
            ) : (
              '▶ Jalankan Kode'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}