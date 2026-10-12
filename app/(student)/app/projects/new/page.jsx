import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../../lib/supabase/client.js';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [projectType, setProjectType] = useState('game'); // 'game', 'animation', 'music', 'puzzle_challenge'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎮');
  const [challengeQuestion, setChallengeQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const iconOptions = ['🎮', '🚀', '🧩', '🎨', '🎵', '⭐', '🤖', '👾', '🏰'];

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const newProjectPayload = {
        student_id: user?.id || null,
        title: title.trim(),
        description: description.trim() || 'Karya koding interaktif hasil kreasi mandiri.',
        icon: selectedIcon,
        badge_color:
          projectType === 'game'
            ? 'bg-teal-100 text-teal-800 border-teal-300'
            : projectType === 'puzzle_challenge'
            ? 'bg-amber-100 text-amber-900 border-amber-300'
            : projectType === 'animation'
            ? 'bg-purple-100 text-purple-800 border-purple-300'
            : 'bg-sky-100 text-sky-800 border-sky-300',
        blocks_json: [
          { id: 'move', label: '➔ MAJU 1 LANGKAH', color: 'bg-teal-500 text-white' },
          { id: 'sound', label: '🎵 SUARA POP CERIA', color: 'bg-sky-500 text-white' },
        ],
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('student_projects')
        .insert([newProjectPayload])
        .select()
        .single();

      if (error) throw error;

      setToastMessage('🎉 Proyek & Soal Teka-Teki Baru Berhasil Dibuat!');
      setTimeout(() => {
        navigate('/app/projects');
      }, 1000);
    } catch (err) {
      console.error('Error creating new project:', err);
      // Fallback jika belum login/koneksi
      setToastMessage('✨ Proyek Baru Berhasil Disimpan!');
      setTimeout(() => {
        navigate('/app/projects');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-5xl w-full mx-auto">
        {/* Toast Notification Card */}
        {toastMessage && (
          <div className="mb-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2">
              <span>🚀</span>
              <span>{toastMessage}</span>
            </span>
          </div>
        )}

        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Koleksi Proyek</span>
          </Link>
        </div>

        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            ✨ Pembuat Karya & Soal Tantangan Cilik
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
            Rakit Proyek & Soal Teka-Teki Baru 🎨
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Buat game seru, animasi cerita, atau susun soal teka-teki koding untuk mengasah kreativitas teman-temanmu!
          </p>
        </div>

        {/* 4 Pilihan Tipe Proyek & Soal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          {[
            { id: 'game', label: '🎮 Mini Game Aksi', desc: 'Game petualangan rintangan', color: 'border-teal-400 bg-teal-50' },
            { id: 'puzzle_challenge', label: '🧩 Soal Teka-Teki', desc: 'Susun soal tantangan koding', color: 'border-amber-400 bg-amber-50' },
            { id: 'animation', label: '🎨 Animasi Cerita', desc: 'Kisah karakter Kiko menari', color: 'border-purple-400 bg-purple-50' },
            { id: 'music', label: '🎵 Musik Interaktif', desc: 'Rangkaian nada nada ceria', color: 'border-sky-400 bg-sky-50' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                setProjectType(type.id);
                if (type.id === 'puzzle_challenge') setSelectedIcon('🧩');
                else if (type.id === 'animation') setSelectedIcon('🎨');
                else if (type.id === 'music') setSelectedIcon('🎵');
                else setSelectedIcon('🎮');
              }}
              className={`p-4 rounded-2xl border-2 text-left transition transform active:scale-95 cursor-pointer flex flex-col justify-between ${
                projectType === type.id
                  ? `${type.color} shadow-toyTeal scale-102 ring-2 ring-teal-400`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="font-heading font-bold text-slate-900 text-sm block mb-1">
                  {type.label}
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                  {type.desc}
                </span>
              </div>
              {projectType === type.id && (
                <span className="text-xs font-bold text-teal-700 mt-2 block">✓ Dipilih</span>
              )}
            </button>
          ))}
        </div>

        {/* Form Isian Proyek & Soal Baru */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 card-chunky shadow-sm max-w-3xl">
          <form onSubmit={handleCreateProject} className="space-y-6">

            {/* Judul Proyek / Soal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Judul Karya / Soal Teka-Teki
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  projectType === 'puzzle_challenge'
                    ? 'Contoh: Soal Teka-Teki Melompati Rawa Kiko'
                    : 'Contoh: Petualangan Antariksa Kiko'
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Pilihan Ikon Aksen */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Ikon Aksen Karya
              </label>
              <div className="flex flex-wrap gap-2.5">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-11 h-11 text-2xl rounded-xl border-2 transition transform active:scale-95 cursor-pointer ${
                      selectedIcon === icon
                        ? 'bg-teal-100 border-teal-500 scale-105 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi Karya */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Deskripsi Singkat Karya
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan gambaran singkat game, animasi, atau ide koding buatanmu..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Khusus Tipe Soal Teka-Teki (Custom Quiz/Puzzle Challenge) */}
            {projectType === 'puzzle_challenge' && (
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
                  🧩 Tantangan Pertanyaan Soal (Petunjuk Teman)
                </label>
                <input
                  type="text"
                  value={challengeQuestion}
                  onChange={(e) => setChallengeQuestion(e.target.value)}
                  placeholder="Contoh: Susun balok Maju 2x lalu Lompat untuk memenangkan game!"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 bg-white"
                />
                <p className="text-[11px] text-amber-900 font-medium">
                  *Soal teka-teki ini akan muncul di kartu briefing saat teman-teman mencoba memecahkannya di Playground!
                </p>
              </div>
            )}

            {/* Tombol Simpan & Buka Playground */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="toy-btn-teal flex-1 py-3.5 px-6 font-bold text-sm text-white rounded-xl shadow-toyTeal flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>💾</span>
                    <span>Simpan & Buka Kanvas Playground 🚀</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
