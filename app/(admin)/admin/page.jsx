import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="font-heading text-2xl font-bold text-teal-400">Blokuma Admin Panel</span>
        </div>
        <Link to="/" className="text-xs font-bold text-slate-400 hover:text-white">Keluar</Link>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
          <h1 className="font-heading text-2xl font-bold mb-2">Ringkasan Sistem Blokuma</h1>
          <p className="text-xs text-slate-400 mb-6">Manajemen platform, pengguna, galeri publik, dan analytics.</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 font-bold">Total Pengguna</span>
              <p className="font-heading text-2xl font-bold text-teal-400 mt-1">1,250</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 font-bold">Total Guru</span>
              <p className="font-heading text-2xl font-bold text-amber-400 mt-1">48</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 font-bold">Project Publik</span>
              <p className="font-heading text-2xl font-bold text-purple-400 mt-1">380</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 font-bold">Moderasi Galeri</span>
              <p className="font-heading text-2xl font-bold text-emerald-400 mt-1">0 Laporan</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
