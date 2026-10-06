import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-md">
            🚀
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-slate-800">
            Blokuma
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-semibold text-sm">
          <a href="#fitur" className="hover:text-teal-600 transition">Fitur</a>
          <a href="#adaptive" className="hover:text-teal-600 transition">Mode Belajar</a>
          <Link to="/parent" className="hover:text-teal-600 transition">Untuk Orang Tua</Link>
          <Link to="/teacher" className="hover:text-teal-600 transition">Untuk Guru</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-bold text-white bg-teal-500 hover:bg-teal-600 rounded-full shadow-md hover:shadow-lg transition transform active:scale-95"
          >
            Mulai Belajar
          </Link>
        </div>
      </div>
    </header>
  );
}
