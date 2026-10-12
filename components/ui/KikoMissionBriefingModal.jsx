import React, { useEffect } from 'react';

export function KikoMissionBriefingModal({
  isOpen = false,
  onClose = () => {},
  mission = null,
  islandNumber = 1,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border-4 border-teal-400 rounded-3xl p-6 sm:p-7 max-w-lg w-full card-chunky shadow-2xl relative text-center overflow-hidden">

        {/* Banner Top Decorative */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-teal-400 via-amber-300 to-emerald-400" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup briefing tantangan"
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-lg font-bold leading-none text-slate-600 transition hover:rotate-90 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
        >
          ×
        </button>

        {/* Mascot & Icon Header */}
        <div className="my-2 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-teal-100 border-4 border-teal-300 flex items-center justify-center text-4xl shadow-md animate-bounce">
              {mission.icon || '🗺️'}
            </div>
            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">🎯</span>
          </div>
        </div>

        <span className="text-[11px] font-extrabold text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-300 inline-block mb-2 uppercase tracking-wider">
          {mission.tag || 'Tantangan Pulau'}
        </span>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mb-1">
          {mission.island_title || `Pulau ${islandNumber}`}
        </h2>

        {/* Card Deskripsi Tantangan */}
        <div className="bg-teal-50/80 border-2 border-teal-200 p-4 rounded-2xl my-4 text-left shadow-inner">
          <p className="text-xs font-bold text-teal-900 mb-1 flex items-center gap-1.5">
            <span>⚔️ Tantangan Yang Harus Dipecahkan:</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed bg-white p-3 rounded-xl border border-teal-200 shadow-sm">
            "{mission.desc}"
          </p>

          {/* Balok Dibutuhkan */}
          {mission.required_blocks && mission.required_blocks.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-teal-200">
              <span className="text-[10px] font-extrabold text-teal-900 block mb-1.5">
                🧩 Balok Kunci Pembuka Pulau:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mission.required_blocks.map((b) => (
                  <span
                    key={b}
                    className="bg-teal-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-xs uppercase tracking-wide"
                  >
                    {b === 'move' ? '➡️ MAJU' : b === 'jump' ? '🦘 LOMPAT' : b === 'sound' ? '🎵 POP' : b === 'repeat' ? '🔁 ULANGI 3X' : b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hadiah Target */}
        <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-xl mb-5 flex items-center justify-between text-xs font-bold text-amber-900">
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <span>Target Hadiah: +100 XP</span>
          </div>
          <span className="bg-amber-200 px-2 py-0.5 rounded-md border border-amber-300 text-[10px]">
            Buka Gerbang Pulau Next 🚪
          </span>
        </div>

        {/* Tombol Mulai */}
        <button
          type="button"
          onClick={onClose}
          className="toy-btn-teal w-full py-3.5 font-bold text-sm sm:text-base rounded-xl shadow-toyTeal flex items-center justify-center gap-2 text-white"
        >
          <span>Ayo Pecahkan Tantangan!</span>
          <span>🚀</span>
        </button>

      </div>
    </div>
  );
}
