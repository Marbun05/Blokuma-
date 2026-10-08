import React from 'react';
import { Link } from 'react-router-dom';

export default function ParentReportsPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              📄 Unduh Dokumen Rapor
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Laporan Perkembangan Mingguan
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Pantau rekam jejak capaian nalar komputasi Ananda Kiko dalam format ringkas ramah keluarga.
            </p>
          </div>
          <Link
            to="/parent"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300 inline-block mb-1">
                Terbaru (Minggu Ini)
              </span>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Rapor Periode Minggu ke-4: Penguasaan Loop & Gerak Kiko
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                4.5 Jam Belajar • 2 Misi Tuntas • Peningkatan logika dekomposisi +12%
              </p>
            </div>
            <button
              onClick={() => alert('Mengunduh Rapor Minggu ke-4 PDF...')}
              className="toy-btn-teal px-5 py-2.5 text-xs font-bold rounded-xl shadow-toyTeal shrink-0"
            >
              Unduh PDF 📥
            </button>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 inline-block mb-1">
                Arsip Minggu Lalu
              </span>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Rapor Periode Minggu ke-3: Urutan Langkah Sequence & Animasi
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                4.0 Jam Belajar • 3 Misi Tuntas • Predikat: Bintang Logika Cilik ⭐
              </p>
            </div>
            <button
              onClick={() => alert('Mengunduh Rapor Minggu ke-3 PDF...')}
              className="toy-btn-white px-5 py-2.5 text-xs font-bold rounded-xl text-slate-700 shrink-0"
            >
              Unduh PDF 📥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

