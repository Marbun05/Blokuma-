import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              🎮 Galeri Meja Kerja Siswa
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
              Koleksi Karya Saya
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Simpan, mainkan kembali, dan lanjutkan koding game buatanmu sendiri!
            </p>
          </div>
          <Link
            to="/app/projects/new"
            className="toy-btn-teal px-6 py-3 text-white font-bold text-sm rounded-xl shadow-toyTeal flex items-center gap-2 self-start sm:self-auto"
          >
            <span>+</span>
            <span>Rakit Karya Baru!</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-teal-200 card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl shadow-sm">
                  🚀
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Game Aktif
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
                Space Runner Kiko
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                Game menghindari meteorit dan rintangan luar angkasa dengan melompat.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-bold">Diperbarui kemarin</span>
              <Link
                to="/app/playground"
                className="toy-btn-teal px-4 py-2 text-xs font-bold rounded-lg shadow-toyTeal flex items-center gap-1"
              >
                <span>Edit Kode</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
