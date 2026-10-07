import React, { useState } from 'react';
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
    if (selectedClass.includes('1') || selectedClass.includes('2')) {
      return 'Dunia Ikon dan Suara';
    } else if (selectedClass.includes('3') || selectedClass.includes('4')) {
      return 'Dunia Blok dan Logika';
    } else if (selectedClass.includes('5') || selectedClass.includes('6')) {
      return 'Dunia Algoritma dan Game';
    }
    return 'Dunia Blok dan Logika';
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simpan ke localStorage agar nilai kelas & materi dapat dibaca modul lain
    const currentSubtheme = getSubthemeByClass(gradeClass);
    localStorage.setItem('student_nickname', nickname);
    localStorage.setItem('student_class', gradeClass);
    localStorage.setItem('student_subtheme', currentSubtheme);
window.dispatchEvent(new Event('student_profile_updated'));
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-1">
            Pengaturan Akun Siswa
          </h1>
          <p className="text-slate-600 text-sm">
            Atur profil dan preferensi kodingmu.
          </p>
        </div>

        {isSaved && (
          <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-2xl flex items-center gap-3">
            <span className="text-xl">✨</span>
            <span className="text-sm font-bold">
              Profil berhasil diperbarui! Kelas diset ke {gradeClass} ({getSubthemeByClass(gradeClass)}).
            </span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Input Nickname */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nickname
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium text-sm transition"
                placeholder="Masukkan nama panggilanmu"
              />
            </div>

            {/* Dropdown Pilihan Kelas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kelas
              </label>
              <select
                value={gradeClass}
                onChange={(e) => setGradeClass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium text-sm bg-white cursor-pointer transition"
              >
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Preview Subtema Materi */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500 font-medium mb-1">Materi Pembelajaran Otomatis:</p>
              <p className="text-sm font-bold text-teal-700">
                📚 {getSubthemeByClass(gradeClass)}
              </p>
            </div>

            {/* Tombol Simpan Perubahan */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition transform active:scale-95 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  '💾 Simpan Perubahan'
                )}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}