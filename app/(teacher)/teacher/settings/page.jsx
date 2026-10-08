import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherSettingsPage() {
  const [autoAssist, setAutoAssist] = useState(true);
  const [freePlayDuringClass, setFreePlayDuringClass] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 mb-2">
              <span>⚙️</span> Pengaturan Akun Pengajar
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Pengaturan Guru & Kelas
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Atur pendampingan otomatis robot Kiko di kelas dan kontrol privasi siswa.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        {saved && (
          <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 px-4 py-3 rounded-2xl flex items-center gap-3 animate-fade-in font-medium text-sm">
            <span>🎉</span> Preferensi kelas Bu Maya berhasil diperbarui!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Mode Pendampingan AI Kiko di Kelas */}
          <div className="card-chunky bg-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h2 className="font-heading font-bold text-slate-900 text-lg">
                  Bantuan Robot Kiko untuk Siswa
                </h2>
                <p className="text-xs text-slate-500">
                  Kiko memberikan petunjuk bertahap saat siswa mengalami error perulangan (loop).
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 divide-y divide-slate-100">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-800">Petunjuk Cerdas Saat Siswa Macet (Auto-Assist)</div>
                  <div className="text-xs text-slate-500">
                    Beri bisikan ramah jika siswa mencoba menjalankan kode gagal 3 kali berturut-turut.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoAssist(!autoAssist)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    autoAssist ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      autoAssist ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-800">Kunci Mode Kreasi Bebas Selama Jam Kelas</div>
                  <div className="text-xs text-slate-500">
                    Arahkan seluruh siswa fokus pada misi terstruktur yang ditugaskan oleh guru.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFreePlayDuringClass(!freePlayDuringClass)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    freePlayDuringClass ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      freePlayDuringClass ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-800">Notifikasi Siswa Butuh Bantuan ke Email</div>
                  <div className="text-xs text-slate-500">
                    Terima pemberitahuan jika ada siswa yang belum menuntaskan tantangan setelah 3 hari.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    emailAlerts ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="toy-btn-teal px-6 py-3 font-bold text-sm rounded-xl shadow-toyTeal flex items-center gap-2"
            >
              <span>💾</span> Simpan Pengaturan Kelas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

