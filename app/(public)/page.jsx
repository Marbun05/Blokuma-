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

  // Daftar Pilihan Blok yang Tersedia (dengan styling balok mainan 3D taktil)
  const availableBlocks = [
    { id: 'move', label: '➔ MAJU 1 LANGKAH', color: 'bg-teal-500 hover:bg-teal-600 text-white border-b-4 border-teal-700' },
    { id: 'jump', label: '🦘 MELOMPAT TINGGI', color: 'bg-indigo-500 hover:bg-indigo-600 text-white border-b-4 border-indigo-700' },
    { id: 'repeat', label: '🔁 ULANGI 3 KALI', color: 'bg-amber-400 hover:bg-amber-500 text-slate-900 border-b-4 border-amber-600' },
    { id: 'sound', label: '🎵 SUARA POP CERIA', color: 'bg-sky-500 hover:bg-sky-600 text-white border-b-4 border-sky-700' },
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
    setRobotPosition(0); // Memastikan maskot kembali ke posisi awal/tengah
    setRobotJump(false);
    setActionMessage('Kanvas dikosongkan & Maskot kembali ke posisi awal!');
  };

  // Efek Audio POP Interaktif Ceria menggunakan Web Audio API (100% stabil tanpa file eksternal)
  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 pop
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

    // Validasi: Jika blok pertama adalah ULANGI 3 KALI (tidak ada perintah sebelumnya)
    if (canvasBlocks[0].id === 'repeat') {
      setActionMessage('⚠️ Masukkan perintah lain terlebih dahulu sebelum menambahkan blok Ulangi 3 Kali!');
      return;
    }

    setIsRunning(true);
    // CATATAN: setRobotPosition(0) sengaja tidak dipanggil di sini 
    // agar posisi maju terakumulasi saat Jalankan Kode diklik berturut-turut!

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
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      <Navbar />

      {/* Hero Section: Dinamis, Edukatif & Playful */}
      <section className="relative overflow-hidden bg-craft-dots pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Kolom Teks & Microcopy Ramah Anak (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100/90 text-amber-900 rounded-full font-bold text-xs uppercase tracking-wider mb-5 border-2 border-amber-300 shadow-sm">
              <span>🎈</span>
              <span>Panggung Coding Ceria • Khusus Anak SD Kelas 1–6</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-5">
              Bikin Game & Cerita Seru Sendiri,{' '}
              <span className="text-teal-600 underline decoration-amber-400 decoration-wavy decoration-2">
                Semudah Menyusun Balok!
              </span>{' '}
              🧱✨
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed max-w-2xl font-medium">
              Selamat datang di dunia kreasi Blokuma! Di sini kamu jadi <strong className="text-teal-700 font-bold">"Arsitek Kode Cilik"</strong>. Rangkai balok logika, gerakkan robot Kiko, bunyikan musik ceria, dan buat karyamu sendiri tanpa rumus koding yang bikin pusing!
            </p>

            {/* Nilai Plus Edukasi (Visual Badges) */}
            <div className="flex flex-wrap gap-2.5 mb-8 text-xs font-bold text-slate-700">
              <span className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                <span>✓</span> 100% Visual & Interaktif
              </span>
              <span className="bg-sky-50 text-sky-800 px-3 py-1.5 rounded-xl border border-sky-200 flex items-center gap-1.5 shadow-sm">
                <span>🛡️</span> Aman & Bebas Iklan
              </span>
              <span className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 shadow-sm">
                <span>🎒</span> Adaptif Kelas 1 sampai 6
              </span>
            </div>

            {/* Tombol CTA Percakapan Seru */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="toy-btn-teal px-8 py-4 font-bold text-lg rounded-2xl shadow-toyTeal flex items-center gap-2.5 group"
              >
                <span className="text-xl group-hover:scale-125 transition transform">🚀</span>
                <span>Yuk, Mulai Petualangan!</span>
              </Link>
            </div>
          </div>

          {/* Kolom Visual Playful: Meja Eksperimen & Karakter Kiko (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-teal-300 shadow-toyTeal relative">
              {/* Header Panggung Ceria (Bukan macOS traffic dots yang dingin) */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-teal-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="font-heading font-bold text-sm text-teal-800">
                    Meja Eksperimen Robot Kiko
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Live Preview
                </span>
              </div>

              {/* Panggung Playground Penuh Warna & Maskot Kiko */}
              <div className="bg-gradient-to-b from-sky-100 via-teal-50 to-amber-50/60 rounded-xl p-5 border-2 border-dashed border-teal-200 relative flex flex-col justify-between min-h-[300px]">
                
                {/* Cuplikan Balok Kode Menempel */}
                <div className="space-y-1.5 w-full max-w-[240px]">
                  <div className="bg-teal-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm border-b-2 border-teal-700 flex items-center gap-1.5">
                    <span>➔</span> MAJU 1 LANGKAH
                  </div>
                  <div className="bg-indigo-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm border-b-2 border-indigo-700 flex items-center gap-1.5">
                    <span>🦘</span> MELOMPAT TINGGI
                  </div>
                  <div className="bg-sky-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm border-b-2 border-sky-700 flex items-center gap-1.5">
                    <span>🎵</span> PUTAR SUARA POP
                  </div>
                </div>

                {/* Maskot Kiko Tersenyum Ramah & Speech Bubble */}
                <div className="my-auto flex flex-col items-center justify-center py-2">
                  <div className="relative">
                    <img
                      src="/images/Robot.webp"
                      alt="Robot Kiko Maskot Blokuma"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/robot.webp";
                      }}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-md hover:scale-105 transition transform"
                    />
                  </div>
                  <div className="mt-2 bg-white px-4 py-1.5 rounded-full border-2 border-teal-300 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>💬</span> "Halo Arsitek Kode! Susun balok di bawah yuk!"
                  </div>
                </div>

                {/* Rumput & Garis Lantai Interaktif */}
                <div className="w-full">
                  <div className="w-full h-3 bg-emerald-300 rounded-full border-t border-emerald-400" />
                </div>
              </div>

              {/* Tag Mini Edukatif di Bawah Panggung */}
              <div className="mt-3 text-center">
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  🎯 Klik perintah di zona interaktif bawah untuk menggerakkan Kiko!
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section Coba Blok Coding Interaktif (Tanpa Login) */}
      <section id="demo" className="py-16 bg-white border-b-2 border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            🕹️ Arena Coba Langsung
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Susun Baloknya, Lihat Kiko Beraksi!
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Pilih balok perintah di sebelah kiri untuk dimasukkan ke kanvas tengah. Lalu klik tombol hijau dan saksikan Robot Kiko menjalankan kreasimu!
          </p>

          <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-7 border-2 border-slate-200 card-chunky grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* 1. Panel Pilihan Blok (Kiri) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between shadow-sm">
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
                *Klik balok di atas untuk merakit urutan aksi ke Kanvas.
              </p>
            </div>

            {/* 2. Kanvas Blok Tersusun (Tengah) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between min-h-[260px] shadow-sm">
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

                <div className="space-y-2 min-h-[160px] p-3 bg-amber-50/50 rounded-xl border-2 border-dashed border-amber-200">
                  {canvasBlocks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center font-medium">
                      <span className="text-2xl mb-1">📦</span>
                      <span className="font-bold text-slate-600">Kanvas masih kosong nih!</span>
                      <span>Klik balok di sebelah kiri untuk mulai merakit instruksi.</span>
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

            {/* 3. Panggung Maskot & Tombol Jalankan (Kanan) - Hangat, Bukan Void Gelap */}
            <div className="bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 rounded-2xl p-6 border-2 border-sky-300 flex flex-col items-center justify-between min-h-[290px] text-center relative overflow-hidden shadow-sm">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-sky-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Panggung Kiko
                </span>
                <span className="text-xs">🌳 ☀️</span>
              </div>

              <div className="my-auto w-full flex flex-col items-center gap-2">
                {/* Visual Karakter Robot Maskot Kiko */}
                <div
                  className="transition-all duration-300 ease-out flex flex-col items-center justify-center"
                  style={{
                    transform: `translateX(${robotPosition}px)`,
                  }}
                >
                  <div
                    className={`transition-all duration-300 ${
                      robotJump
                        ? '-translate-y-12 scale-125 rotate-6 drop-shadow-2xl'
                        : isRunning
                        ? 'animate-kiko-walk'
                        : 'animate-kiko-idle'
                    }`}
                  >
                    <img
                      src="/images/Robot.webp"
                      alt="Robot Kiko"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/robot.webp";
                      }}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Balon Pesan Responsif Kiko */}
                <div className="bg-white/95 backdrop-blur-sm text-slate-800 px-3.5 py-1.5 rounded-xl border border-teal-200 shadow-sm text-xs font-bold min-h-[32px] flex items-center justify-center max-w-full">
                  {actionMessage}
                </div>
              </div>

              {/* Garis Tanah Panggung */}
              <div className="w-full h-3 bg-emerald-400 rounded-full border-t border-emerald-500 mb-3" />

              {/* Tombol Eksekusi Balok Mainan Taktil */}
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
      </section>

      {/* Adaptive Learning Section: Variasi Visual Rhythm Khusus Anak SD */}
      <section id="adaptive" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            🎒 Belajar Adaptif Sesuai Usia
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Petualangan Seru untuk Semua Jenjang Kelas SD!
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Tampilan dan tingkat tantangan otomatis berubah mengikuti cara berpikir anak, dari yang baru mengenal gambar sampai yang siap merakit game utuh.
          </p>
        </div>

        {/* 3 Kartu dengan Visual Rhythm Berbeda (Ukuran, Aksen & Border Kustom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Kartu 1: Kelas 1-2 (Dunia Ikon & Suara) */}
          <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-6 sm:p-7 hover:-translate-y-1 transition duration-200 shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-2xl bg-amber-200 text-2xl flex items-center justify-center shadow-sm border border-amber-300">
                  🎨
                </span>
                <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full font-bold text-xs uppercase tracking-wide border border-amber-300">
                  Kelas 1–2 SD
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Dunia Ikon & Suara
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
                Belum lancar mengetik? Tidak masalah! Belajar logika lewat tombol ikon bergambar ceria, instruksi suara cerdas, dan geser-pasang puzzle yang mudah dipahami.
              </p>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-amber-200/80 text-xs font-bold text-amber-900">
              <div className="flex items-center gap-1.5">
                <span>🗣️</span> Perintah Suara (Voice Command)
              </div>
              <div className="flex items-center gap-1.5">
                <span>👆</span> Drag-and-Drop Ekstra Besar
              </div>
              <div className="flex items-center gap-1.5">
                <span>🎵</span> Cerita & Suara Interaktif
              </div>
            </div>
          </div>

          {/* Kartu 2: Kelas 3-4 (Dunia Blok & Logika) - HERO / HIGHLIGHT CARD */}
          <div className="bg-teal-50 border-2 border-teal-400 rounded-2xl p-6 sm:p-7 hover:-translate-y-1 transition duration-200 shadow-toyTeal relative flex flex-col justify-between ring-2 ring-teal-300/40 md:-mt-2">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-sm border border-teal-700">
              ⭐ Paling Populer
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-1">
                <span className="w-12 h-12 rounded-2xl bg-teal-200 text-2xl flex items-center justify-center shadow-sm border border-teal-300">
                  🧩
                </span>
                <span className="px-3 py-1 bg-teal-200 text-teal-900 rounded-full font-bold text-xs uppercase tracking-wide border border-teal-300">
                  Kelas 3–4 SD
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Dunia Blok & Logika
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
                Mulai merakit instruksi seperti programmer cilik! Belajar konsep perulangan (loops) agar tidak koding berulang, dan logika kondisi (if/else) untuk memecahkan teka-teki labirin.
              </p>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-teal-200 text-xs font-bold text-teal-900">
              <div className="flex items-center gap-1.5">
                <span>🔁</span> Loop & Perulangan Otomatis
              </div>
              <div className="flex items-center gap-1.5">
                <span>❓</span> Percabangan Logika (Jika-Maka)
              </div>
              <div className="flex items-center gap-1.5">
                <span>🗺️</span> 6 Dunia Petualangan Terbuka
              </div>
            </div>
          </div>

          {/* Kartu 3: Kelas 5-6 (Dunia Algoritma & Game) */}
          <div className="bg-purple-50/80 border-2 border-purple-300 rounded-2xl p-6 sm:p-7 hover:-translate-y-1 transition duration-200 shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-2xl bg-purple-200 text-2xl flex items-center justify-center shadow-sm border border-purple-300">
                  ⚡
                </span>
                <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full font-bold text-xs uppercase tracking-wide border border-purple-300">
                  Kelas 5–6 SD
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Dunia Algoritma & Game
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
                Siap jadi arsitek game sungguhan! Susun variabel skor poin, timer balapan, dan rintangan game. Dilengkapi fitur keren: "Intip Kode Asli" JavaScript & Python kapan saja!
              </p>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-purple-200/80 text-xs font-bold text-purple-900">
              <div className="flex items-center gap-1.5">
                <span>🎮</span> Mekanik Game & Poin Skor
              </div>
              <div className="flex items-center gap-1.5">
                <span>💻</span> Fitur Intip Kode JavaScript
              </div>
              <div className="flex items-center gap-1.5">
                <span>🏆</span> Portofolio Karya Mandiri
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Section: Ceria & Menyenangkan */}
      <section className="py-20 bg-teal-600 text-white text-center px-4 relative overflow-hidden border-t-2 border-teal-700">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block text-3xl mb-3">🌟</span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            Siap Jadi Arsitek Kode Cilik Hari Ini?
          </h2>
          <p className="text-teal-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-medium">
            Yuk, bergabung dengan ribuan anak lain yang sudah asyik merancang game dan animasinya di Blokuma. Gratis selamanya!
          </p>
          <Link
            to="/login"
            className="toy-btn-amber px-10 py-5 font-bold text-xl rounded-2xl shadow-toyAmber inline-flex items-center gap-3 transition transform active:scale-95"
          >
            <span>🚀</span>
            <span>Yuk, Buka Petualangan Gratis!</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}