import React, { useState, useEffect } from 'react';
import { getKikoStory } from '../../lib/supabase/kikoStoryGenerator.js';

export function KikoStoryGeneratorModal({
  isOpen = false,
  onClose = () => {},
  studentName = 'Kiko',
  projectTitle = 'Petualangan Balok Kiko',
  canvasBlocks = [],
  xpEarned = 50,
}) {
  const [loading, setLoading] = useState(false);
  const [storyData, setStoryData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStory();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  }, [isOpen]);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const res = await getKikoStory({
        studentName,
        projectTitle,
        canvasBlocks,
        xpEarned,
      });
      setStoryData(res);
    } catch (e) {
      console.error('Error fetching story:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakStory = () => {
    if (!storyData?.story) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const fullText = `${storyData.title}. ${storyData.story}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92;
      utterance.pitch = 1.15;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFDF9] border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-xl w-full card-chunky shadow-2xl relative overflow-hidden">

        {/* Latar Belakang Buku Dongeng Ajaib */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

        {/* Header Modal Dongeng */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-sm">
              📖
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <span>Dongeng Petualangan Koding</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-extrabold border border-purple-300">
                  Storyfication AI
                </span>
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                Mengekstrak keajaiban balok koding buatan Pahlawan {studentName}!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 font-bold flex items-center justify-center transition border border-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Isi Dongeng */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-amber-900 gap-3">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">
              AI Kiko sedang merangkai cerita ajaib (openai/gpt-oss-120b)...
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Banner Karakter Pahlawan */}
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <img
                src="/images/Robot.webp"
                alt="Robot Kiko Mascot"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/robot.webp';
                }}
                className="w-16 h-16 object-contain drop-shadow-md shrink-0 animate-bounce"
              />
              <div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 inline-block mb-1">
                  {storyData?.characterBadge || '🧙‍♂️ Penyihir Kode Ajaib'}
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  {storyData?.title || `Kisah Pahlawan ${studentName}`}
                </h4>
                <span className="text-[10px] text-amber-800 font-bold">
                  Model: openai/gpt-oss-120b • +{xpEarned} XP
                </span>
              </div>
            </div>

            {/* Kotak Buku Teks Dongeng */}
            <div className="bg-white border-2 border-amber-200 p-4 sm:p-5 rounded-2xl shadow-inner relative">
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mb-3">
                "{storyData?.story}"
              </p>

              <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] font-bold text-amber-900">
                <span className="flex items-center gap-1">
                  <span>💡 Pesan Moral:</span> {storyData?.moralValue}
                </span>
              </div>
            </div>

            {/* Tombol Audio Suara Dongeng */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSpeakStory}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                  isSpeaking
                    ? 'bg-rose-100 text-rose-700 border-2 border-rose-300 animate-pulse'
                    : 'bg-amber-200 hover:bg-amber-300 text-amber-950 border-2 border-amber-400'
                }`}
              >
                <span>{isSpeaking ? '🔊 Sedang Mendongeng...' : '🔊 Suara Kiko Mendongeng'}</span>
              </button>

              <button
                onClick={onClose}
                className="toy-btn-teal px-6 py-2.5 font-bold text-xs rounded-xl shadow-toyTeal"
              >
                Simpan ke Buku Ceritaku 📜
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
