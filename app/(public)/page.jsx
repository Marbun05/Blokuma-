import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { Footer } from '../../components/navigation/Footer.jsx';

export default function LandingPage() {
  // State untuk menyimpan daftar blok yang disusun pengguna di Kanvas
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  
  // State animasi & status maskot
  const [isRunning, setIsRunning] = useState(false);
  const [robotPosition, setRobotPosition] = useState(0); // Posisi horizontal (px)
  const [robotJump, setRobotJump] = useState(false); // Status melompat
  const [actionMessage, setActionMessage] = useState('Pilih blok lalu klik Jalankan Kode!');

  // Daftar Pilihan Blok yang Tersedia
  const availableBlocks = [
    { id: 'move', label: '➔ MAJU 1 LANGKAH', color: 'bg-teal-500 hover:bg-teal-600 text-white' },
    { id: 'jump', label: '🦘 MELOMPAT', color: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'repeat', label: '🔁 ULANGI 3 KALI', color: 'bg-amber-400 hover:bg-amber-500 text-slate-900' },
    { id: 'sound', label: '🎵 MAINKAN SUARA POP', color: 'bg-sky-500 hover:bg-sky-600 text-white' },
  ];

  // Tambahkan blok ke Kanvas
  const handleAddBlock = (block) => {
    if (isRunning) return;
    setCanvasBlocks((prev) => [...prev, { ...block, instanceId: Date.now() + Math.random() }]);
  };

  // Hapus semua blok di Kanvas
  const handleClearCanvas = () => {
    if (isRunning) return;
    setCanvasBlocks([]);
    setActionMessage('Kanvas dikosongkan. Pilih blok baru!');
  };

  // Fungsi Pemutar Audio POP Kustom (public/sounds/pop.mp3)
  const playPopSound = () => {
    try {
      const audio = new Audio('/sounds/jokowi-saya-akan-lawan.mp3');
      audio.volume = 0.8;
      audio.play().catch(() => {
        console.log('Autoplay diblokir browser atau file pop.mp3 belum ada di public/sounds/');
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Helper Delay Async
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Eksekutor Tunggal Per-Blok
  const executeSingleBlock = async (blockId) => {
    if (blockId === 'move') {
      setActionMessage('🚀 Robot Kiko: Maju 1 Langkah!');
      setRobotPosition((prev) => Math.min(prev + 25, 120)); // Tambah posisi maju
      await sleep(700);
    } else if (blockId === 'jump') {
      setActionMessage('🦘 Robot Kiko: Melompat!');
      setRobotJump(true);
      await sleep(400);
      setRobotJump(false);
      await sleep(300);
    } else if (blockId === 'sound') {
      setActionMessage('🎵 Robot Kiko: Memainkan Suara POP!');
      playPopSound();
      await sleep(700);
    }
  };

  // Jalankan Kode Sesuai Urutan Kanvas
  const handleRunCode = async () => {
    if (isRunning) return;

    if (canvasBlocks.length === 0) {
      setActionMessage('⚠️ Kanvas masih kosong! Tambahkan blok terlebih dahulu.');
      return;
    }

    // Validasi khusus: Jika blok pertama adalah ULANGI 3 KALI (tidak ada perintah sebelumnya)
    if (canvasBlocks[0].id === 'repeat') {
      setActionMessage('⚠️ Masukkan perintah lain terlebih dahulu sebelum menambahkan blok Ulangi 3 Kali!');
      return;
    }

    setIsRunning(true);
    setRobotPosition(0); // Reset posisi awal

    for (let i = 0; i < canvasBlocks.length; i++) {
      const currentBlock = canvasBlocks[i];

      if (currentBlock.id === 'repeat') {
        // Ambil perintah tepat sebelum blok 'ULANGI 3 KALI'
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 to-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full font-bold text-xs uppercase tracking-wider mb-4 border border-amber-200 shadow-sm">
              ✨ Creative Digital Workshop
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Belajar Coding dengan Cara Membangun!
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Blokuma membantu anak SD kelas 1–6 mengubah ide menjadi game, animasi, cerita, musik, dan eksperimen interaktif. Anak berperan sebagai <strong className="text-teal-700">"Arsitek Kode"</strong>!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-teal-200 transition transform active:scale-95 flex items-center gap-2"
              >
                <span>🚀</span> Mulai Petualangan
              </Link>
              <a
                href="#demo"
                className="px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 font-bold text-lg rounded-2xl border border-slate-200 transition"
              >
                Lihat Cara Kerja
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-2xl relative">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-heading font-bold text-xs text-slate-400 ml-2">Panggung Arsitek Kode Kiko</span>
              </div>
              <div className="h-64 bg-slate-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-6xl animate-bounce mb-2">🧑‍🚀</div>
                <div className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md animate-pulse">
                  💬 "Hore! Kiko Bergerak 10 Langkah!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Coba Blok Coding Interaktif (Tanpa Login) */}
      <section id="demo" className="py-16 bg-white border-y border-slate-200 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">Coba Blok Coding Interaktif (Tanpa Login)</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-sm">
            Pilih blok di tabel kiri untuk menyusun instruksi ke Kanvas. Maskot HANYA akan menjalankan urutan kode yang ada di Kanvas!
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* 1. Tabel Pilihan Blok (Kiri) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
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
                *Klik perintah di atas untuk memasukkannya ke Kanvas Blok.
              </p>
            </div>

            {/* 2. Kanvas Blok Tersusun (Tengah) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between min-h-[260px]">
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

                <div className="space-y-2 min-h-[160px] p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  {canvasBlocks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center">
                      <span>Belum ada blok dipilih.</span>
                      <span>Klik perintah di tabel sebelah kiri!</span>
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

            {/* 3. Panggung Maskot & Tombol Jalankan (Kanan) */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[280px] text-center relative overflow-hidden">
              <div className="my-auto w-full flex flex-col items-center gap-3">
                {/* Visual Karakter Robot */}
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

              {/* Tombol Eksekusi Kode Kanvas */}
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
                    Menjalankan Kanvas...
                  </>
                ) : (
                  '▶ Jalankan Kode'
                )}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Adaptive Learning Section */}
      <section id="adaptive" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Sistem Pembelajaran Adaptif Sesuai Usia Anak</h2>
          <p className="text-slate-600">Seluruh antarmuka berubah menyesuaikan kemampuan kognitif jenjang kelas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">🎨</span>
            <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full font-bold text-xs uppercase">Kelas 1–2</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Ikon & Suara</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Icon-first, tombol besar, voice command Web Speech API, audio storytelling, drag-and-drop intuitif.</p>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">🧩</span>
            <span className="px-3 py-1 bg-teal-200 text-teal-900 rounded-full font-bold text-xs uppercase">Kelas 3–4</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Blok & Logika</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Text-block sederhana, perulangan (loops), kondisi (if/else) dasar, penyelesaian masalah berurutan.</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">⚡</span>
            <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full font-bold text-xs uppercase">Kelas 5–6</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Algoritma & Game</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Variabel, skor, timer, game logic, dan fitur "Intip Kode Asli" (konversi ke JavaScript / Python real-time).</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-teal-600 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl font-bold mb-4">Siap Menjadi Arsitek Kode?</h2>
          <p className="text-teal-100 text-lg mb-8">Bergabunglah dengan ribuan anak lain yang telah merancang karya digital pertamanya di Blokuma!</p>
          <Link
            to="/register"
            className="px-10 py-5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xl rounded-2xl shadow-2xl transition transform active:scale-95 inline-block"
          >
            Mulai Petualangan Blokuma
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}