import React from 'react';
import { Link } from 'react-router-dom';

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👨‍👩‍👧</span>
          <span className="font-heading text-2xl font-bold text-slate-800">Blokuma Parent Area</span>
        </div>
        <Link to="/" className="text-xs font-bold text-teal-600">Keluar ke Beranda</Link>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full">
            Profil Anak Terhubung
          </span>
          <h1 className="font-heading text-2xl font-bold text-slate-900 mt-2 mb-4">
            Perkembangan Belajar: Kiko Pratama (Kelas 4 SD)
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Total Waktu Belajar</span>
              <p className="font-heading text-2xl font-bold text-teal-600 mt-1">4.5 Jam / Minggu</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Total Project Dibuat</span>
              <p className="font-heading text-2xl font-bold text-amber-500 mt-1">4 Project</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Streaks Belajar</span>
              <p className="font-heading text-2xl font-bold text-emerald-600 mt-1">7 Hari Berturut</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">Rekomendasi Pendampingan Orang Tua</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kiko menunjukkan minat sangat tinggi pada pembuatan game sederhana. Coba tanyakan game apa yang sedang dia rancang hari ini dan berikan pujian atas kreativitasnya!
          </p>
        </div>
      </main>
    </div>
  );
}
