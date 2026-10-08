import React from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            📊 Rapor Koding Cerdas
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Perkembangan Berpikir Komputasional Kiko
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Pantau 4 pilar kekuatan berpikir logis yang semakin terasah di setiap petualangan!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 card-chunky shadow-sm space-y-6">
          {/* Pilar 1 */}
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200">
            <div className="flex justify-between text-xs sm:text-sm font-bold mb-2 text-slate-800">
              <span className="flex items-center gap-1.5">
                <span>🧩</span> Dekomposisi (Membagi Masalah Rumit Jadi Bagian Kecil)
              </span>
              <span className="text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">75%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="flex justify-between text-xs sm:text-sm font-bold mb-2 text-slate-800">
              <span className="flex items-center gap-1.5">
                <span>🔍</span> Pengenalan Pola (Menemukan Perulangan & Kesamaan)
              </span>
              <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">68%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: '68%' }} />
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200">
            <div className="flex justify-between text-xs sm:text-sm font-bold mb-2 text-slate-800">
              <span className="flex items-center gap-1.5">
                <span>🎯</span> Abstraksi (Fokus Pada Hal Penting & Abaikan Gangguan)
              </span>
              <span className="text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">82%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: '82%' }} />
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200">
            <div className="flex justify-between text-xs sm:text-sm font-bold mb-2 text-slate-800">
              <span className="flex items-center gap-1.5">
                <span>⚡</span> Berpikir Algoritma (Menyusun Urutan Langkah Solusi)
              </span>
              <span className="text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">90%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
