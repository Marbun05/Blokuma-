import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const [studentNickname, setStudentNickname] = useState(user?.nickname || 'Kiko');
  const [progress, setProgress] = useState(null);

  // Memuat data dari Supabase
  const loadProfileData = async () => {
    if (user?.id) {
      const { data } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', user.id)
        .single();
      if (data) {
        setProgress(data);
      }
    }

    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('student_nickname');
      if (savedName) {
        setStudentNickname(savedName);
      }
    }
  };

  useEffect(() => {
    // 1. Muat data saat pertama kali komponen dibuka
    loadProfileData();

    // 2. Listener Custom Event agar nama di banner update secara otomatis jika diubah dari halaman Pengaturan
    const handleProfileUpdate = () => {
      loadProfileData();
    };

    window.addEventListener('student_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
    };
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        {/* Banner Selamat Datang Hangat & Semangat */}
        <div className="bg-teal-600 rounded-2xl p-6 sm:p-7 text-white mb-8 shadow-toyTeal border-2 border-teal-700 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <span className="bg-teal-700/80 text-amber-200 border border-teal-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <span>🎖️</span> Arsitek Kode Level {progress?.level || 1}
              </span>
              
              <h1 className="font-heading text-2xl sm:text-4xl font-bold mt-2">
                Halo, {user?.nickname || studentNickname}! 👋
              </h1>
              <p className="text-teal-100 text-xs sm:text-sm font-medium mt-1">
                Hari ini mau bikin game atau pecahkan teka-teki balok apa?
              </p>
            </div>

            <div className="bg-teal-700/70 border border-teal-500/80 px-4 py-2.5 rounded-2xl text-right sm:text-center self-start sm:self-auto shadow-sm">
              <span className="text-xl sm:text-2xl font-bold block">🔥 {progress?.streak_days || 0} Hari</span>
              <p className="text-[11px] text-amber-300 font-bold">Streak Semangat!</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold pt-4 border-t border-teal-500/60">
            <span className="bg-teal-700/50 px-3 py-1.5 rounded-xl border border-teal-500">
              💎 XP Terkumpul: <strong className="text-amber-300">{progress?.xp || 0} XP</strong>
            </span>
            <span className="bg-teal-700/50 px-3 py-1.5 rounded-xl border border-teal-500">
              🏆 Misi Tuntas: <strong className="text-emerald-300">{progress?.level ? progress.level * 2 : 0} Misi</strong>
            </span>
            <span className="bg-teal-700/50 px-3 py-1.5 rounded-xl border border-teal-500">
              🤖 Pendamping: <strong className="text-white">Robot Kiko</strong>
            </span>
          </div>
        </div>

        {/* Kotak Misi Petualangan Aktif */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 card-chunky shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>🎯</span>
              <span>Lanjutkan Petualangan Aktif</span>
            </h2>
            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
              3 dari 8 Misi Selesai (38%)
            </span>
          </div>

          <div className="bg-teal-50/70 p-4 sm:p-5 rounded-xl border-2 border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-teal-300 flex items-center justify-center p-1.5 shadow-sm shrink-0">
                <img
                  src="/images/Robot.webp"
                  alt="Robot Kiko Mascot"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/robot.webp";
                  }}
                  className="w-full h-full object-contain animate-bounce"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                  Dunia 2: Hutan Perulangan
                </span>
                <h3 className="font-heading font-bold text-slate-900 text-base mt-1">
                  Misi Loop: Bantu Kiko Menyeberangi Hutan
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Gunakan balok perulangan (loop) agar Kiko melompat 3 kali tanpa menyusun balok berulang!
                </p>
              </div>
            </div>
            <Link
              to="/app/learn/l2"
              className="toy-btn-teal px-6 py-3 font-bold text-sm rounded-xl shadow-toyTeal shrink-0 flex items-center justify-center gap-2"
            >
              <span>Ayo Lanjutkan!</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

        {/* 3 Kartu Menu Cepat dengan Ritme Visual & Aksen Playful */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          
          <Link
            to="/app/playground"
            className="bg-amber-50/80 border-2 border-amber-300 p-5 rounded-2xl text-slate-900 hover:-translate-y-1 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:scale-110 transition transform">🧩</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                  Kreasi Bebas
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">
                Rakit Project Baru
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Buka kanvas coding visual dan buat mini game, tarian karakter, atau musik sesukamu.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 mt-4 block group-hover:translate-x-1 transition">
              Buka Playground ➔
            </span>
          </Link>

          <Link
            to="/app/adventure"
            className="bg-teal-50/80 border-2 border-teal-300 p-5 rounded-2xl text-slate-900 hover:-translate-y-1 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:scale-110 transition transform">🗺️</span>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-200/80 px-2 py-0.5 rounded-full border border-teal-300">
                  6 Pulau Misi
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">
                Peta Petualangan
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Jelajahi pulau kode berurutan dari Desa Urutan sampai Laboratorium Algoritma.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-800 mt-4 block group-hover:translate-x-1 transition">
              Jelajahi Peta ➔
            </span>
          </Link>

          <Link
            to="/app/gallery"
            className="bg-purple-50/80 border-2 border-purple-300 p-5 rounded-2xl text-slate-900 hover:-translate-y-1 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:scale-110 transition transform">🖼️</span>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-200/80 px-2 py-0.5 rounded-full border border-purple-300">
                  Karya Teman
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">
                Galeri Karya Sahabat
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Lihat dan mainkan game keren hasil rancangan teman-teman sesama Arsitek Kode!
              </p>
            </div>
            <span className="text-xs font-bold text-purple-800 mt-4 block group-hover:translate-x-1 transition">
              Kunjungi Galeri ➔
            </span>
          </Link>

        </div>
      </main>
    </div>
  );
}