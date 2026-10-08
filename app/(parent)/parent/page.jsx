import React from 'react';
import { Link } from 'react-router-dom';

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-xl shadow-toyAmber border-b-2 border-amber-600">
            👨‍👩‍👧
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-slate-900 block leading-tight">
              Ruang Orang Tua Blokuma
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Pendampingan Belajar Anak SD
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
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full border border-teal-300">
              Anak Terhubung: Aktif Belajar
            </span>
            <span className="text-xs font-bold text-slate-500">
              Akun Siswa: Kiko Pratama
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Laporan Perkembangan: Kiko Pratama (Kelas 4 SD)
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-teal-50/70 p-5 rounded-2xl border-2 border-teal-200">
              <span className="text-xs text-teal-900 font-bold uppercase tracking-wider">
                Total Waktu Belajar
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 mt-1">
                4.5 Jam / Minggu
              </p>
              <span className="text-[11px] text-teal-600 font-medium">Batas layar harian terjaga sehat</span>
            </div>
            <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200">
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                Total Karya Dihasilkan
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-amber-700 mt-1">
                4 Project Game & Musik
              </p>
              <span className="text-[11px] text-amber-600 font-medium">Kreativitas mandiri meningkat</span>
            </div>
            <div className="bg-emerald-50/70 p-5 rounded-2xl border-2 border-emerald-200">
              <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
                Streak Belajar
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">
                7 Hari Berturut-turut
              </p>
              <span className="text-[11px] text-emerald-600 font-medium">Konsistensi sangat baik! 🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/80 rounded-2xl p-6 border-2 border-amber-300 card-chunky shadow-sm">
          <h3 className="font-heading text-lg font-bold text-amber-950 mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>Tips Pendampingan Ramah Anak Hari Ini</span>
          </h3>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
            Kiko menunjukkan ketertarikan tinggi pada logika perulangan (loops) dan pembuatan animasi. Ayah & Bunda bisa mengajak Kiko bercerita tentang game apa yang sedang dia rancang hari ini, lalu berikan apresiasi atas usahanya mencoba memecahkan masalah sendiri!
          </p>
        </div>

        {/* Parent Portal Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/parent/children"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              🧒
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Profil Belajar Anak</h4>
              <p className="text-xs text-slate-500">Kelola akun & tingkat kelas Kiko</p>
            </div>
          </Link>
          <Link
            to="/parent/reports"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              📊
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Laporan Kompetensi</h4>
              <p className="text-xs text-slate-500">Analisis 4 pilar nalar komputasi</p>
            </div>
          </Link>
          <Link
            to="/parent/settings"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              ⚙️
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Batas Layar & Notifikasi</h4>
              <p className="text-xs text-slate-500">Atur screen-time sehat & email</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
