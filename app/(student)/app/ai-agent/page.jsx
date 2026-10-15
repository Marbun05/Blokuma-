import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  Volume2,
  ShieldCheck,
  Zap,
  BookOpen,
  Puzzle,
  Code,
  Play,
  Trophy,
  RotateCcw,
  Plus,
  Trash2,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function KikoAiAgentPage() {
  const { user } = useAuthStore();
  const studentName = user?.nickname || user?.fullName?.split(' ')[0] || 'Detektif Cilik';

  // Automatically derive grade from logged in user account
  const studentGrade = user?.grade ? Number(user.grade) : 3;
  const [caseIndex, setCaseIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [xpPoints, setXpPoints] = useState(250);

  // Active Mystery Case State
  const [currentCase, setCurrentCase] = useState(null);
  const [activeCodeBlocks, setActiveCodeBlocks] = useState([]);
  const [tobiDialog, setTobiDialog] = useState('');
  const [tobiEmotion, setTobiEmotion] = useState('confused'); // 'confused' | 'thinking' | 'happy' | 'solved'
  const [isCaseSolved, setIsCaseSolved] = useState(false);

  // Chat & Peer Discussion
  const [studentInput, setStudentInput] = useState('');
  const [discussionHistory, setDiscussionHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const chatBottomRef = useRef(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Text-To-Speech
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#]/g, ''));
      utterance.lang = 'id-ID';
      utterance.pitch = 1.1;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      triggerToast('🔊 Fitur suara tidak didukung di browser ini.');
    }
  };

  // Fetch / Generate Mystery Case from Mastermind Engine based automatically on user grade
  const loadMysteryCase = async (grade = studentGrade, index = caseIndex) => {
    setLoading(true);
    setIsCaseSolved(false);

    try {
      const response = await fetch('https://sjmnjoiqrtgxhknbnjyd.supabase.co/functions/v1/kiko-ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
        },
        body: JSON.stringify({
          mode: 'generate_case',
          gradeLevel: grade,
          caseIndex: index,
          studentNickname: studentName,
        }),
      });

      const data = await response.json();

      if (data && data.case_data) {
        setCurrentCase(data.case_data);
        setActiveCodeBlocks(data.case_data.broken_code_logic || []);
        setTobiDialog(data.tobi_initial_dialog || data.case_data.bug_description);
        setTobiEmotion('confused');
        setDiscussionHistory([
          {
            sender: 'tobi',
            text: data.tobi_initial_dialog || data.case_data.bug_description,
            time: 'Baru Saja',
          },
        ]);
      }
    } catch (err) {
      console.error('Error loading mystery case:', err);
      triggerToast('⚠️ Gagal memuat kasus misteri baru. Menampilkan kasus cadangan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMysteryCase(studentGrade, caseIndex);
  }, [studentGrade, caseIndex]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [discussionHistory, loading]);

  const handleNextCase = () => {
    const nextIdx = (caseIndex + 1) % 40;
    setCaseIndex(nextIdx);
    loadMysteryCase(studentGrade, nextIdx);
    triggerToast(`🔍 Memuat Kasus Misteri #${nextIdx + 1}...`);
  };

  // Send Peer Explanation / Guidance to Tobi
  const handleGuideTobi = async (customPrompt) => {
    const textToSend = customPrompt || studentInput;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'student', text: textToSend, time: 'Baru Saja' };
    setDiscussionHistory((prev) => [...prev, userMsg]);
    setStudentInput('');
    setLoading(true);
    setTobiEmotion('thinking');

    try {
      const response = await fetch('https://sjmnjoiqrtgxhknbnjyd.supabase.co/functions/v1/kiko-ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
        },
        body: JSON.stringify({
          mode: 'peer_interaction',
          studentPrompt: textToSend,
          gradeLevel: studentGrade,
          studentNickname: studentName,
        }),
      });

      const data = await response.json();

      if (data && data.tobi_reply) {
        setDiscussionHistory((prev) => [
          ...prev,
          { sender: 'tobi', text: data.tobi_reply, time: 'Baru Saja' },
        ]);
        setTobiDialog(data.tobi_reply);
        setTobiEmotion(data.emotion || 'confused');

        if (data.xpReward) {
          setXpPoints((prev) => prev + data.xpReward);
          triggerToast(`🌟 +${data.xpReward} XP Bimbingan Tobi!`);
        }
      }
    } catch (err) {
      console.error('Error guiding Tobi:', err);
    } finally {
      setLoading(false);
    }
  };

  // Evaluate & Test Fixed Code Blocks
  const handleTestAndSolveCase = async () => {
    setLoading(true);
    setTobiEmotion('thinking');

    try {
      const response = await fetch('https://sjmnjoiqrtgxhknbnjyd.supabase.co/functions/v1/kiko-ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbW5qb2lxcnRneGhrbmJuanlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzEsImV4cCI6MjEwNjc1MjQ3MX0.H8gfWgGxBH7fasnC2H8HrK2s4Z2wwo9H2SM2dhe_ZX4',
        },
        body: JSON.stringify({
          mode: 'evaluate_solution',
          gradeLevel: studentGrade,
          caseIndex: caseIndex,
          studentCodeBlocks: activeCodeBlocks,
          studentNickname: studentName,
        }),
      });

      const data = await response.json();

      if (data && data.isSolved) {
        setIsCaseSolved(true);
        setTobiEmotion('solved');
        setTobiDialog(data.tobi_reply);
        setDiscussionHistory((prev) => [
          ...prev,
          { sender: 'tobi', text: data.tobi_reply, time: 'Baru Saja' },
        ]);
        setXpPoints((prev) => prev + (data.xpReward || 25));
        triggerToast(`🎉 KASUS TERPECAHKAN! +${data.xpReward || 25} XP Lencana Detektif Koding!`);
      } else {
        setTobiEmotion('confused');
        const failReply = data.tobi_reply || 'Duh, kodenya masih belum berhasil melangkah. Coba ganti balok yang salah!';
        setTobiDialog(failReply);
        setDiscussionHistory((prev) => [
          ...prev,
          { sender: 'tobi', text: failReply, time: 'Baru Saja' },
        ]);
        triggerToast('⚠️ Kode masih mengandung bug. Periksa susunan baloknya!');
      }
    } catch (err) {
      console.error('Error testing code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Canvas Block Controls
  const handleRemoveBlock = (index) => {
    setActiveCodeBlocks((prev) => prev.filter((_, i) => i !== index));
    triggerToast('🗑️ Balok dilepas dari kanvas.');
  };

  const handleAddBlock = (blockType, label) => {
    const newBlock = {
      id: `b-${Date.now()}`,
      type: blockType,
      label: label,
      value: blockType === 'move' ? 3 : blockType === 'loop' ? 3 : 'custom',
    };
    setActiveCodeBlocks((prev) => [...prev, newBlock]);
    triggerToast(`✨ Balok "${label}" ditambahkan ke Kanvas Tobi!`);
  };

  const handleVoiceMic = () => {
    setIsRecording(true);
    triggerToast('🎤 Mendengarkan penjelasannmu untuk Tobi (Whisper-Turbo)...');

    setTimeout(() => {
      setIsRecording(false);
      const voiceOptions = [
        'Tobi, ubah balok mundurnya jadi balok Maju 3 Langkah!',
        'Gunakan balok Ulangi 3 Kali biar kodenya efisien!',
        'Atur variabel skor jadi skor plus sepuluh!',
      ];
      const randomVoice = voiceOptions[Math.floor(Math.random() * voiceOptions.length)];
      setStudentInput(randomVoice);
      handleGuideTobi(randomVoice);
    }, 2000);
  };

  // Tobi Avatar Helper
  const getTobiAvatar = () => {
    switch (tobiEmotion) {
      case 'solved':
        return { emoji: '🎉', bg: 'bg-emerald-100 border-emerald-400', label: 'Tobi Bahagia (Kasus Selesai)' };
      case 'thinking':
        return { emoji: '💭', bg: 'bg-sky-100 border-sky-400', label: 'Tobi Sedang Mencoba Kode' };
      case 'happy':
        return { emoji: '💡', bg: 'bg-amber-100 border-amber-400', label: 'Tobi Paham Petunjuk' };
      default:
        return { emoji: '🧐', bg: 'bg-purple-100 border-purple-400', label: 'Tobi Bingung (Teman Sebaya SD)' };
    }
  };

  const tobiAvatar = getTobiAvatar();

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-4 sm:p-7 pb-24 md:pb-8 max-w-6xl w-full mx-auto space-y-5">

        {/* Toast Notifikasi */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-amber-400 border-2 border-amber-600 text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl font-heading font-bold text-xs sm:text-sm animate-bounce flex items-center gap-2">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Case Header */}
        <div className="bg-white rounded-3xl p-5 border-3 border-purple-200 card-chunky shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white font-bold flex items-center justify-center text-2xl shadow-toyPurple border-b-2 border-purple-700">
                🔍
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[11px] font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-purple-700" /> Detektif Pembelajaran (Protégé Agent)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Kasus #{caseIndex + 1}
                  </span>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-3 py-0.5 rounded-full border border-teal-300 flex items-center gap-1">
                    🎓 Kelas {studentGrade} SD • Otomatis
                  </span>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                  {currentCase?.case_title || 'Misteri Bug Koding SD'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2.5 rounded-2xl border-2 border-amber-300 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block leading-tight">Bintang XP</span>
                  <span className="font-heading font-bold text-lg text-amber-700">{xpPoints} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Agent Architecture Badges */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-purple-50 text-purple-900 px-2.5 py-0.5 rounded-md border border-purple-200">
                🧠 Mastermind Engine (120b)
              </span>
              <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200">
                🤝 Peer Agent Tobi (20b)
              </span>
              <span className="bg-emerald-50 text-emerald-900 px-2.5 py-0.5 rounded-md border border-emerald-200">
                🛡️ Safeguard & Llama Guard
              </span>
            </div>

            <span className="text-[11px] font-bold text-slate-600">
              Soal Otomatis Disesuaikan dengan Akun Siswa Kelas {studentGrade} SD
            </span>
          </div>
        </div>

        {/* Main 2-Column Grid: Left (Peer Tobi & Chat) | Right (Kanvas Balok Rusak) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT COLUMN: Peer Agent Tobi Discussion (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tobi Status Card */}
            <div className="bg-white rounded-3xl p-5 border-3 border-purple-200 card-chunky shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${tobiAvatar.bg} border-3 flex items-center justify-center text-3xl shadow-sm animate-bounce`}>
                  {tobiAvatar.emoji}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-1.5">
                    <span>Tobi (Teman Sekelas)</span>
                    <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-purple-300">
                      Kelas {studentGrade} SD
                    </span>
                  </h3>
                  <p className="text-xs text-purple-700 font-medium">{tobiAvatar.label}</p>
                </div>
              </div>

              <div className="bg-purple-50/90 p-4 rounded-2xl border-2 border-purple-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 block">
                  📢 Pesan Misteri Tobi:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                  "{tobiDialog}"
                </p>

                <button
                  onClick={() => speakText(tobiDialog)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white text-purple-900 text-[11px] font-bold rounded-xl border border-purple-300 hover:bg-purple-100 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Dengarkan Suara Tobi 🔊</span>
                </button>
              </div>
            </div>

            {/* Peer Discussion History */}
            <div className="bg-white rounded-3xl p-4 border-3 border-slate-200 card-chunky shadow-sm space-y-3 max-h-[300px] overflow-y-auto">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Bot className="w-4 h-4 text-purple-600" /> Diskusi Detektif & Tobi:
              </span>

              {discussionHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col text-xs space-y-1 p-3 rounded-2xl border ${
                    item.sender === 'student'
                      ? 'bg-teal-50 border-teal-200 text-teal-900 ml-4'
                      : 'bg-purple-50 border-purple-200 text-purple-900 mr-4'
                  }`}
                >
                  <span className="font-bold text-[10px] opacity-75">
                    {item.sender === 'student' ? `🧑‍🚀 Detektif ${studentName}` : '🤝 Tobi'}
                  </span>
                  <p className="font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Guidance for Tobi */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuideTobi();
              }}
              className="bg-white p-3 rounded-2xl border-3 border-slate-200 card-chunky flex items-center gap-2 shadow-sm"
            >
              <button
                type="button"
                onClick={handleVoiceMic}
                className={`p-2.5 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white border-rose-700 animate-pulse'
                    : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                }`}
                title="Bicara ke Tobi (Whisper Voice AI)"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                placeholder="Beri petunjuk atau ajarkan Tobi..."
                className="flex-1 px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-500"
              />

              <button
                type="submit"
                disabled={loading || !studentInput.trim()}
                className="toy-btn-purple px-4 py-2 text-white font-bold text-xs rounded-xl shadow-toyPurple flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span>Bimbing</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Kanvas Kode Rusak (7 cols) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Broken Code Workspace Canvas */}
            <div className="bg-white rounded-3xl p-5 border-3 border-slate-200 card-chunky shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200 inline-block mb-1">
                    🛠️ Kanvas Kode Milik Tobi
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base">
                    Susunan Balok Logika yang Rusak
                  </h3>
                </div>

                <button
                  onClick={() => loadMysteryCase(studentGrade, caseIndex)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Kasus</span>
                </button>
              </div>

              {/* Active Code Blocks Display */}
              <div className="bg-slate-900 p-4 rounded-2xl border-3 border-slate-700 min-h-[180px] space-y-2 font-mono">
                {activeCodeBlocks.map((block, idx) => (
                  <div
                    key={block.id || idx}
                    className="flex items-center justify-between bg-slate-800 border-2 border-slate-600 p-3 rounded-xl text-xs text-white shadow-sm hover:border-teal-400 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">{idx + 1}.</span>
                      <span className="font-bold text-teal-300">{block.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(idx)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-slate-700 transition cursor-pointer"
                        title="Lepas Balok Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeCodeBlocks.length === 0 && (
                  <div className="py-8 text-center text-slate-500 text-xs font-medium border-2 border-dashed border-slate-700 rounded-xl">
                    Kanvas kosong. Klik balok di bawah untuk menambahkan solusi!
                  </div>
                )}
              </div>

              {/* Add Block Palette for Student */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 block">
                  ➕ Tambah Balok Perbaikan ke Kanvas Tobi:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAddBlock('move', 'Maju 3 Langkah 🟦')}
                    className="px-3 py-1.5 bg-sky-500 text-white font-bold text-xs rounded-xl border-2 border-sky-700 shadow-sm hover:scale-105 transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> [Maju 3 Langkah]
                  </button>

                  <button
                    onClick={() => handleAddBlock('loop', 'Ulangi 3 Kali 🟪')}
                    className="px-3 py-1.5 bg-purple-500 text-white font-bold text-xs rounded-xl border-2 border-purple-700 shadow-sm hover:scale-105 transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> [Ulangi 3 Kali 🔁]
                  </button>

                  <button
                    onClick={() => handleAddBlock('jump', 'Lompat Rintangan 🦘')}
                    className="px-3 py-1.5 bg-emerald-500 text-white font-bold text-xs rounded-xl border-2 border-emerald-700 shadow-sm hover:scale-105 transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> [Lompat Rintangan 🦘]
                  </button>

                  {studentGrade >= 5 && (
                    <button
                      onClick={() => handleAddBlock('variable', 'Ubah Skor = Skor + 10 🟧')}
                      className="px-3 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl border-2 border-amber-700 shadow-sm hover:scale-105 transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> [Skor = Skor + 10]
                    </button>
                  )}
                </div>
              </div>

              {/* Big Solve Button */}
              <div className="pt-3">
                <button
                  onClick={handleTestAndSolveCase}
                  disabled={loading}
                  className="toy-btn-teal w-full py-4 text-white font-heading font-bold text-sm sm:text-base rounded-2xl shadow-toyTeal flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Uji Kode & Pecahkan Misteri 🚀</span>
                </button>
              </div>
            </div>

            {/* Solved Case Celebration Banner */}
            {isCaseSolved && (
              <div className="bg-emerald-50 border-3 border-emerald-400 p-5 rounded-3xl card-chunky shadow-sm space-y-3 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🎉</span>
                  <div>
                    <h3 className="font-heading font-bold text-emerald-900 text-lg">
                      Lencana Detektif Koding Berhasil Ditemukan!
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium">
                      Kamu berhasil memandu Tobi memperbaiki kode bug dan memecahkan {currentCase?.case_title}!
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                  <span className="text-xs font-bold text-emerald-900">🌟 Hadiah: +25 XP Detektif</span>
                  <button
                    onClick={handleNextCase}
                    className="toy-btn-teal px-4 py-2 text-white font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lanjut ke Kasus Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-2 flex-wrap gap-2 pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Protégé Autonomous Learning • Kurikulum Otomatis Sesuai Akun Kelas {studentGrade} SD
          </span>
          <span className="text-purple-700">Multi-Agent Engine (Mastermind 120b, Peer 20b, Safeguard 20b, Llama Guard 86m)</span>
        </div>

      </main>
    </div>
  );
}
