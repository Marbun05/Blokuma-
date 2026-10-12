import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/use-auth-store.js';
import { unlockNextIslandInDatabase } from '../../lib/supabase/curriculum.js';
import { getKikoInstantPraise } from '../../lib/supabase/kikoPraiseGenerator.js';

export function KikoMissionSuccessModal({
  isOpen = false,
  onClose = () => {},
  islandNumber = 1,
  islandTitle = 'Pulau 1: Desa Urutan',
  xpEarned = 100,
  onTryAgain = () => {},
}) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [praise, setPraise] = useState('');
  const [loadingPraise, setLoadingPraise] = useState(false);

  const hasBonus = xpEarned > 100;
  const studentName = user?.nickname || user?.fullName || 'Arsitek Kode';
  const studentGrade = user?.grade || user?.student_class || 4;

  useEffect(() => {
    if (!isOpen) return undefined;

    // Buka kunci pulau berikutnya & tambahkan XP di Supabase PostgreSQL secara otomatis
    unlockNextIslandInDatabase(user?.id, islandNumber, xpEarned);

    // Ambil Validasi Emosional Instan (< 100 ms) dari Kiko
    const loadPraise = async () => {
      setLoadingPraise(true);
      const res = await getKikoInstantPraise({
        studentName,
        islandTitle,
        xpEarned,
        hasBonus,
        gradeLevel: user?.grade ? `Kelas ${user.grade} SD` : 'Kelas 3-4 SD',
      });
      setPraise(res.praiseMessage);
      setLoadingPraise(false);
    };

    loadPraise();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, user?.id, user?.nickname, user?.fullName, user?.grade, islandNumber, xpEarned, islandTitle, hasBonus, onClose, studentName]);

  if (!isOpen) return null;

  // PERBAIKAN BUG: Lanjut ke pulau berikutnya langsung di Playground tanpa terlempar ke Petualangan
  const handleNextMission = async () => {
    await unlockNextIslandInDatabase(user?.id, islandNumber, xpEarned);
    onClose();

    if (islandNumber < 6) {
      // Pindah langsung ke Pulau Berikutnya di Playground!
      navigate(`/app/playground?island=${islandNumber + 1}&class=${studentGrade}`);
    } else {
      // Jika Pulau 6 (terakhir) tuntas, kembali ke Peta Petualangan
      navigate('/app/adventure');
    }
  };

  const handleGoToMap = async () => {
    await unlockNextIslandInDatabase(user?.id, islandNumber, xpEarned);
    onClose();
    navigate('/app/adventure');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border-4 border-emerald-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full card-chunky shadow-2xl relative text-center overflow-hidden">

        {/* Confetti Aksen Banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal keberhasilan misi"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xl font-bold leading-none text-slate-600 shadow-sm transition hover:rotate-90 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 cursor-pointer"
        >
          ×
        </button>

        <div className="my-2 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 border-4 border-amber-300 flex items-center justify-center p-2 shadow-lg animate-bounce">
              <img
                src="/images/Robot.webp"
                alt="Maskot Kiko"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/robot.webp';
                }}
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <span className="absolute -top-2 -right-2 text-2xl animate-spin">🌟</span>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-2">
          🎉 MISI TUNTAS ⭐⭐⭐
        </span>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mb-1">
          Hore! {islandTitle} Selesai!
        </h2>

        {/* Kotak Validasi Emosional Instan (openai/gpt-oss-20b) */}
        <div className="my-4 bg-teal-50 border-2 border-teal-300 p-4 rounded-2xl shadow-sm text-left relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-900 bg-teal-200/90 px-2 py-0.5 rounded-md border border-teal-300">
              💬 Pesan Bangga Kiko
            </span>
            <span className="text-[9px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
              openai/gpt-oss-20b
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
            {loadingPraise ? (
              <span className="inline-flex items-center gap-1.5 text-teal-800 animate-pulse">
                <span>🤖</span>
                <span>Kiko sedang menyiapkan kalimat pujian spesial...</span>
              </span>
            ) : (
              praise || `Luar biasa, ${studentName}! Kiko sangat bangga dengan kecerdasan kodingmu! 🚀✨`
            )}
          </p>
        </div>

        {/* Kotak Hadiah Scaled XP */}
        <div className="bg-amber-50 border-2 border-amber-300 p-3.5 rounded-2xl mb-6 flex items-center justify-center gap-3 shadow-inner">
          <span className="text-3xl">💎</span>
          <div className="text-left">
            <span className="font-heading font-bold text-amber-900 text-lg block leading-tight">
              +{xpEarned} XP Terkumpul!
            </span>
            <span className="text-[11px] font-bold text-amber-700 block mt-0.5">
              {hasBonus
                ? '✨ +25 XP Bonus Efisiensi Algoritma (Kode Paling Ringkas!)'
                : islandNumber < 6
                ? `Gerbang Pulau ${islandNumber + 1} Berhasil Terbuka!`
                : '🏆 Selamat! Seluruh Pulau Petualangan Berhasil Dituntaskan!'}
            </span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleGoToMap}
            className="toy-btn-white w-full py-3 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
          >
            🗺️ Peta Petualangan
          </button>

          <button
            onClick={handleNextMission}
            className="toy-btn-teal w-full py-3.5 font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal flex items-center justify-center gap-2 text-white cursor-pointer"
          >
            <span>{islandNumber < 6 ? `Lanjut Pulau ${islandNumber + 1}` : 'Lihat Peta Akhir'}</span>
            <span>🚀</span>
          </button>
        </div>

      </div>
    </div>
  );
}
