import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            🏆 Lemari Medali & Lencana
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Lencana Prestasi Kiko
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Kumpulkan seluruh medali kehormatan dari setiap misi petualangan yang berhasil kamu selesaikan!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Lencana 1 */}
          <div className="bg-amber-50/80 rounded-2xl p-6 border-2 border-amber-300 card-chunky text-center shadow-sm hover:-translate-y-1 transition duration-200 relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-200 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-md mb-3">
              🚀
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400 inline-block mb-1">
              Medali Emas
            </span>
            <h3 className="font-heading font-bold text-xl text-slate-900">Langkah Pertama</h3>
            <p className="text-xs text-slate-600 font-medium mt-1 mb-4">
              Berhasil mengeksekusi instruksi balok pertamamu di kanvas!
            </p>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300 shadow-sm">
              <span>✓</span> Sudah Terbuka
            </span>
          </div>

          {/* Lencana 2 */}
          <div className="bg-teal-50/80 rounded-2xl p-6 border-2 border-teal-300 card-chunky text-center shadow-sm hover:-translate-y-1 transition duration-200 relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-teal-200 border-4 border-teal-400 flex items-center justify-center text-4xl shadow-md mb-3">
              🔁
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 bg-teal-200 px-2.5 py-0.5 rounded-full border border-teal-400 inline-block mb-1">
              Medali Perak
            </span>
            <h3 className="font-heading font-bold text-xl text-slate-900">Mantra Perulangan</h3>
            <p className="text-xs text-slate-600 font-medium mt-1 mb-3">
              Gunakan balok loop sebanyak 10 kali untuk menghemat instruksi.
            </p>
            <div className="w-full bg-teal-100 rounded-full h-2.5 mb-2 overflow-hidden border border-teal-200">
              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '70%' }} />
            </div>
            <span className="text-[11px] font-bold text-teal-700">7 / 10 Digunakan (70%)</span>
          </div>

          {/* Lencana 3 */}
          <div className="bg-purple-50/70 rounded-2xl p-6 border-2 border-purple-300 card-chunky text-center shadow-sm hover:-translate-y-1 transition duration-200 relative opacity-85">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 border-4 border-purple-300 flex items-center justify-center text-4xl shadow-md mb-3 grayscale opacity-80">
              🎮
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-200 px-2.5 py-0.5 rounded-full border border-purple-400 inline-block mb-1">
              Medali Perunggu
            </span>
            <h3 className="font-heading font-bold text-xl text-slate-900">Arsitek Game Cilik</h3>
            <p className="text-xs text-slate-600 font-medium mt-1 mb-4">
              Rancang game interaktif pertamamu dengan skor & timer.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-300">
              <span>🔒</span> Terkunci di Pulau 5
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
