import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar.jsx';

export default function LessonDetailPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 card-chunky shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full border border-amber-300">
              ⭐ Misi Sequence #1 • Level Pemula
            </span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              Hadiah: +50 XP 💎
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Desa Urutan: Langkah Pertama Kiko Menuju Gerbang
          </h1>

          <div className="bg-amber-50/80 border-2 border-amber-300 p-5 rounded-xl mb-6 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <img
              src="/images/Robot.webp"
              alt="Mascot Robot Kiko"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/robot.webp";
              }}
              className="w-20 h-20 object-contain drop-shadow-md animate-bounce shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-amber-900 text-sm mb-2 flex items-center gap-2">
                <span>📖</span>
                <span>Cerita Petualangan:</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium mb-3">
                Robot Kiko baru saja mendarat di Desa Urutan dan bingung mencari jalan keluar. Susun 2 balok <strong className="text-teal-700">"MAJU 1 LANGKAH"</strong> di kanvas untuk menuntun Kiko sampai ke gerbang desa!
              </p>
              <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <span>🎯</span>
                <span>Target Kemenangan: Hubungkan 2 balok MAJU lalu klik tombol Jalankan Kreasimu!</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/app/playground"
              className="toy-btn-teal px-8 py-3.5 font-bold text-sm sm:text-base rounded-xl shadow-toyTeal flex items-center gap-2"
            >
              <span>🚀</span>
              <span>Buka Panggung Misi Sekarang!</span>
            </Link>
            <Link
              to="/app/learn"
              className="toy-btn-white px-5 py-3.5 font-bold text-sm rounded-xl text-slate-700"
            >
              Kembali ke Materi
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
