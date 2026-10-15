import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function StudentSettingsPage() {
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState(user?.nickname || user?.fullName?.split(' ')[0] || 'Kiko');
  const [gradeClass, setGradeClass] = useState(user?.grade ? `Kelas ${user.grade} SD` : 'Belum Memilih Kelas');
  const [connectedClass, setConnectedClass] = useState(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper untuk menentukan subtema materi berdasarkan kelas
  const getSubthemeByClass = (selectedClass) => {
    if (!selectedClass || selectedClass === 'Belum Memilih Kelas') return 'Belum Memilih Kelas (Penempatan kelas dikelola terpusat oleh Guru)';
    if (selectedClass.includes('1') || selectedClass.includes('2')) {
      return 'Dunia Ikon dan Suara (Kontrol Visual Sederhana)';
    } else if (selectedClass.includes('3') || selectedClass.includes('4')) {
      return 'Dunia Blok dan Logika (Perulangan Loop & Urutan)';
    } else if (selectedClass.includes('5') || selectedClass.includes('6')) {
      return 'Dunia Algoritma dan Game (Variabel & Sintaks Koding)';
    }
    return 'Dunia Ikon dan Suara';
  };

  useEffect(() => {
    async function loadProfileAndClass() {
      if (user?.nickname) setNickname(user.nickname);
      setGradeClass(user?.grade ? `Kelas ${user.grade} SD` : 'Belum Memilih Kelas');

      if (user?.id) {
        const [{ data: prof }, { data: classRel }] = await Promise.all([
          supabase.from('profiles').select('nickname, grade').eq('id', user.id).single(),
          supabase.from('classroom_students').select('classroom_id, classrooms(name, teacher_id)').eq('student_id', user.id).limit(1),
        ]);

        if (prof) {
          if (prof.nickname) setNickname(prof.nickname);
          setGradeClass(prof.grade ? `Kelas ${prof.grade} SD` : 'Belum Memilih Kelas');
        }

        if (classRel && classRel.length > 0 && classRel[0].classrooms) {
          setConnectedClass(classRel[0].classrooms);
        }
      }
    }
    loadProfileAndClass();
  }, [user]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    const { user: currentUser, setUserProfile } = useAuthStore.getState();

    if (currentUser?.id) {
      try {
        await supabase
          .from('profiles')
          .update({
            nickname,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentUser.id);

        setToastMessage('✨ Nama panggilan berhasil disimpan!');
      } catch (err) {
        console.error('Gagal update profile:', err);
      }
    }

    if (currentUser) {
      setUserProfile({
        ...currentUser,
        nickname,
      });
    }

    window.dispatchEvent(new Event('student_profile_updated'));

    setIsSubmitting(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-4xl w-full mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            ⚙️ Pengaturan Profil Siswa
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
            Pengaturan Akun Siswa
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Atur nama panggilanmu. Penempatan rombel kelas dikelola secara terpusat oleh Gurumu.
          </p>
        </div>

        {/* Toast Notifikasi Status */}
        {(isSaved || toastMessage) && (
          <div className="mb-6 p-4 bg-teal-50 border-2 border-teal-300 text-teal-900 rounded-2xl flex items-center gap-3 shadow-sm font-bold text-xs sm:text-sm animate-fadeIn">
            <span className="text-2xl">✨</span>
            <span>
              {toastMessage || 'Hore! Profil berhasil diperbarui!'}
            </span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Input Nickname */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nickname / Nama Panggilan
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-teal-500 text-slate-800 font-medium text-sm transition"
                placeholder="Masukkan nama panggilanmu"
              />
            </div>

            {/* Preview Subtema Materi */}
            <div className="p-4 bg-teal-50/70 rounded-xl border-2 border-teal-200">
              <p className="text-xs text-teal-900 font-bold mb-1">Materi Pembelajaran Otomatis Sesuai Rombel Guru:</p>
              <p className="text-sm font-bold text-teal-800">
                📚 {getSubthemeByClass(gradeClass)}
              </p>
            </div>

            {/* Status Rombel Kelas Terpusat */}
            {connectedClass ? (
              <div className="p-5 bg-purple-50/90 rounded-2xl border-2 border-purple-300 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏫</span>
                    <span>Rombel Kelas Sekolah (Terpusat)</span>
                  </span>
                  <span className="text-[11px] font-extrabold px-3 py-1 bg-purple-200 text-purple-950 rounded-full border border-purple-300">
                    Terhubung: {connectedClass.name}
                  </span>
                </div>
                <p className="text-xs text-purple-900 font-medium leading-relaxed">
                  Penempatan kelas dan materi kodingmu dikelola secara langsung oleh Gurumu melalui Dashboard Guru.
                </p>
              </div>
            ) : (
              <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏫</span>
                    <span>Rombel Kelas Sekolah</span>
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 bg-slate-200 text-slate-700 rounded-full border border-slate-300">
                    Belum Ditempatkan
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Penempatan rombel kelas dikelola secara terpusat oleh Gurumu. Hubungi guru kodingmu di sekolah untuk dimasukkan ke rombel kelas.
                </p>
              </div>
            )}

            {/* Tombol Simpan Perubahan */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`toy-btn-teal px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-toyTeal flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan ke Database...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Simpan Profil</span>
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
