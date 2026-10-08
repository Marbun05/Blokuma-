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
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-7 border-2 border-slate-700 shadow-md">
          <div className="inline-block px-3 py-1 bg-teal-900/60 text-teal-300 font-bold text-xs rounded-full border border-teal-700 mb-2">
            Panel Pengawas Sistem
          </div>
          <h1 className="font-heading text-2xl font-bold mb-1">Ringkasan Sistem Blokuma</h1>
          <p className="text-xs text-slate-400 mb-6">Manajemen platform, monitoring aktivitas belajar siswa, dan keamanan konten galeri.</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Siswa Aktif</span>
              <p className="font-heading text-3xl font-bold text-teal-400 mt-1">1,250</p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Guru Terverifikasi</span>
              <p className="font-heading text-3xl font-bold text-amber-400 mt-1">48</p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Karya di Galeri</span>
              <p className="font-heading text-3xl font-bold text-purple-400 mt-1">380</p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Moderasi Child-Safe</span>
              <p className="font-heading text-3xl font-bold text-emerald-400 mt-1">100% Aman</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
