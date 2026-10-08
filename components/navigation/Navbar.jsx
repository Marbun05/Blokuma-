import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-toyTeal border-b-2 border-teal-700 group-hover:scale-105 transition transform">
            🧱
          </div>
          <div>
            <span className="font-heading text-2xl font-bold tracking-tight text-slate-850 text-teal-900 block leading-tight">
              Blokuma
            </span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              Koding Anak SD
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-slate-600 font-bold text-sm">
          <a href="#demo" className="hover:text-teal-600 transition flex items-center gap-1">
            <span>🎮</span> Coba Main
          </a>
          <a href="#adaptive" className="hover:text-teal-600 transition flex items-center gap-1">
            <span>🎒</span> Pilihan Kelas
          </a>
          <Link to="/parent" className="hover:text-teal-600 transition flex items-center gap-1">
            <span>👨‍👩‍👧</span> Ruang Orang Tua
          </Link>
          <Link to="/teacher" className="hover:text-teal-600 transition flex items-center gap-1">
            <span>👩‍🏫</span> Ruang Guru
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-teal-600 transition"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="toy-btn-teal px-5 py-2.5 text-sm font-bold rounded-xl shadow-toyTeal flex items-center gap-1.5"
          >
            <span>🚀</span> Yuk, Mulai Main!
          </Link>
        </div>
      </div>
    </header>
  );
}
