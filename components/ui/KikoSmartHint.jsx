import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
=======
import { getKikoSmartHint } from '../../lib/supabase/kikoSmartHint.js';
import { Mic, MicOff, Wand2 } from 'lucide-react';
>>>>>>> Stashed changes

export function KikoSmartHint({
  isOpen: controlledIsOpen,
  onOpenChange = () => {},
  canvasBlocks = [],
  executionResult = {},
  attemptCount = 0,
  autoOpenOnFail = true,
  mission = null,
}) {
<<<<<<< Updated upstream
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [hintData, setHintData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isOpen = controlledIsOpen ?? localIsOpen;

  const updateIsOpen = (nextIsOpen) => {
    if (controlledIsOpen === undefined) setLocalIsOpen(nextIsOpen);
    onOpenChange(nextIsOpen);
=======
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState('SD 1-2');
  const [hintData, setHintData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [showMagicHelp, setShowMagicHelp] = useState(false);

  // Auto-fetch & pop up hint jika anak sudah mencoba 2 kali lebih
  useEffect(() => {
    if (autoOpenOnFail && attemptCount >= 2 && !isOpen) {
      handleFetchHint();
      setIsOpen(true);
    }
    if (attemptCount >= 3) {
      setShowMagicHelp(true);
    }
  }, [attemptCount]);

  const handleVoiceToBlock = async () => {
    if (isListening) {
      setIsListening(false);
      // Simulate: Llama-Prompt-Guard-22m checking for toxicity
      setVoiceInput("Mengecek keamanan suara dengan Llama-Prompt-Guard-22m...");

      setTimeout(() => {
        // Simulate: whisper-large-v3-turbo processing
        setVoiceInput("Memproses suara Kiko dengan Whisper Turbo...");
        setTimeout(() => {
          setVoiceInput("Oh, Kiko mengerti! Kamu ingin maju 3 kali ya?");
        }, 1500);
      }, 1000);
      return;
    }

    setIsListening(true);
    setVoiceInput("Kiko sedang mendengarkan... (Bicara sekarang)");
  };

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
>>>>>>> Stashed changes
  };

  useEffect(() => {
    if (autoOpenOnFail && executionResult.status === 'error' && attemptCount >= 2) {
      handleFetchHint();
      updateIsOpen(true);
    }
  }, [attemptCount, autoOpenOnFail, executionResult.status]);

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
      hint: mission?.smart_hint || 'Hai sobat Kiko, lihat lagi urutan balokmu. Balok mana yang perlu dilakukan lebih dulu? 🌟',
      emotion: 'encouraging',
      modelUsed: 'Panduan Petualangan Kiko',
      highlightBlockTypes: mission?.required_blocks || [],
      socraticQuestions: [
        'Apakah urutan balokmu sudah sesuai dengan tantangan pulau ini?',
        'Jika memakai Ulangi 3 Kali, balok perintah apa yang tepat sebelumnya?',
      ],
    });
  };

  useEffect(() => {
    setHintData(null);
  }, [mission?.island_number, mission?.smart_hint]);

  useEffect(() => {
    if (isOpen && !hintData) handleFetchHint();
  }, [hintData, isOpen, mission]);

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
          updateIsOpen(!isOpen);
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
                      Panduan Pulau
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Petunjuk ceria yang disesuaikan dengan misi pulau ini!
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Tutup Kiko Smart Hint"
                onClick={() => updateIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 font-bold flex items-center justify-center transition border border-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Area Pesan Kiko */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 mb-4 shadow-inner relative">
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
                          Misi: {mission?.island_title || 'Petualangan Kiko'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed mb-3 bg-white/90 p-3 rounded-xl border border-amber-200 shadow-sm">
                        "{hintData?.hint || 'Ayo susun baloknya dan klik tombol hint jika butuh petunjuk!'}"
                      </p>

                      <div className="flex gap-2">
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

                        {/* Tombol Mikrofon (Voice-to-Block) */}
                        <button
                          onClick={handleVoiceToBlock}
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                            isListening
                              ? 'bg-rose-500 text-white animate-pulse shadow-md border-rose-600'
                              : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm border-sky-600'
                          }`}
                          title="Bicara ke Kiko (Voice-to-Block)"
                        >
                          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                          <span>{isListening ? 'Berhenti' : 'Bicara'}</span>
                        </button>
                      </div>

                      {/* Display Voice Input/STT Results */}
                      {voiceInput && (
                        <div className="mt-3 p-2 bg-sky-50 border border-sky-200 rounded-lg text-[10px] text-sky-800 font-medium italic">
                          🎤 {voiceInput}
                        </div>
                      )}
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
<<<<<<< Updated upstream
              </>
=======

                  {/* Magic Help (Bantuan Otomatis jika Stuck 3 kali) */}
                  {showMagicHelp && (
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-rose-300">
                      <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
                        <p className="text-[11px] font-extrabold text-rose-800 mb-2 flex items-center gap-1">
                          <Wand2 size={14} />
                          Bantuan Ajaib Kiko (Kamu sudah mencoba 3x!)
                        </p>
                        <p className="text-[10px] text-rose-600 font-medium mb-2">
                          Sepertinya ini agak sulit ya? Jangan menyerah! Coba susunan balok ini:
                        </p>
                        <div className="flex gap-1.5">
                          <span className="bg-teal-500 text-white px-2 py-1 rounded text-[9px] font-bold">➔ MAJU</span>
                          <span className="bg-teal-500 text-white px-2 py-1 rounded text-[9px] font-bold">➔ MAJU</span>
                          <span className="bg-amber-500 text-white px-2 py-1 rounded text-[9px] font-bold">🦘 LOMPAT</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
>>>>>>> Stashed changes
            </div>

            {/* Footer Pop-up */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleFetchHint}
                className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 underline"
              >
                🔄 Baca Petunjuk Lagi
              </button>

              <button
                type="button"
                onClick={() => updateIsOpen(false)}
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
