import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👩‍🏫</span>
          <span className="font-heading text-2xl font-bold text-slate-800">Blokuma Teacher Hub</span>
        </div>
        <Link to="/" className="text-xs font-bold text-teal-600">Keluar ke Beranda</Link>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-slate-900 mb-2">Selamat Datang, Bu Maya!</h1>
          <p className="text-xs text-slate-500 mb-6">Kelola kelas coding dan pantau tugas siswa dengan mudah.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Total Siswa Active</span>
              <p className="font-heading text-2xl font-bold text-teal-600 mt-1">44 Siswa</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Rata-Rata Progress</span>
              <p className="font-heading text-2xl font-bold text-amber-500 mt-1">81%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Project Dihasilkan</span>
              <p className="font-heading text-2xl font-bold text-purple-600 mt-1">30 Project</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Kelas Saya</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Coding SD Nusa Bangsa 4A</h4>
                <p className="text-xs text-slate-500">24 Siswa • Kode: BLOKUMA4A</p>
              </div>
              <Link to="/teacher/classes" className="text-xs font-bold text-teal-600 hover:underline">Detail →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
