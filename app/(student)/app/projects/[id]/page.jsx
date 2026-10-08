import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar.jsx';

export default function ProjectDetailPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full border border-amber-300">
              🎮 Karya Game Interaktif
            </span>
            <span className="text-xs font-bold text-slate-500">
              Dibuat oleh: <strong className="text-teal-700">Kiko</strong> (Kelas 4 SD)
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Space Runner Kiko 🚀
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
            Game arcade pelari luar angkasa dengan tantangan menghindari asteroid dan mengumpulkan bintang energi!
          </p>

          <div className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl h-64 border-2 border-indigo-400/40 flex flex-col items-center justify-center text-white mb-6 relative overflow-hidden shadow-inner">
            <div className="text-6xl mb-2 animate-bounce">🚀</div>
            <p className="font-heading font-bold text-teal-300 text-base">
              Pratinjau Arena Game Luar Angkasa
            </p>
            <span className="text-xs text-indigo-200 mt-1">
              Tekan tombol hijau di bawah untuk mulai mengedit logika blok!
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/app/playground"
              className="toy-btn-teal px-6 py-3 font-bold text-sm rounded-xl shadow-toyTeal flex items-center gap-2"
            >
              <span>🎮</span>
              <span>Buka & Edit Kode di Kanvas!</span>
            </Link>
            <Link
              to="/app/projects"
              className="toy-btn-white px-5 py-3 font-bold text-sm rounded-xl text-slate-700"
            >
              Kembali ke Proyek
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
