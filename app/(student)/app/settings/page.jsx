import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function StudentSettingsPage() {
  const [nickname, setNickname] = useState('Kiko marbun');
  const [gradeClass, setGradeClass] = useState('Kelas 4 SD');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classOptions = [
    'Kelas 1 SD',
    'Kelas 2 SD',
    'Kelas 3 SD',
    'Kelas 4 SD',
    'Kelas 5 SD',
    'Kelas 6 SD',
  ];

  // Helper untuk menentukan subtema materi berdasarkan kelas
  const getSubthemeByClass = (selectedClass) => {
    if (!selectedClass) return 'Dunia Blok dan Logika';
    if (selectedClass.includes('1') || selectedClass.includes('2')) {
      return 'Dunia Ikon dan Suara';
    } else if (selectedClass.includes('3') || selectedClass.includes('4')) {
      return 'Dunia Blok dan Logika';
    } else if (selectedClass.includes('5') || selectedClass.includes('6')) {
      return 'Dunia Algoritma dan Game';
    }
    return 'Dunia Blok dan Logika';
  };

  // 1. TAMBAHAN UTAMA: Membaca data tersimpan saat halaman dimuat/di-refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('student_nickname');
      const savedClass = localStorage.getItem('student_class');

      if (savedName) {
        setNickname(savedName);
      }
      if (savedClass) {
        setGradeClass(savedClass);
      }
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentSubtheme = getSubthemeByClass(gradeClass);

    // Simpan ke localStorage
    localStorage.setItem('student_nickname', nickname);
    localStorage.setItem('student_class', gradeClass);
    localStorage.setItem('student_subtheme', currentSubtheme);

    // Memicu event agar Sidebar & Dashboard ter-refresh secara bersamaan
    window.dispatchEvent(new Event('student_profile_updated'));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-4xl">
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
            ⚙️ Pengaturan Profil
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
            Pengaturan Akun Siswa
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Atur nama panggilan dan kelasmu agar materi koding otomatis menyesuaikan.
          </p>
        </div>

        {isSaved && (
          <div className="mb-6 p-4 bg-teal-50 border-2 border-teal-300 text-teal-900 rounded-2xl flex items-center gap-3 shadow-sm">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-bold">
              Hore! Profil berhasil diperbarui. Nama dan kelas kamu sudah tersimpan dengan aman!
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

            {/* Dropdown Pilihan Kelas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Jenjang Kelas SD
              </label>
              <select
                value={gradeClass}
                onChange={(e) => setGradeClass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-teal-500 text-slate-800 font-medium text-sm bg-white cursor-pointer transition"
              >
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Preview Subtema Materi */}
            <div className="p-4 bg-teal-50/70 rounded-xl border-2 border-teal-200">
              <p className="text-xs text-teal-900 font-medium mb-1">Materi Pembelajaran Otomatis Sesuai Kelas:</p>
              <p className="text-sm font-bold text-teal-800">
                📚 {getSubthemeByClass(gradeClass)}
              </p>
            </div>

            {/* Tombol Simpan Perubahan */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`toy-btn-teal px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-toyTeal flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan Profil...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Simpan Perubahan Profil</span>
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