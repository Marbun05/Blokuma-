import React from 'react';

export function AnimatedRegisterHero() {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-screen bg-gradient-to-br from-white via-teal-50/60 to-amber-50/40 overflow-hidden flex flex-col justify-between p-6 xl:p-10 text-slate-900 border-r border-slate-200 select-none">
      {/* Soft Pastel Animated Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200/50 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Top Brand Header */}
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
          ✨ Kelas 1–6 SD
        </span>
      </div>

      {/* Center Animated Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
        {/* Floating Animated Code Block Pills */}
        <div className="absolute -top-6 -left-2 bg-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-teal-400 animate-bounce flex items-center gap-2" style={{ animationDuration: '3s' }}>
          <span>🡆</span>
          <span>MAJU 10 LANGKAH</span>
        </div>

        <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-amber-300 animate-bounce flex items-center gap-2" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
          <span>🔁</span>
          <span>ULANGI 3 KALI</span>
        </div>

        <div className="absolute -bottom-6 -left-4 bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-sky-400 animate-bounce flex items-center gap-2" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <span>🎵</span>
          <span>MAINkan SUARA POP</span>
        </div>

        <div className="absolute -bottom-8 -right-4 bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-400 animate-bounce flex items-center gap-2" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>
          <span>⚡</span>
          <span>JIKA NABRAK LOMPAT</span>
        </div>

        {/* Center Character: Bouncing Robot Kiko */}
        <div className="relative group my-8">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-amber-300 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse" />
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white border-4 border-teal-400 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
            <span className="text-7xl sm:text-8xl animate-bounce" style={{ animationDuration: '2.5s' }}>
              🤖
            </span>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="bg-white border border-slate-200 px-5 py-2 rounded-2xl text-center shadow-lg">
          <p className="font-heading text-xs font-bold text-teal-700">
            💬 "Robot Kiko Siap Mengikuti Kodemu!"
          </p>
        </div>
      </div>

      {/* Bottom Educational Banner Card */}
      <div className="relative z-10 max-w-md bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200 shadow-md">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
          Dunia Koding Visual SD
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Rancang game, animasi, cerita interaktif, dan musik menggunakan blok koding adaptif yang menyenangkan!
        </p>
      </div>
    </div>
  );
}
