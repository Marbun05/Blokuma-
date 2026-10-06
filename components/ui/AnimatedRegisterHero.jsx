import React from 'react';

export function AnimatedRegisterHero() {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-8 xl:p-12 text-white select-none">
      {/* Dynamic Animated Gradient Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Top Brand Logo */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-lg animate-bounce">
            🚀
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-white">
            Blokuma
          </span>
        </div>

        <span className="px-3.5 py-1 bg-amber-400 text-slate-900 font-bold rounded-full text-xs uppercase tracking-wider shadow-md">
          ✨ Kelas 1–6 SD
        </span>
      </div>

      {/* Center Interactive Animated Playground Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        {/* Floating Animated Code Blocks */}
        <div className="absolute -top-12 -left-4 bg-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-teal-300/40 animate-bounce flex items-center gap-2" style={{ animationDuration: '3s' }}>
          <span>🡆</span>
          <span>MAJU 10 LANGKAH</span>
        </div>

        <div className="absolute -top-8 -right-4 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-amber-200 animate-bounce flex items-center gap-2" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
          <span>🔁</span>
          <span>ULANGI 3 KALI</span>
        </div>

        <div className="absolute -bottom-10 -left-6 bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-sky-300/40 animate-bounce flex items-center gap-2" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <span>🎵</span>
          <span>MAINkan SUARA POP</span>
        </div>

        <div className="absolute -bottom-12 -right-6 bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-purple-300/40 animate-bounce flex items-center gap-2" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>
          <span>⚡</span>
          <span>JIKA NABRAK LOMPAT</span>
        </div>

        {/* Center Character: Bouncing Robot Kiko */}
        <div className="relative group my-8">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse" />
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-900/80 backdrop-blur-md border-4 border-teal-400/50 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
            <span className="text-7xl sm:text-8xl animate-bounce" style={{ animationDuration: '2.5s' }}>
              🤖
            </span>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 px-5 py-2 rounded-2xl text-center shadow-xl">
          <p className="font-heading text-sm font-bold text-teal-300">
            💬 "Robot Kiko Siap Mengikuti Blok Kodemu!"
          </p>
        </div>
      </div>

      {/* Bottom Educational Banner Card */}
      <div className="relative z-10 max-w-lg bg-slate-900/60 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-2xl">
        <h3 className="font-heading text-lg font-bold text-white mb-1">
          Dunia Koding Visual SD
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          Rancang game, animasi, cerita interaktif, dan musik menggunakan blok koding adaptif yang menyenangkan!
        </p>
      </div>
    </div>
  );
}
