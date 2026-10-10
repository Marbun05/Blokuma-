import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/use-auth-store.js';
import { unlockNextIslandInDatabase } from '../../lib/supabase/curriculum.js';

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

  if (!isOpen) return null;

  const handleNextMission = async () => {
    // Membuka kunci pulau berikutnya di Supabase
    await unlockNextIslandInDatabase(user?.id, islandNumber);
    onClose();
    // Redirect ke peta petualangan dengan pulau terupdate
    navigate('/app/adventure');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border-4 border-emerald-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full card-chunky shadow-2xl relative text-center overflow-hidden">

        {/* Confetti Aksen Banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400" />

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

        <p className="text-xs sm:text-sm text-slate-600 font-medium mb-5 max-w-md mx-auto">
          Hebat sekali! Kiko berhasil melintasi seluruh rintangan dengan susunan balok logikamu yang sangat presisi!
        </p>

        {/* Kotak Hadiah XP */}
        <div className="bg-amber-50 border-2 border-amber-300 p-3.5 rounded-2xl mb-6 flex items-center justify-center gap-3 shadow-inner">
          <span className="text-3xl">💎</span>
          <div className="text-left">
            <span className="font-heading font-bold text-amber-900 text-lg block leading-tight">
              +{xpEarned} XP Terkumpul!
            </span>
            <span className="text-[11px] font-bold text-amber-700">
              Gerbang Pulau {islandNumber + 1} Berhasil Terbuka!
            </span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onTryAgain}
            className="toy-btn-white w-full py-3 font-bold text-xs sm:text-sm rounded-xl"
          >
            🔄 Coba Lagi
          </button>

          <button
            onClick={handleNextMission}
            className="toy-btn-teal w-full py-3.5 font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal flex items-center justify-center gap-2 text-white"
          >
            <span>Lanjut Misi Berikutnya</span>
            <span>🚀</span>
          </button>
        </div>

      </div>
    </div>
  );
}
