import React, { useState } from 'react';

export function AnimatedLoginHero() {
  const [kikoX, setKikoX] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [portalActive, setPortalActive] = useState(false);
  const [speech, setSpeech] = useState('💬 "Halo Arsitek Kode! Siap Masuk Gerbang?"');
  const [xpPoints, setXpPoints] = useState(1240);

  const handleOpenPortal = () => {
    setPortalActive(true);
    setSpeech('🔑 "Gerbang Portal Koding Terbuka!"');
  };

  const handleChargeXp = () => {
    setXpPoints((prev) => prev + 50);
    setSpeech('⭐ "+50 XP Energi Koding Ditambahkan!"');
  };

  const handleLaunch = () => {
    setIsJumping(true);
    setKikoX((prev) => prev + 30);
    setSpeech('🚀 "Kiko Meluncur ke Petualangan!"');
    setTimeout(() => setIsJumping(false), 800);
  };

  const handleReset = () => {
    setKikoX(0);
    setPortalActive(false);
    setSpeech('💬 "Halo Arsitek Kode! Siap Masuk Gerbang?"');
  };

  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-screen bg-gradient-to-br from-white via-amber-50/50 to-teal-50/60 overflow-hidden flex flex-col justify-between p-6 xl:p-10 text-slate-900 border-r border-slate-200 select-none">
      {/* Soft Pastel Background Glow Spheres */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl transition duration-700 ${portalActive ? 'bg-amber-300/60 scale-125' : 'bg-amber-200/40'}`} />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-teal-200/50 rounded-full blur-3xl animate-pulse" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow animate-bounce">
            🚀
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-slate-800">
            Blokuma
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-teal-100 text-teal-800 font-bold rounded-full text-xs uppercase tracking-wider border border-teal-200 shadow-sm">
            ⭐ {xpPoints} XP
          </span>
        </div>
      </div>

      {/* Center Interactive Animated Portal Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
        {/* Clickable Action Block Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-sm">
          <button
            onClick={handleOpenPortal}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-amber-300 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🔑</span>
            <span>BUKA PORTAL</span>
          </button>

          <button
            onClick={handleChargeXp}
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-teal-400 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>⭐</span>
            <span>ISI ENERGI XP</span>
          </button>

          <button
            onClick={handleLaunch}
            className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-purple-400 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🚀</span>
            <span>MELUNCUR</span>
          </button>

          <button
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-2xl transition"
          >
            ↺ Reset
          </button>
        </div>

        {/* Center Character Stage */}
        <div className="relative group my-4">
          <div className={`absolute inset-0 rounded-full blur-2xl transition duration-500 ${portalActive ? 'bg-amber-400 opacity-80 animate-pulse' : 'bg-teal-300 opacity-50'}`} />
          <div
            className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white border-4 transition-all duration-300 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden ${
              portalActive ? 'border-amber-400 ring-8 ring-amber-100' : 'border-teal-400'
            }`}
            style={{
              transform: `translateX(${kikoX}px) ${isJumping ? 'translateY(-24px)' : 'translateY(0px)'}`,
            }}
          >
            <span className="text-7xl sm:text-8xl transition transform active:scale-110">
              🧑‍🚀
            </span>
          </div>
        </div>

        {/* Dynamic Speech Bubble */}
        <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-center shadow-lg max-w-xs">
          <p className="font-heading text-xs font-bold text-slate-800">
            {speech}
          </p>
        </div>
      </div>

      {/* Bottom Educational Banner Card */}
      <div className="relative z-10 max-w-md bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200 shadow-md">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
          Gerbang Masuk Arsitek Kode
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Klik tombol aksi di atas untuk menguji energi koding Kiko sebelum masuk ke dashboard!
        </p>
      </div>
    </div>
  );
}
