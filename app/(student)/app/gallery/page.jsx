import React from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            🌟 Panggung Pameran Sahabat
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Galeri Karya Sahabat Blokuma
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Yuk, mainkan dan beri apresiasi untuk game dan animasi keren hasil karya teman-teman seluruh Indonesia!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Karya 1 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-emerald-300 card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="h-40 bg-gradient-to-b from-emerald-100 to-teal-50 rounded-xl border border-emerald-200 flex flex-col items-center justify-center text-5xl mb-4 relative overflow-hidden">
                <span className="animate-bounce">🎵</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-300 mt-2">
                  Musik Interaktif
                </span>
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                Hutan Ajaib Melodi
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-3">
                Oleh: <strong className="text-teal-700">Rania Arsitek</strong> • Kelas 2 SD
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                <span>❤️</span> 24 Suka
              </span>
              <button className="toy-btn-teal px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-toyTeal">
                Mainkan 🎮
              </button>
            </div>
          </div>

          {/* Karya 2 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-teal-300 card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="h-40 bg-gradient-to-b from-sky-100 to-teal-50 rounded-xl border border-sky-200 flex flex-col items-center justify-center text-5xl mb-4 relative overflow-hidden">
                <span className="animate-pulse">🤖</span>
                <span className="text-[10px] font-bold text-teal-800 bg-white/90 px-2 py-0.5 rounded-full border border-teal-300 mt-2">
                  Petualangan Labirin
                </span>
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                Kiko Mencari Baterai Emas
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-3">
                Oleh: <strong className="text-teal-700">Bima Pratama</strong> • Kelas 4 SD
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                <span>❤️</span> 42 Suka
              </span>
              <button className="toy-btn-teal px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-toyTeal">
                Mainkan 🎮
              </button>
            </div>
          </div>

          {/* Karya 3 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-purple-300 card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div>
              <div className="h-40 bg-gradient-to-b from-purple-100 to-indigo-50 rounded-xl border border-purple-200 flex flex-col items-center justify-center text-5xl mb-4 relative overflow-hidden">
                <span>🚀</span>
                <span className="text-[10px] font-bold text-purple-800 bg-white/90 px-2 py-0.5 rounded-full border border-purple-300 mt-2">
                  Game Arcade
                </span>
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                Balap Roket Galaksi
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-3">
                Oleh: <strong className="text-purple-700">Alya Bintang</strong> • Kelas 5 SD
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                <span>❤️</span> 38 Suka
              </span>
              <button className="toy-btn-teal px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-toyTeal">
                Mainkan 🎮
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
