import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherClassesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-purple-300">
              🏫 Kelola Rombel Siswa
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
              Daftar Kelas Bimbingan
            </h1>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Bagikan Kode Gabung kepada siswa agar mereka otomatis masuk ke ruang kelas dan menerima modul tugas.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        <div className="space-y-4">
          {/* Kelas 4A */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎒</span>
                <h3 className="font-heading font-bold text-xl text-slate-900">Coding SD Nusa Bangsa 4A</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                24 Siswa Terdaftar • Kurikulum: <strong className="text-teal-700">Dunia Blok & Logika (Fase B)</strong>
              </p>
            </div>

            <div className="bg-teal-50 border-2 border-teal-300 px-5 py-3 rounded-xl flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-800 block">Kode Gabung Siswa:</span>
                <strong className="text-lg font-extrabold text-teal-900 tracking-wider">BLOKUMA4A</strong>
              </div>
              <button
                onClick={() => alert('Kode BLOKUMA4A disalin!')}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition"
              >
                Salin 📋
              </button>
            </div>
          </div>

          {/* Kelas 4B */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎒</span>
                <h3 className="font-heading font-bold text-xl text-slate-900">Coding SD Nusa Bangsa 4B</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                20 Siswa Terdaftar • Kurikulum: <strong className="text-amber-700">Dunia Blok & Logika (Fase B)</strong>
              </p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-300 px-5 py-3 rounded-xl flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 block">Kode Gabung Siswa:</span>
                <strong className="text-lg font-extrabold text-amber-900 tracking-wider">BLOKUMA4B</strong>
              </div>
              <button
                onClick={() => alert('Kode BLOKUMA4B disalin!')}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition"
              >
                Salin 📋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

