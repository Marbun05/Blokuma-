import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function LearnPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            📚 Kurikulum Petualangan
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Pilih Materi & Misi Belajar
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Kuasai satu per satu ilmu koding ajaib untuk membuka kunci petualangan berikutnya!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misi 1 */}
          <div className="bg-amber-50/70 rounded-2xl p-6 sm:p-7 border-2 border-amber-300 shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-2xl bg-amber-200 text-2xl flex items-center justify-center border border-amber-300 shadow-sm">
                  ➔
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full border border-amber-300">
                  Langkah Awal • Lv 1
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Sequence: Urutan Langkah Kiko
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
                Komputer bekerja seperti koki mengikuti resep! Susun perintah satu per satu dari atas ke bawah agar Robot Kiko tidak tersesat di desa.
              </p>
            </div>
            <Link
              to="/app/learn/l1"
              className="toy-btn-teal py-3 px-5 font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal flex items-center justify-center gap-2"
            >
              <span>Yuk, Mulai Misi!</span>
              <span>➔</span>
            </Link>
          </div>

          {/* Misi 2 */}
          <div className="bg-teal-50 rounded-2xl p-6 sm:p-7 border-2 border-teal-400 shadow-toyTeal hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-2xl bg-teal-200 text-2xl flex items-center justify-center border border-teal-300 shadow-sm">
                  🔁
                </span>
                <span className="text-[11px] font-bold text-teal-900 bg-teal-200 px-3 py-1 rounded-full border border-teal-300">
                  Mantra Cerdas • Lv 2
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                Loops: Kekuatan Perulangan
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
                Capek mengetik 'Maju' 10 kali berturut-turut? Gunakan balok Loop untuk melipatgandakan perintah dalam satu kedipan mata!
              </p>
            </div>
            <Link
              to="/app/learn/l2"
              className="toy-btn-amber py-3 px-5 font-bold text-xs sm:text-sm rounded-xl shadow-toyAmber flex items-center justify-center gap-2 text-slate-900"
            >
              <span>Buka Mantra Loop!</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
