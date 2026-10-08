import React, { useState, useEffect } from 'react';
import { getKikoSmartHint } from '../../lib/supabase/kikoSmartHint.js';

export function KikoSmartHint({
  canvasBlocks = [],
  targetLevel = { targetDistance: 4, riverWidth: 2, hasRiver: true },
  executionResult = {},
  attemptCount = 0,
  autoOpenOnFail = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState('SD 3-4');
  const [hintData, setHintData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-fetch & pop up hint jika anak sudah mencoba 2 kali lebih
  useEffect(() => {
    if (autoOpenOnFail && attemptCount >= 2) {
      handleFetchHint();
      setIsOpen(true);
    }
  }, [attemptCount]);

  const handleFetchHint = async () => {
    setLoading(true);
    try {
      const res = await getKikoSmartHint({
        canvasBlocks,
        targetLevel,
        executionResult,
        gradeLevel,
        attemptCount,
      });
      setHintData(res);
    } catch (e) {
      console.error('Error getting hint:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakHint = () => {
    if (!hintData?.hint) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(hintData.hint);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.1; // Suara robot ceria lebih tinggi sedikit

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Icon Emosi Kiko
  const getEmotionBadge = (emotion) => {
    switch (emotion) {
      case 'curious':
        return { emoji: '🧐', label: 'Menganalisis...', bg: 'bg-amber-100 text-amber-800' };
      case 'surprised':
        return { emoji: '😮', label: 'Menemukan Hal Unik!', bg: 'bg-sky-100 text-sky-800' };
      case 'thinking':
        return { emoji: '🤔', label: 'Mari Berpikir!', bg: 'bg-indigo-100 text-indigo-800' };
      case 'encouraging':
        return { emoji: '🌟', label: 'Semangat!', bg: 'bg-emerald-100 text-emerald-800' };
      default:
        return { emoji: '😃', label: 'Sahabat Kiko', bg: 'bg-teal-100 text-teal-800' };
    }
  };

  const emotionBadge = getEmotionBadge(hintData?.emotion);

  return (
    <div className="relative inline-block">
      {/* Tombol Utama Bantuan Smart Hint */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!hintData) handleFetchHint();
        }}
        className="toy-btn-amber px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-2 shadow-toyAmber transition active:scale-95 border-2 border-amber-400 animate-bounce"
        title="Bantuan Tanpa Memberi Bocoran (Socratic AI)"
      >
        <span className="text-base">💡</span>
        <span>Minta Bantuan Kiko Smart Hint</span>
        {attemptCount > 0 && (
          <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
            {attemptCount}
          </span>
        )}
      </button>

      {/* Card Popup Smart Hint */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-amber-300 rounded-3xl p-5 sm:p-7 max-w-lg w-full card-chunky shadow-2xl relative">

            {/* Header Pop-up */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-amber-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <span>Kiko Smart Hint</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-extrabold">
                      AI Socratic
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Bantuan ceria tanpa membocorkan jawaban!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 font-bold flex items-center justify-center transition border border-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Pilihan Kelas SD */}
            <div className="mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600">🎯 Tingkat Usia/Kelas:</span>
              <div className="flex gap-1">
                {['SD 1-2', 'SD 3-4', 'SD 5-6'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setGradeLevel(lvl);
                      handleFetchHint();
                    }}
                    className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition ${
                      gradeLevel === lvl
                        ? 'bg-amber-400 text-slate-900 shadow-sm border border-amber-500'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Pesan Kiko */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 mb-4 shadow-inner relative">
              {loading ? (
                <div className="py-8 flex flex-col items-center justify-center text-amber-800 gap-2">
                  <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold animate-pulse">
                    Kiko sedang membaca balok logikamu (qwen/qwen3.8-27b)...
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <img
                      src="/images/Robot.webp"
                      alt="Maskot Kiko"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/robot.webp";
                      }}
                      className="w-16 h-16 object-contain drop-shadow-md flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${emotionBadge.bg}`}>
                          {emotionBadge.emoji} {emotionBadge.label}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold ml-auto">
                          Model: qwen/qwen3.8-27b
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed mb-3 bg-white/90 p-3 rounded-xl border border-amber-200 shadow-sm">
                        "{hintData?.hint || 'Ayo susun baloknya dan klik tombol hint jika butuh petunjuk!'}"
                      </p>

                      {/* Tombol Suara Bicara TTS */}
                      <button
                        onClick={handleSpeakHint}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                          isSpeaking
                            ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                            : 'bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-400'
                        }`}
                      >
                        <span>{isSpeaking ? '🔊 Sedang Bicara...' : '🔊 Suara Kiko'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Pertanyaan Socrates Pemicu Logika */}
                  {hintData?.socraticQuestions && hintData.socraticQuestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-amber-200/80">
                      <p className="text-[11px] font-extrabold text-amber-900 mb-1 flex items-center gap-1">
                        <span>❓ Pertanyaan Pemicu Nalar:</span>
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {hintData.socraticQuestions.map((q, idx) => (
                          <li key={idx} className="text-[11px] text-slate-700 font-semibold">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Pop-up */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleFetchHint}
                disabled={loading}
                className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 underline"
              >
                🔄 Minta Analisa Baru
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="toy-btn-teal px-5 py-2 font-bold text-xs rounded-xl shadow-toyTeal"
              >
                Aku Paham, Kiko! 🚀
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
