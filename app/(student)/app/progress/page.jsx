import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-4xl w-full mx-auto flex flex-col justify-center items-center text-center">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-slate-200 card-chunky shadow-sm max-w-lg w-full space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-sm">
            📊
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full uppercase tracking-wider border border-amber-300 inline-block">
              Khusus Portal Orang Tua & Guru
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Laporan Progress Belajar
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Analisis laporan perkembangan 4 pilar nalar komputasi dan statistik belajar kini khusus dikelola melalui akun <strong className="text-teal-700">Orang Tua</strong> dan <strong className="text-purple-700">Guru</strong>.
            </p>
          </div>

          <div className="p-4 bg-teal-50/80 rounded-2xl border-2 border-teal-200 text-left space-y-2 text-xs text-teal-950 font-medium">
            <p className="font-bold flex items-center gap-1.5 text-teal-900">
              <span>💡</span> Mengapa Hanya Untuk Orang Tua & Guru?
            </p>
            <p>
              Anak-anak dapat lebih berfokus menikmati petualangan koding, membuat karya seru di Playground, dan mengumpulkan trofi tanpa rasa tertekan oleh statistik angka!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/app/dashboard"
              className="toy-btn-teal px-6 py-3 font-bold text-sm text-white rounded-xl shadow-toyTeal flex items-center justify-center gap-2"
            >
              <span>🚀</span>
              <span>Kembali ke Beranda Siswa</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
