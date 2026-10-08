import React from 'react';
import { Link } from 'react-router-dom';

export default function ParentChildDetailPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500">Ruang Pendampingan Ananda</span>
          <Link
            to="/parent/children"
            className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Daftar Anak
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full border border-teal-300 inline-block mb-3">
            Rapor Individual Siswa
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Laporan Detail: Kiko Pratama (Kelas 4 SD)
          </h1>
          <p className="text-xs sm:text-sm text-teal-700 font-bold mb-4">
            📚 Modul Aktif: Perulangan (Loops) & Percabangan Logika
          </p>
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Kiko telah menyelesaikan 100% misi Sequence dengan daya analisa yang sangat baik. Pemahaman terhadap pemecahan masalah (dekomposisi) berkembang secara konsisten!
          </div>
        </div>
      </div>
    </div>
  );
}

