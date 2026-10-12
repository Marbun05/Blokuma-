import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { KikoSmartHint } from '../../../../components/ui/KikoSmartHint.jsx';
import { KikoStoryGeneratorModal } from '../../../../components/ui/KikoStoryGeneratorModal.jsx';
import { KikoMissionSuccessModal } from '../../../../components/ui/KikoMissionSuccessModal.jsx';
import { KikoMissionBriefingModal } from '../../../../components/ui/KikoMissionBriefingModal.jsx';
import { supabase } from '../../../../lib/supabase/client';
import { unlockNextIslandInDatabase } from '../../../../lib/supabase/curriculum.js';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { getCurriculumMission, normalizeStudentClass } from '../../../../src/data/curriculumData.js';
import { validateMissionAnswer, buildExecutionQueue } from './executionQueue.js';

const ADVENTURE_THEME_OVERRIDES = {
  1: {
    name: 'Desa Urutan',
    sky: 'from-amber-100 via-sky-100 to-emerald-100',
    ground: 'bg-emerald-600',
    landmarks: ['🏡', '🚪', '🌼', '🏡']
  },
  2: {
    name: 'Hutan Perulangan',
    sky: 'from-sky-300 via-emerald-100 to-lime-100',
    ground: 'bg-green-800',
    landmarks: ['🌲', '🌳', '🍄', '🌲']
  },
  3: {
    name: 'Gunung Kondisi',
    sky: 'from-slate-300 via-amber-100 to-stone-200',
    ground: 'bg-stone-700',
    landmarks: ['⛰️', '🪨', '⛰️', '🦅']
  },
  4: {
    name: 'Rawa Rintangan',
    sky: 'from-teal-300 via-emerald-200 to-cyan-200',
    ground: 'bg-teal-900',
    landmarks: ['🐊', '🌿', '🪵', '🌿']
  },
  5: {
    name: 'Goa Misteri',
    sky: 'from-indigo-950 via-purple-900 to-slate-900',
    ground: 'bg-indigo-950',
    landmarks: ['🦇', '💎', '🪨', '✨']
  },
  6: {
    name: 'Benteng Kiko',
    sky: 'from-amber-200 via-orange-300 to-rose-300',
    ground: 'bg-slate-800',
    landmarks: ['🏰', '🚩', '⚔️', '🏰']
  }
};
const STAGE_ACTION_CLASSES = {
  idle: 'animate-kiko-idle',
  walking: 'animate-kiko-walk',
  jumping: 'animate-kiko-stage-jump',
  celebrating: 'animate-kiko-happy',
  still: ''
};

export default function StudentPlaygroundPage() {
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const rawIslandParam = searchParams.get('island');
  const isFreePlayMode = !rawIslandParam; // True jika dibuka dari menu sidebar langsung (Sandbox Bebas)

  const requestedIsland = Number(rawIslandParam);
  const requestedClass = searchParams.get('class');
  const studentClass = normalizeStudentClass(requestedClass || user?.grade || user?.student_class || 4);

  // Adapts student grade automatically based on actual class
  const defaultGradeLabel = studentClass <= 2 ? 'SD 1-2' : studentClass <= 4 ? 'SD 3-4' : 'SD 5-6';
  const [studentGrade, setStudentGrade] = useState(defaultGradeLabel);
  const [xpEarnedState, setXpEarnedState] = useState(100);

  const [islandThemes, setIslandThemes] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isKikoStageVisible, setIsKikoStageVisible] = useState(false);
  const [stageAction, setStageAction] = useState('idle');
  const [stageProgress, setStageProgress] = useState(0);
  const [actionMessage, setActionMessage] = useState('Pilih balok lalu klik Jalankan Kode!');
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastExecutionResult, setLastExecutionResult] = useState({ status: 'idle' });
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(!isFreePlayMode);
  const [hintUsageCount, setHintUsageCount] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailureOpen, setIsFailureOpen] = useState(false);
  const [executionAlert, setExecutionAlert] = useState('');
  const popAudioRef = useRef(null);

  useEffect(() => {
    const fetchPlaygroundData = async () => {
      try {
        const [islandsRes, blocksRes] = await Promise.all([
          supabase.from('playground_islands').select('*').order('created_at', { ascending: true }),
          supabase.from('playground_blocks').select('*').order('created_at', { ascending: true })
        ]);

        if (islandsRes.error) throw islandsRes.error;
        if (blocksRes.error) throw blocksRes.error;

        setIslandThemes(islandsRes.data || []);
        setAvailableBlocks(blocksRes.data || []);
      } catch (error) {
        console.error("Error fetching playground data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchPlaygroundData();
  }, []);

  const islandNumber = Number.isInteger(requestedIsland) && requestedIsland >= 1 && requestedIsland <= 6
    ? requestedIsland
    : 1;

  useEffect(() => {
    setHintUsageCount(0);
    if (!isFreePlayMode) {
      setIsBriefingOpen(true);
    }
  }, [islandNumber, isFreePlayMode]);

  const currentMission = getCurriculumMission(studentClass, islandNumber);
  const configuredTheme = islandThemes[islandNumber - 1];
  const islandTheme = {
    name: configuredTheme?.name || ADVENTURE_THEME_OVERRIDES[islandNumber]?.name || 'Pulau Default',
    sky: configuredTheme?.sky || 'from-sky-300 via-sky-100 to-amber-100',
    ground: configuredTheme?.ground || 'bg-emerald-600',
    landmarks: configuredTheme?.landmarks || ['🏡', '🌳'],
    ...ADVENTURE_THEME_OVERRIDES[islandNumber]
  };

  // Fungsi untuk memformat label balok (Progressive Disclosure)
  const formatBlockLabel = (label, grade) => {
    if (grade === 'SD 1-2') {
      if (label.includes('MAJU')) return '➡️';
      if (label.includes('LOMPAT')) return '🦘';
      if (label.includes('POP')) return '🎵';
      if (label.includes('3 Kali')) return '🔁 3x';
      return '❓';
    } else if (grade === 'SD 5-6') {
      if (label.includes('MAJU')) return 'move(forward);';
      if (label.includes('LOMPAT')) return 'jump(up);';
      if (label.includes('POP')) return 'playSound("pop");';
      if (label.includes('3 Kali')) return 'for(i=0; i<3; i++) {';
      return 'execute();';
    }
    return label;
  };

  const handleAddBlock = (block) => {
    if (isRunning) return;
    setExecutionAlert('');
    setCanvasBlocks((prev) => [...prev, { ...block, instanceId: Date.now() + Math.random() }]);
  };

  const handleClearCanvas = () => {
    if (isRunning) return;
    setCanvasBlocks([]);
    setIsKikoStageVisible(false);
    setExecutionAlert('');
    setIsFailureOpen(false);
    setStageAction('idle');
    setStageProgress(0);
    setActionMessage('Kanvas dikosongkan & Maskot kembali ke posisi awal!');
    setAttemptCount(0);
  };

  const playSynthesizedPop = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (error) {
      console.error('Tidak dapat memainkan suara Kiko:', error);
    }
  };

  const playPopSound = () => {
    if (typeof window.Audio !== 'function') {
      playSynthesizedPop();
      return;
    }

    if (!popAudioRef.current) {
      popAudioRef.current = new window.Audio('/sounds/pop.mp3');
    }

    const audio = popAudioRef.current;
    let didFallback = false;
    const fallbackToSynthesizedPop = () => {
      if (didFallback) return;
      didFallback = true;
      playSynthesizedPop();
    };
    audio.currentTime = 0;
    audio.onerror = () => {
      fallbackToSynthesizedPop();
    };
    const playback = audio.play();
    if (playback) {
      playback.catch((error) => {
        fallbackToSynthesizedPop();
      });
    }
  };

  const waitForNextStep = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

  // Eksekusi Item Tunggal dari Queue Akurat
  const executeQueueItem = async (item) => {
    const actionId = item.block.id;
    const isRepeat = item.isRepeat;
    const repetition = item.repetition;

    if (actionId === 'move') {
      setActionMessage(
        isRepeat
          ? `🚀 Robot Kiko: Maju 1 Langkah! (Perulangan ${repetition}/3)`
          : '🚀 Robot Kiko: Maju 1 Langkah!'
      );
      setStageAction('walking');
      // Kiko melangkah maju ke kanan di panggung
      setStageProgress((prev) => prev + 1);
      await waitForNextStep(600);
    } else if (actionId === 'jump') {
      setActionMessage(
        isRepeat
          ? `🦘 Robot Kiko: Melompat Tinggi! (Perulangan ${repetition}/3)`
          : '🦘 Robot Kiko: Melompat Tinggi!'
      );
      setStageAction('jumping');
      // Kiko melompat sambil melangkah maju ke kanan di panggung
      setStageProgress((prev) => prev + 1);
      await waitForNextStep(700);
    } else if (actionId === 'sound') {
      setActionMessage(
        isRepeat
          ? `🎵 Robot Kiko: Memainkan Suara POP! (Perulangan ${repetition}/3)`
          : '🎵 Robot Kiko: Memainkan Suara POP!'
      );
      setStageAction('celebrating');
      playPopSound();
      await waitForNextStep(600);
    }

    setStageAction('idle');
    await waitForNextStep(100);
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsHintOpen(false);
    setIsSuccessOpen(false);
    setIsFailureOpen(false);
    setExecutionAlert('');
    setIsKikoStageVisible(false);
    setStageAction('still');

    if (canvasBlocks.length === 0) {
      setActionMessage('Kanvas masih kosong. Tambahkan balok perintah lalu jalankan kreasimu!');
      setAttemptCount((prev) => prev + 1);
      setLastExecutionResult({ status: 'error', reason: 'empty_canvas' });
      if (!isFreePlayMode) setIsFailureOpen(true);
      return;
    }

    // 1. Bangun Antrean Eksekusi Sesuai Aturan Repeat Akurat
    const queueResult = buildExecutionQueue(canvasBlocks);

    if (queueResult.error === 'orphan_loop') {
      setActionMessage('');
      setExecutionAlert('⚠️ Harap berikan balok perintah terlebih dahulu sebelum menggunakan blok Ulangi 3 Kali!');
      setAttemptCount((prev) => prev + 1);
      setLastExecutionResult({ status: 'error', reason: 'orphan_loop' });
      return;
    }

    if (queueResult.error || !queueResult.queue) {
      setActionMessage('Kiko belum menemukan susunan balok yang pas. Silakan coba lagi.');
      setAttemptCount((prev) => prev + 1);
      setLastExecutionResult({ status: 'error', reason: queueResult.error });
      if (!isFreePlayMode) setIsFailureOpen(true);
      return;
    }

    setIsKikoStageVisible(true);
    setStageAction('idle');
    setStageProgress(0);
    setIsRunning(true);
    setAttemptCount((prev) => prev + 1);
    setLastExecutionResult({ status: 'running' });

    // 2. Putar Animasi dari queue secara sekuensial
    for (const item of queueResult.queue) {
      await executeQueueItem(item);
    }

    setActionMessage('✨ Horay! Seluruh instruksi di Kanvas berhasil dijalankan!');
    setLastExecutionResult({ status: 'completed', stepsTaken: queueResult.queue.length });
    await waitForNextStep(400);
    setIsRunning(false);

    // 3. Evaluasi Kunci Jawaban Misi jika dalam Mode Misi Terstruktur
    if (!isFreePlayMode) {
      const validation = validateMissionAnswer(canvasBlocks, currentMission);
      if (validation.error) {
        setIsFailureOpen(true);
      } else {
        const minSolutionLength = currentMission?.solutions?.length
          ? Math.min(...currentMission.solutions.map((s) => s.length))
          : 3;
        const isOptimal = canvasBlocks.length <= minSolutionLength;
        const calculatedXp = isOptimal ? 125 : 100;

        setXpEarnedState(calculatedXp);
        setIsSuccessOpen(true);
        unlockNextIslandInDatabase(user?.id, islandNumber, calculatedXp);
      }
    }
  };

  const handleHintOpenChange = (isOpen) => {
    setIsHintOpen(isOpen);
    if (isOpen) {
      setIsSuccessOpen(false);
      setIsFailureOpen(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex min-h-screen bg-[#FBF9F5] items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">Memuat Playground...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
        <div className="mb-4">
          <Link
            to="/app/adventure"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Peta Petualangan</span>
          </Link>
        </div>

        {/* Dynamic Header Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className={`inline-block px-3 py-1 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border ${
              isFreePlayMode
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-teal-100 text-teal-900 border-teal-300'
            }`}>
              {isFreePlayMode ? '🎨 Mode Kreasi Bebas (Sandbox)' : `🎯 Mode Misi Terstruktur • ${islandTheme.name}`}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
              {isFreePlayMode ? 'Kanvas Eksperimen Koding Bebas 🚀' : `Misi: ${currentMission.island_title}`}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              {isFreePlayMode
                ? 'Rakit perintah balok warna-warni sesukamu dan buat game, animasi, atau tarian Kiko!'
                : `Selesaikan tantangan di ${currentMission.island_title} dengan susunan balok logikamu!`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Pemilih Kelas / Level UI */}
            <div className="bg-white border border-slate-200 px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm h-10">
              <span className="text-[10px] font-bold text-slate-500 mr-1">Tampilan Balok:</span>
              {['SD 1-2', 'SD 3-4', 'SD 5-6'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setStudentGrade(grade)}
                  className={`text-[10px] font-extrabold px-2 py-1 rounded-lg transition cursor-pointer ${
                    studentGrade === grade
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            {!isFreePlayMode && (
              <button
                onClick={() => setIsBriefingOpen(true)}
                className="toy-btn-white px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5 border-2 border-slate-200 shadow-sm hover:border-teal-300 transition cursor-pointer"
                title="Lihat Kartu Tantangan Misi Pulau"
              >
                <span>🎯</span>
                <span>Tantangan Misi</span>
              </button>
            )}

            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="toy-btn-teal px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-toyTeal flex items-center gap-2 border-2 border-teal-700 active:scale-95 cursor-pointer"
              title="Sulap koding balokmu menjadi Dongeng Petualangan!"
            >
              <span>📖</span>
              <span>Ubah Kode Jadi Dongeng!</span>
            </button>

            {!isFreePlayMode && (
              <KikoSmartHint
                isOpen={isHintOpen}
                onOpenChange={handleHintOpenChange}
                mission={currentMission}
                canvasBlocks={canvasBlocks}
                executionResult={lastExecutionResult}
                attemptCount={attemptCount}
                maxHints={3}
                hintUsageCount={hintUsageCount}
                onIncrementHint={() => setHintUsageCount((prev) => prev + 1)}
              />
            )}
          </div>
        </div>

        {!isFreePlayMode && (
          <KikoMissionBriefingModal
            isOpen={isBriefingOpen}
            onClose={() => setIsBriefingOpen(false)}
            mission={currentMission}
            islandNumber={islandNumber}
          />
        )}

        {executionAlert && (
          <p role="alert" className="mb-4 rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm font-extrabold text-amber-900 shadow-sm">
            {executionAlert}
          </p>
        )}

        <KikoStoryGeneratorModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          studentName="Kiko"
          projectTitle={isFreePlayMode ? 'Kreasi Koding Bebas Kiko' : currentMission.island_title}
          canvasBlocks={canvasBlocks}
          xpEarned={xpEarnedState}
        />

        <div className="bg-white p-5 sm:p-7 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* 1. Panel Pilih Perintah */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <p className="font-heading font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
                  <span>📋 1. Ambil Balok Perintah:</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                    Klik untuk tambah +
                  </span>
                </p>
                <div className="space-y-2.5">
                  {availableBlocks.map((block) => {
                    if (studentGrade === 'SD 1-2' && block.id === 'repeat') return null;

                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block)}
                        disabled={isRunning}
                        className={`w-full p-3 rounded-xl font-bold text-xs shadow-sm text-left transition transform active:scale-95 flex items-center justify-between cursor-pointer ${block.color}`}
                      >
                        <span className={studentGrade === 'SD 1-2' ? 'text-2xl text-center w-full' : studentGrade === 'SD 5-6' ? 'font-mono tracking-tight text-[11px]' : ''}>
                          {formatBlockLabel(block.label, studentGrade)}
                        </span>
                        {studentGrade !== 'SD 1-2' && <span className="text-base font-extrabold">+</span>}
                      </button>
                    );
                  })}
                  {availableBlocks.length === 0 && (
                    <p className="text-sm text-slate-500 italic">Belum ada blok tersedia di database.</p>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 italic font-medium">
                *Klik balok di atas untuk merakit perintah ke Kanvas.
              </p>
            </div>

            {/* 2. Kanvas Blok */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between min-h-[260px] shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-heading font-bold text-slate-800 text-sm">🧩 2. Kanvas Rakit Kode:</p>
                  {canvasBlocks.length > 0 && (
                    <button
                      onClick={handleClearCanvas}
                      disabled={isRunning}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                    >
                      ✕ Bersihkan Kanvas
                    </button>
                  )}
                </div>

                <div className="space-y-2 min-h-[160px] p-3 bg-white rounded-xl border-2 border-dashed border-amber-200">
                  {canvasBlocks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center font-medium">
                      <span className="text-2xl mb-1">📦</span>
                      <span className="font-bold text-slate-600">Kanvas masih kosong nih!</span>
                      <span>Klik balok di sebelah kiri untuk mulai merakit aksi.</span>
                    </div>
                  ) : (
                    canvasBlocks.map((block, idx) => (
                      <div
                        key={block.instanceId}
                        className={`p-2.5 rounded-lg font-bold text-xs shadow-sm flex items-center justify-between ${block.color}`}
                      >
                        <span className={studentGrade === 'SD 5-6' ? 'font-mono text-[10px]' : ''}>
                          {idx + 1}. {formatBlockLabel(block.label, studentGrade)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-right">
                {canvasBlocks.length} balok terpasang
              </p>
            </div>

            {/* 3. Kontrol Eksekusi */}
            <div
              className="bg-[#FAF8F5] rounded-2xl p-6 border-2 border-slate-200 flex flex-col items-center justify-between min-h-[290px] text-center shadow-sm"
            >
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  3. Panggung Kiko
                </span>
                <span className="text-xl" aria-hidden="true">🎮</span>
              </div>

              <div className="my-auto flex flex-col items-center gap-3">
                <span className="text-5xl" aria-hidden="true">🤖</span>
                <p className="max-w-[220px] text-xs font-bold leading-relaxed text-slate-600">
                  Kiko dan latar petualangan akan muncul di bawah setelah kamu menjalankan kode.
                </p>
              </div>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`w-full py-3.5 px-6 font-bold text-sm sm:text-base rounded-xl transition flex items-center justify-center gap-2 cursor-pointer ${
                  isRunning
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed border-b-2 border-slate-400'
                    : 'toy-btn-teal shadow-toyTeal active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-teal-700 border-t-transparent rounded-full animate-spin" />
                    <span>Sedang Beraksi...</span>
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span>Jalankan Kreasimu! 🚀</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Area Panggung Utama */}
        {isKikoStageVisible && (
          <section
            aria-label="Panggung aksi Kiko"
            aria-live="polite"
            data-island={islandNumber}
            className={`kiko-stage-enter relative isolate mt-6 min-h-[280px] w-full overflow-hidden rounded-2xl border-2 border-white/70 bg-gradient-to-b ${islandTheme.sky} shadow-lg sm:min-h-[340px]`}
          >
            <div
              className="kiko-stage-clouds absolute inset-x-0 top-0 h-2/3"
              style={{ backgroundPositionX: `-${stageProgress * 40}px` }}
              aria-hidden="true"
            />
            <div
              className="kiko-stage-hills absolute inset-x-0 bottom-12 h-2/3"
              style={{ backgroundPositionX: `-${stageProgress * 25}px` }}
              aria-hidden="true"
            />
            <div
              className={`kiko-stage-ground absolute inset-x-0 bottom-0 h-14 border-t-4 border-white/30 ${islandTheme.ground}`}
              style={{ backgroundPositionX: `-${stageProgress * 30}px` }}
              aria-hidden="true"
            />
            <div
              className="kiko-stage-landmarks"
              style={{ transform: `translateX(-${(stageProgress % 8) * 12.5}%)` }}
              aria-hidden="true"
            >
              {[0, 1].map((copy) => (
                <div className="kiko-stage-landmark-segment" key={copy}>
                  {Array.isArray(islandTheme.landmarks) && islandTheme.landmarks.map((landmark, index) => (
                    <span
                      className="kiko-stage-landmark"
                      key={`${copy}-${index}`}
                      style={{ left: `${index * 27 + 4}%` }}
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3 sm:left-6 sm:right-6">
              <span className="rounded-full border border-white/80 bg-white/85 px-3 py-1 text-xs font-bold text-sky-900 shadow-sm">
                🚀 {isFreePlayMode ? 'Panggung Kreasi Bebas' : currentMission.island_title}
              </span>
              <span className="rounded-full border border-white/80 bg-white/85 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                {isRunning ? 'Kiko sedang beraksi!' : 'Kreasimu selesai dijalankan!'}
              </span>
            </div>

            <div
              role={lastExecutionResult.status === 'error' ? 'alert' : 'status'}
              aria-live={lastExecutionResult.status === 'error' ? 'assertive' : 'polite'}
              className="absolute left-1/2 top-16 z-10 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-teal-200 bg-white/95 px-3.5 py-2 text-center text-xs font-bold text-slate-800 shadow-sm"
            >
              {actionMessage}
            </div>

            {/* Maskot Kiko Bergerak Maju ke Kanan secara Presisi */}
            <div
              className={`absolute bottom-9 z-10 transition-all duration-500 ease-out ${STAGE_ACTION_CLASSES[stageAction]}`}
              style={{
                left: `calc(8% + ${Math.min(stageProgress * 36, 450)}px)`,
              }}
            >
              <img
                src="/images/Robot.webp"
                alt="Kiko sedang beraksi di panggung"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/robot.webp";
                }}
                className="h-28 w-28 object-contain drop-shadow-xl sm:h-36 sm:w-36"
              />
            </div>
          </section>
        )}

        {!isFreePlayMode && (
          <KikoMissionSuccessModal
            isOpen={isSuccessOpen}
            onClose={() => setIsSuccessOpen(false)}
            islandNumber={islandNumber}
            islandTitle={currentMission.island_title}
            xpEarned={xpEarnedState}
            onTryAgain={() => {
              setIsSuccessOpen(false);
              handleRunCode();
            }}
          />
        )}

        {!isFreePlayMode && isFailureOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="mission-failure-title"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 border-rose-300 bg-white p-6 text-center shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400" />
              <button
                type="button"
                onClick={() => setIsFailureOpen(false)}
                aria-label="Tutup modal misi belum berhasil"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xl font-bold text-slate-600 transition hover:rotate-90 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200 cursor-pointer"
              >
                ×
              </button>
              <div className="mb-3 mt-3 text-6xl" aria-hidden="true">🤔</div>
              <h2 id="mission-failure-title" className="mb-2 font-heading text-2xl font-bold text-slate-900">
                Misi Belum Berhasil!
              </h2>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-600">
                Coba periksa kembali susunan kodenmu.
              </p>
              <button
                type="button"
                onClick={() => handleHintOpenChange(true)}
                className="toy-btn-amber w-full rounded-xl px-5 py-3 font-bold text-sm shadow-sm cursor-pointer"
              >
                💡 Minta Panduan Kiko Smart Hint
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
