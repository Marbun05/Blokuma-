import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../../../components/navigation/StudentSidebar.jsx';
import { supabase } from '../../../../../../lib/supabase/client.js';

const GAMES_CATALOG = {
  'hutan-ajaib-melodi': {
    id: 'hutan-ajaib-melodi',
    title: 'Hutan Ajaib Melodi',
    author: 'Rania Arsitek',
    grade: 'Kelas 2 SD',
    category: 'Musik Interaktif',
    initialLikes: 24,
    themeColor: 'from-teal-400 via-emerald-200 to-amber-100',
    icon: '🎵',
    description: 'Mainkan balok nada musik di hutan ajaib dan dengarkan Kiko menari mengikuti irama!',
  },
  'kiko-baterai-emas': {
    id: 'kiko-baterai-emas',
    title: 'Kiko Mencari Baterai Emas',
    author: 'Bima Pratama',
    grade: 'Kelas 4 SD',
    category: 'Petualangan Labirin',
    initialLikes: 42,
    themeColor: 'from-sky-400 via-teal-200 to-emerald-100',
    icon: '🤖',
    description: 'Kendalikan Kiko melintasi labirin untuk mengumpulkan seluruh baterai emas sebelum energi habis!',
  },
  'balap-roket-galaksi': {
    id: 'balap-roket-galaksi',
    title: 'Balap Roket Galaksi',
    author: 'Alya Bintang',
    grade: 'Kelas 5 SD',
    category: 'Game Arcade',
    initialLikes: 38,
    themeColor: 'from-purple-900 via-indigo-700 to-fuchsia-600',
    icon: '🚀',
    description: 'Kemudikan roket galaksi Kiko menembus bintang dan kumpulkan poin skor tertinggi!',
  },
};

export default function GalleryGamePlayPage() {
  const { gameId } = useParams();
  const gameInfo = GAMES_CATALOG[gameId] || {
    id: gameId || 'game-kreatif',
    title: `Game Kreatif #${gameId}`,
    author: 'Sahabat Blokuma',
    grade: 'Kelas 3 SD',
    category: 'Kreasi Bebas',
    initialLikes: 15,
    themeColor: 'from-amber-300 via-orange-200 to-teal-100',
    icon: '🎮',
    description: 'Game interaktif karya sahabat koding Blokuma!',
  };

  const [likes, setLikes] = useState(gameInfo.initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, name: 'Kiko', text: 'Gamenya seru banget! Aku suka melodinya! 🎶', class: 'Kelas 3 SD' },
    { id: 2, name: 'Siti', text: 'Keren banget animasi roketnya! 🚀⭐', class: 'Kelas 4 SD' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Game state khusus
  const [batteryScore, setBatteryScore] = useState(0);
  const [kikoX, setKikoX] = useState(20);
  const [kikoY, setKikoY] = useState(40);
  const [rocketSpeed, setRocketSpeed] = useState(1);
  const [notePlaying, setNotePlaying] = useState(null);

  // Play audio note
  const playSoundNote = (freq) => {
    setNotePlaying(freq);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {}
    setTimeout(() => setNotePlaying(null), 300);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Kamu (Arsitek Kode)',
        text: newComment,
        class: 'Kelas SD',
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-5xl">
        {/* Header Game & Navigasi Kembali */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/app/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 px-3 py-1.5 rounded-xl border border-teal-300 transition mb-2"
            >
              <span>← Kembali ke Galeri Karya</span>
            </Link>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <span>{gameInfo.icon}</span>
              <span>{gameInfo.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Karya oleh: <strong className="text-teal-700">{gameInfo.author}</strong> ({gameInfo.grade}) • <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">{gameInfo.category}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition border-2 ${
                hasLiked
                  ? 'bg-rose-500 text-white border-rose-600 shadow-lg scale-105'
                  : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200 shadow-sm'
              }`}
            >
              <span>❤️</span>
              <span>{likes} Suka</span>
            </button>
          </div>
        </div>

        {/* Layar Game Utama (Dedicated Stage) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-slate-200 card-chunky shadow-xl mb-8">

          {/* Game Stage Specific Views */}
          {gameId === 'hutan-ajaib-melodi' && (
            <div className="bg-gradient-to-b from-teal-400 via-emerald-200 to-amber-100 rounded-2xl p-6 min-h-[320px] flex flex-col items-center justify-between text-center relative overflow-hidden border-2 border-teal-300 shadow-inner">
              <span className="text-xs font-extrabold text-teal-900 bg-white/90 px-3 py-1 rounded-full border border-teal-300 shadow-sm">
                🌲 Panggung Musik Hutan Ajaib 🎵
              </span>

              <div className="my-auto flex flex-col items-center gap-3">
                <img
                  src="/images/Robot.webp"
                  alt="Robot Kiko Menari"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/robot.webp";
                  }}
                  className={`w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-xl transition transform ${
                    notePlaying ? 'scale-125 rotate-12' : 'animate-kiko-idle'
                  }`}
                />
                <span className="text-xs font-bold text-slate-800 bg-white/90 px-3 py-1 rounded-xl border border-teal-200 shadow-sm">
                  {notePlaying ? '🎶 Kiko menari mengikuti nada musik!' : 'Klik tombol balok nada di bawah untuk memainkan melodi!'}
                </span>
              </div>

              {/* Pad Nada Musik */}
              <div className="grid grid-cols-4 gap-2.5 w-full max-w-md mt-4">
                {[
                  { note: 'DO 🎵', freq: 523.25, color: 'bg-rose-500 hover:bg-rose-600 text-white' },
                  { note: 'RE 🎶', freq: 587.33, color: 'bg-amber-500 hover:bg-amber-600 text-white' },
                  { note: 'MI 🎵', freq: 659.25, color: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
                  { note: 'FA 🎶', freq: 698.46, color: 'bg-sky-500 hover:bg-sky-600 text-white' },
                ].map((pad, idx) => (
                  <button
                    key={idx}
                    onClick={() => playSoundNote(pad.freq)}
                    className={`py-3 rounded-xl font-extrabold text-xs shadow-md active:scale-90 transition ${pad.color}`}
                  >
                    {pad.note}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameId === 'kiko-baterai-emas' && (
            <div className="bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-100 rounded-2xl p-6 min-h-[320px] flex flex-col justify-between relative overflow-hidden border-2 border-sky-300 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold bg-white/90 px-3 py-1.5 rounded-xl border border-teal-200 shadow-sm">
                <span>⚡ Energi Baterai: {batteryScore * 25}%</span>
                <span>🔋 Baterai Emas Terkumpul: {batteryScore} / 4</span>
              </div>

              {/* Labirin Arena */}
              <div className="my-auto relative h-48 bg-white/60 rounded-2xl border-2 border-dashed border-teal-300 p-4 overflow-hidden">
                <div
                  className="absolute transition-all duration-200"
                  style={{ left: `${kikoX}%`, top: `${kikoY}%` }}
                >
                  <img
                    src="/images/Robot.webp"
                    alt="Kiko Labirin"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/robot.webp";
                    }}
                    className="w-14 h-14 object-contain drop-shadow-md"
                  />
                </div>

                {/* Baterai Emas Target */}
                <div className="absolute right-[15%] top-[30%] text-3xl animate-bounce">
                  ⚡
                </div>
              </div>

              {/* Kontrol Pad Panah */}
              <div className="flex justify-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setKikoX((x) => Math.max(x - 15, 5));
                    setBatteryScore((s) => Math.min(s + 1, 4));
                  }}
                  className="toy-btn-teal px-4 py-2 font-bold text-xs rounded-xl"
                >
                  ◄ Kiri
                </button>
                <button
                  onClick={() => {
                    setKikoX((x) => Math.min(x + 15, 80));
                    setBatteryScore((s) => Math.min(s + 1, 4));
                  }}
                  className="toy-btn-teal px-4 py-2 font-bold text-xs rounded-xl"
                >
                  Kanan ►
                </button>
              </div>
            </div>
          )}

          {gameId === 'balap-roket-galaksi' && (
            <div className="bg-gradient-to-b from-purple-950 via-indigo-900 to-fuchsia-800 rounded-2xl p-6 min-h-[320px] flex flex-col justify-between relative overflow-hidden border-2 border-purple-500 shadow-inner text-white">
              <div className="flex items-center justify-between text-xs font-bold bg-purple-900/80 px-3 py-1.5 rounded-xl border border-purple-400">
                <span>🚀 Kecepatan Roket: {rocketSpeed * 100} km/jam</span>
                <span>⭐ Skor Galaksi: {rocketSpeed * 150} Poin</span>
              </div>

              <div className="my-auto relative h-40 flex items-center justify-center">
                <div className={`transition-transform duration-300 ${rocketSpeed > 1 ? 'animate-bounce scale-110' : ''}`}>
                  <span className="text-6xl block">🚀</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setRocketSpeed((s) => Math.min(s + 1, 5))}
                  className="toy-btn-amber px-6 py-2.5 font-bold text-xs rounded-xl"
                >
                  ⚡ Tambah Kecepatan Roket!
                </button>
              </div>
            </div>
          )}

          {/* Generic Game Screen Fallback */}
          {gameId !== 'hutan-ajaib-melodi' && gameId !== 'kiko-baterai-emas' && gameId !== 'balap-roket-galaksi' && (
            <div className="bg-gradient-to-b from-amber-300 via-orange-200 to-teal-100 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
              <span className="text-6xl mb-3 animate-bounce">🎮</span>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-1">{gameInfo.title}</h3>
              <p className="text-xs text-slate-700 font-medium max-w-md mb-4">{gameInfo.description}</p>
              <button onClick={() => alert('Game siap dimainkan!')} className="toy-btn-teal px-6 py-3 font-bold text-sm rounded-xl">
                Mulai Bermain! 🚀
              </button>
            </div>
          )}

        </div>

        {/* Panel Apresiasi & Komentar Teman */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 card-chunky shadow-sm">
          <h3 className="font-heading font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <span>💬</span>
            <span>Apresiasi & Komentar Sahabat ({comments.length})</span>
          </h3>

          <form onSubmit={handleAddComment} className="flex gap-2.5 mb-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis pesan apresiasi keren untuk pembuat game..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            />
            <button type="submit" className="toy-btn-teal px-5 py-2.5 font-bold text-xs rounded-xl shadow-toyTeal shrink-0">
              Kirim ❤️
            </button>
          </form>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-sm font-bold text-teal-800 shrink-0">
                  {c.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-xs text-slate-900">{c.name}</span>
                    <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.2 rounded-md font-extrabold border border-teal-200">
                      {c.class}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
