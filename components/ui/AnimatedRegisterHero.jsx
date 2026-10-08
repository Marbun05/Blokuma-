import React, { useState } from 'react';

export function AnimatedRegisterHero() {
  const [kikoX, setKikoX] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [speech, setSpeech] = useState('💬 "Klik blok di atas untuk mengontrol Robot Kiko!"');

  const handleMove = () => {
    setKikoX((prev) => prev + 25);
    setSpeech('🡆 "Kiko bergerak 10 langkah ke depan!"');
  };

  const handleRepeat = () => {
    setRotation((prev) => prev + 360);
    setSpeech('🔁 "Kiko berputar 360 derajat dalam perulangan!"');
  };

  const handleSound = () => {
    setSpeech('🎵 "Pop! Pop! Musik koding dimainkan!"');
  };

  const handleJump = () => {
    setIsJumping(true);
    setSpeech('⚡ "Yey! Kiko melompat tinggi!"');
    setTimeout(() => setIsJumping(false), 800);
  };

  const handleReset = () => {
    setKikoX(0);
    setRotation(0);
    setSpeech('💬 "Klik blok di atas untuk mengontrol Robot Kiko!"');
  };

  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-screen bg-gradient-to-br from-white via-teal-50/60 to-amber-50/40 overflow-hidden flex flex-col justify-between p-6 xl:p-10 text-slate-900 border-r border-slate-200 select-none">
      {/* Soft Pastel Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200/50 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

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

        <span className="px-3.5 py-1.5 bg-amber-100 text-amber-900 font-bold rounded-full text-xs uppercase tracking-wider border border-amber-200 shadow-sm">
          ✨ Workshop Koding SD
        </span>
      </div>

      {/* Center Interactive Playground Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
        {/* Clickable Action Code Blocks */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-sm">
          <button
            onClick={handleMove}
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-teal-400 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🡆</span>
            <span>MAJU</span>
          </button>

          <button
            onClick={handleRepeat}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-amber-300 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🔁</span>
            <span>ULANGI</span>
          </button>

          <button
            onClick={handleSound}
            className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-sky-400 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🎵</span>
            <span>SUARA</span>
          </button>

          <button
            onClick={handleJump}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-md border border-emerald-400 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>LOMPAT</span>
          </button>

          <button
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-2xl transition"
          >
            ↺ Reset
          </button>
        </div>

        {/* Center Character: Robot Kiko Stage */}
        <div className="relative group my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-amber-300 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse" />
          <div
            className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white border-4 border-teal-400 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300"
            style={{
              transform: `translateX(${kikoX}px) translateY(${isJumping ? '-24px' : '0px'}) rotate(${rotation}deg)`,
            }}
          >
            <img
              src="/images/Robot.webp"
              alt="Robot Kiko"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>
        </div>

        {/* Dynamic Speech Bubble */}
        <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-center shadow-lg max-w-xs">
          <p className="font-heading text-xs font-bold text-teal-700">
            {speech}
          </p>
        </div>
      </div>

      {/* Bottom Educational Banner Card */}
      <div className="relative z-10 max-w-md bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200 shadow-md">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
          Dunia Koding Visual SD
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Klik tombol koding di atas untuk menguji gerakan Kiko secara langsung sebelum membuat akun!
        </p>
      </div>
    </div>
  );
}
