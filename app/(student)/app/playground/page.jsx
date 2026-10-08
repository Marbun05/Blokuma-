import React, { useState } from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { KikoSmartHint } from '../../../../components/ui/KikoSmartHint.jsx';

export default function StudentPlaygroundPage() {
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [robotPosition, setRobotPosition] = useState(0);
  const [robotJump, setRobotJump] = useState(false);
  const [actionMessage, setActionMessage] = useState('Pilih balok lalu klik Jalankan Kode!');
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastExecutionResult, setLastExecutionResult] = useState({ status: 'idle' });

  const availableBlocks = [
    { id: 'move', label: '➔ MAJU 1 LANGKAH', color: 'bg-teal-500 hover:bg-teal-600 text-white border-b-4 border-teal-700' },
    { id: 'jump', label: '🦘 MELOMPAT TINGGI', color: 'bg-indigo-500 hover:bg-indigo-600 text-white border-b-4 border-indigo-700' },
    { id: 'repeat', label: '🔁 ULANGI 3 KALI', color: 'bg-amber-400 hover:bg-amber-500 text-slate-900 border-b-4 border-amber-600' },
    { id: 'sound', label: '🎵 SUARA POP CERIA', color: 'bg-sky-500 hover:bg-sky-600 text-white border-b-4 border-sky-700' },
  ];

  const handleAddBlock = (block) => {
    if (isRunning) return;
    setCanvasBlocks((prev) => [...prev, { ...block, instanceId: Date.now() + Math.random() }]);
  };

  const handleClearCanvas = () => {
    if (isRunning) return;
    setCanvasBlocks([]);
    setRobotPosition(0);
    setRobotJump(false);
    setActionMessage('Kanvas dikosongkan & Maskot kembali ke posisi awal!');
    setAttemptCount(0);
  };

  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeSingleBlock = async (blockId) => {
    if (blockId === 'move') {
      setActionMessage('🚀 Robot Kiko: Maju 1 Langkah!');
      setRobotPosition((prev) => Math.min(prev + 25, 140));
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

  const handleRunCode = async () => {
    if (isRunning) return;

    if (canvasBlocks.length === 0) {
      setActionMessage('⚠️ Kanvas masih kosong! Tambahkan balok terlebih dahulu.');
      return;
    }

    if (canvasBlocks[0].id === 'repeat') {
      setActionMessage('⚠️ Masukkan perintah lain terlebih dahulu sebelum menambahkan balok Ulangi 3 Kali!');
      setAttemptCount((prev) => prev + 1);
      setLastExecutionResult({ status: 'error', reason: 'orphan_loop' });
      return;
    }

    setIsRunning(true);
    setAttemptCount((prev) => prev + 1);

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
          setActionMessage('⚠️ Tidak ada perintah valid sebelum balok Ulangi!');
          await sleep(1000);
        }
      } else {
        await executeSingleBlock(currentBlock.id);
      }
    }

    setActionMessage('✨ Horay! Seluruh instruksi di Kanvas berhasil dijalankan!');
    setLastExecutionResult({ status: 'completed', stepsTaken: canvasBlocks.length });
    setIsRunning(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              🧩 Meja Eksperimen Kode Bebas
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
              Kanvas Coding Robot Kiko
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Rakit perintah balok warna-warni dan lihat aksi Kiko melompat serta bergerak di panggung!
            </p>
          </div>

          {/* Kiko Smart Hint Integration */}
          <KikoSmartHint
            canvasBlocks={canvasBlocks}
            targetLevel={{ targetDistance: 4, riverWidth: 2, hasRiver: true }}
            executionResult={lastExecutionResult}
            attemptCount={attemptCount}
            autoOpenOnFail={true}
          />
        </div>

        <div className="bg-white p-5 sm:p-7 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* 1. Panel Pilih Perintah */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <p className="font-heading font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
                  <span>📋 1. Ambil Balok Perintah:</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                    Klik untuk tambah +
                  </span>
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
                      <span className="text-base font-extrabold">+</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 italic font-medium">
                *Klik balok di atas untuk merakit perintah ke Kanvas.
              </p>
            </div>

            {/* 2. Kanvas Blok */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between min-h-[260px] shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-heading font-bold text-slate-800 text-sm">🧩 2. Kanvas Rakit Kode:</p>
                  {canvasBlocks.length > 0 && (
                    <button
                      onClick={handleClearCanvas}
                      disabled={isRunning}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 transition"
                    >
                      ✕ Bersihkan Kanvas
                    </button>
                  )}
                </div>

                <div className="space-y-2 min-h-[160px] p-3 bg-white rounded-xl border-2 border-dashed border-amber-200">
                  {canvasBlocks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center font-medium">
                      <span className="text-2xl mb-1">📦</span>
                      <span className="font-bold text-slate-600">Kanvas masih kosong nih!</span>
                      <span>Klik balok di sebelah kiri untuk mulai merakit aksi.</span>
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
              <p className="text-[11px] text-slate-400 mt-2 text-right">
                {canvasBlocks.length} balok terpasang
              </p>
            </div>

            {/* 3. Area Maskot & Eksekusi - Panggung Ceria Ramah Anak */}
            <div className="bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 rounded-2xl p-6 border-2 border-sky-300 flex flex-col items-center justify-between min-h-[290px] text-center relative overflow-hidden shadow-sm">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-sky-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Panggung Kiko
                </span>
                <span className="text-xs">🌳 🌊 ☀️</span>
              </div>

              <div className="my-auto w-full flex flex-col items-center gap-2">
                {/* Outer Container: Pergerakan Horizontal (Posisi X) */}
                <div
                  className="transition-all duration-300 ease-out flex flex-col items-center justify-center"
                  style={{
                    transform: `translateX(${robotPosition}px)`,
                  }}
                >
                  {/* Inner Container: Animasi Kiko (Melayang Idle / Jalan / Lompat) */}
                  <div
                    onClick={() => {
                      playPopSound();
                      setActionMessage('😄 Robot Kiko: Yey! Kamu menyapaku!');
                    }}
                    className={`cursor-pointer group transition-all duration-300 ${
                      robotJump
                        ? '-translate-y-12 scale-125 rotate-6 drop-shadow-2xl'
                        : isRunning
                        ? 'animate-kiko-walk'
                        : 'animate-kiko-idle hover:scale-110'
                    }`}
                    title="Klik Robot Kiko untuk menyapa!"
                  >
                    <img
                      src="/images/Robot.webp"
                      alt="Mascot Kiko"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/robot.webp";
                      }}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-xl transition transform group-hover:rotate-6 filter"
                    />
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm text-slate-800 px-3.5 py-1.5 rounded-xl border border-teal-200 shadow-sm text-xs font-bold min-h-[32px] flex items-center justify-center max-w-full">
                  {actionMessage}
                </div>
              </div>

              {/* Garis Lantai Hijau & Visual Sungai */}
              <div className="w-full h-3 bg-emerald-400 rounded-full border-t border-emerald-500 mb-3 relative overflow-hidden">
                <div className="absolute right-1/4 top-0 bottom-0 w-12 bg-sky-500 animate-pulse" title="Sungai" />
              </div>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`w-full py-3.5 px-6 font-bold text-sm sm:text-base rounded-xl transition flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed border-b-2 border-slate-400'
                    : 'toy-btn-teal shadow-toyTeal active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-teal-700 border-t-transparent rounded-full animate-spin" />
                    <span>Sedang Beraksi...</span>
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span>Jalankan Kreasimu! 🚀</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
