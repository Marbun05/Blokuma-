import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

export function KikoSmartHint({
  isOpen: controlledIsOpen,
  onOpenChange = () => {},
  attemptCount = 0,
  mission = null,
  maxHints = 3,
  hintUsageCount = 0,
  onIncrementHint = () => {},
}) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [hintData, setHintData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');

  const isOpen = controlledIsOpen ?? localIsOpen;

  const updateIsOpen = (nextIsOpen) => {
    if (controlledIsOpen === undefined) setLocalIsOpen(nextIsOpen);
    onOpenChange(nextIsOpen);
  };

  const isLimitReached = hintUsageCount >= maxHints;
  const remainingHints = Math.max(0, maxHints - hintUsageCount);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') updateIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleFetchHint = () => {
    setHintData({
      hint: mission?.smart_hint || 'Hai sobat Kiko, perhatikan lagi urutan balokmu. Mana balok yang perlu dieksekusi lebih dulu? 🌟',
      socraticQuestions: [
        'Apakah urutan balokmu sudah pas dengan tantangan pulau ini?',
        'Jika memakai Ulangi 3 Kali, balok mana yang tepat diletakkan sebelumnya?',
      ],
    });
  };

  const handleOpenClick = () => {
    if (isLimitReached) {
      alert('🔒 Batas bantuan untuk tantangan pulau ini sudah habis (3/3). Kamu pasti bisa memecahkannya sendiri! 💪');
      return;
    }

    if (!isOpen) {
      onIncrementHint();
      handleFetchHint();
      updateIsOpen(true);
    } else {
      updateIsOpen(false);
    }
  };

  const handleSpeakHint = () => {
    if (!hintData?.hint) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(hintData.hint);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceToBlock = async () => {
    if (isListening) {
      setIsListening(false);
      setVoiceInput("Mengecek pesan suara dengan Kiko AI...");
      setTimeout(() => {
        setVoiceInput("Oh, Kiko paham! Coba gunakan balok Maju & Melompat ya!");
      }, 1200);
      return;
    }
    setIsListening(true);
    setVoiceInput("Kiko mendengarkan... (Bicara sekarang)");
  };

  return (
    <div className="relative inline-block">
      {/* Tombol Utama Bantuan Ringkas, Rapi & Gamey */}
      <button
        onClick={handleOpenClick}
        className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 border-2 shadow-sm ${
          isLimitReached
            ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 animate-pulse'
        }`}
        title={isLimitReached ? 'Batas bantuan habis (3/3)' : 'Minta Bantuan Kiko Smart Hint'}
      >
        <span className="text-base">{isLimitReached ? '🔒' : '💡'}</span>
        <span>{isLimitReached ? 'Bantuan Habis' : 'Smart Hint'}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold border ${
          isLimitReached
            ? 'bg-slate-200 text-slate-500 border-slate-300'
            : 'bg-amber-200 text-amber-900 border-amber-400'
        }`}>
          {remainingHints}/{maxHints}
        </span>
      </button>

      {/* Pop-up Card Compact & Rapi */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-amber-300 rounded-3xl p-4 sm:p-5 max-w-md w-full card-chunky shadow-2xl relative">

            {/* Header Pop-up Compact */}
            <div className="flex items-center justify-between pb-2.5 border-b-2 border-amber-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-lg shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                    <span>Kiko Smart Hint</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold border border-amber-300">
                      Sisa: {remainingHints}/{maxHints}
                    </span>
                  </h3>
                </div>
              </div>

              <button
                type="button"
                aria-label="Tutup Kiko Smart Hint"
                onClick={() => updateIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 font-bold flex items-center justify-center transition border border-slate-200 text-xs"
              >
                ✕
              </button>
            </div>

            {/* Content Area Compact */}
            <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-3.5 mb-3 shadow-inner">
              <div className="flex items-start gap-2.5">
                <img
                  src="/images/Robot.webp"
                  alt="Maskot Kiko"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/robot.webp";
                  }}
                  className="w-12 h-12 object-contain drop-shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-800 font-bold leading-relaxed bg-white p-2.5 rounded-xl border border-amber-200 shadow-sm mb-2">
                    "{hintData?.hint}"
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSpeakHint}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                        isSpeaking
                          ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                          : 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400'
                      }`}
                    >
                      <Volume2 size={12} />
                      <span>{isSpeaking ? 'Bicara...' : 'Suara Kiko'}</span>
                    </button>

                    <button
                      onClick={handleVoiceToBlock}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                        isListening
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm'
                      }`}
                    >
                      {isListening ? <MicOff size={12} /> : <Mic size={12} />}
                      <span>{isListening ? 'Stop' : 'Bicara'}</span>
                    </button>
                  </div>

                  {voiceInput && (
                    <p className="mt-2 p-1.5 bg-sky-50 border border-sky-200 rounded-lg text-[10px] text-sky-800 italic">
                      🎤 {voiceInput}
                    </p>
                  )}
                </div>
              </div>

              {/* Socratic Questions */}
              {hintData?.socraticQuestions?.length > 0 && (
                <div className="mt-3 pt-2 border-t border-amber-200/80">
                  <p className="text-[10px] font-extrabold text-amber-950 mb-1">
                    ❓ Pertanyaan Pemicu Nalar:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {hintData.socraticQuestions.map((q, idx) => (
                      <li key={idx} className="text-[10px] text-slate-700 font-semibold">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Pop-up */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-800">
                📌 Maksimal 3x Bantuan/Pulau
              </span>

              <button
                type="button"
                onClick={() => updateIsOpen(false)}
                className="toy-btn-teal px-4 py-1.5 font-bold text-xs rounded-xl shadow-toyTeal"
              >
                Aku Paham! 🚀
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
