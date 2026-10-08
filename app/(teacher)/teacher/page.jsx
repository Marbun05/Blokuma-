import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white font-bold flex items-center justify-center text-xl shadow-toyPurple border-b-2 border-purple-700">
            👩‍🏫
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-slate-900 block leading-tight">
              Ruang Guru Blokuma
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Pusat Kurikulum & Manajemen Kelas SD
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="toy-btn-white px-4 py-2 text-xs font-bold rounded-xl text-slate-700 shadow-sm"
        >
          Kembali ke Beranda
        </Link>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 font-bold text-xs rounded-full border border-purple-300 mb-2">
            Pendidik Aktif
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Selamat Datang, Bu Maya! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
            Kelola kelas coding anak, bagikan misi tantangan, dan pantau perkembangan daya nalar siswa dengan mudah.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-teal-50/70 p-5 rounded-2xl border-2 border-teal-200">
              <span className="text-xs text-teal-900 font-bold uppercase tracking-wider">
                Total Siswa Aktif
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 mt-1">
                44 Siswa
              </p>
              <span className="text-[11px] text-teal-600 font-medium">Dari 2 rombel kelas 4</span>
            </div>
            <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200">
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                Rata-Rata Capaian Misi
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-amber-700 mt-1">
                81%
              </p>
              <span className="text-[11px] text-amber-600 font-medium">Pemahaman konsep loop tinggi</span>
            </div>
            <div className="bg-purple-50/70 p-5 rounded-2xl border-2 border-purple-200">
              <span className="text-xs text-purple-900 font-bold uppercase tracking-wider">
                Karya Selesai Dibuat
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-purple-700 mt-1">
                30 Project
              </p>
              <span className="text-[11px] text-purple-600 font-medium">Siap dipamerkan di galeri</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🏫</span>
              <span>Daftar Kelas Bimbingan</span>
            </h3>
            <Link
              to="/teacher/classes"
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              + Tambah Kelas Baru
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-teal-50/70 p-4 rounded-xl border-2 border-teal-200 flex justify-between items-center">
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">
                  Coding SD Nusa Bangsa 4A
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  24 Siswa • Kode Gabung: <strong className="text-teal-700 font-bold">BLOKUMA4A</strong>
                </p>
              </div>
              <Link
                to="/teacher/classes"
                className="toy-btn-teal px-4 py-2 text-xs font-bold rounded-lg shadow-toyTeal"
              >
                Detail Kelas ➔
              </Link>
            </div>
            <div className="bg-amber-50/70 p-4 rounded-xl border-2 border-amber-200 flex justify-between items-center">
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">
                  Coding SD Nusa Bangsa 4B
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  20 Siswa • Kode Gabung: <strong className="text-amber-700 font-bold">BLOKUMA4B</strong>
                </p>
              </div>
              <Link
                to="/teacher/classes"
                className="toy-btn-amber px-4 py-2 text-xs font-bold rounded-lg shadow-toyAmber"
              >
                Detail Kelas ➔
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/teacher/students"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-teal-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🎒</span>
            <span className="font-heading font-bold text-sm text-slate-900">Daftar Siswa</span>
            <span className="text-[11px] text-slate-500">Pantau 44 akun anak</span>
          </Link>
          <Link
            to="/teacher/assignments"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🎯</span>
            <span className="font-heading font-bold text-sm text-slate-900">Tantangan Kelas</span>
            <span className="text-[11px] text-slate-500">3 tantangan aktif</span>
          </Link>
          <Link
            to="/teacher/curriculum"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
            <span className="font-heading font-bold text-sm text-slate-900">Peta Kurikulum</span>
            <span className="text-[11px] text-slate-500">Capaian Fase A, B, C</span>
          </Link>
          <Link
            to="/teacher/reports"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-sky-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
            <span className="font-heading font-bold text-sm text-slate-900">Raport & Asesmen</span>
            <span className="text-[11px] text-slate-500">Unduh PDF / CSV</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
