import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerWithSupabase, loading } = useAuthStore();

  const regState = location.state || {};
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState(regState.grade || 4);
  const [nickname, setNickname] = useState(regState.fullName ? regState.fullName.split(' ')[0] : 'Kiko');
  const [avatar, setAvatar] = useState('🧑‍🚀');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFinish = async () => {
    setErrorMessage(null);
    try {
      if (regState.email && regState.password) {
        await registerWithSupabase({
          email: regState.email,
          password: regState.password,
          fullName: regState.fullName || nickname,
          nickname,
          role: 'student',
          grade: selectedGrade,
          avatarUrl: avatar,
        });
      }
      navigate('/app/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menyimpan data siswa ke Supabase.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-7 sm:p-9 border-2 border-slate-200 card-chunky shadow-toyTeal w-full max-w-lg text-center">
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs sm:text-sm font-bold rounded-xl">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <div>
            <span className="text-5xl block mb-3 animate-bounce">👋</span>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              Langkah 1 dari 3: Siapkan Karakter
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Halo, Calon Arsitek Kode!
            </h1>
            <p className="text-slate-600 mb-6 text-xs sm:text-sm font-medium">
              Tentukan nama panggilan dan pilih avatar karakter favoritmu untuk memulai petualangan.
            </p>

            <div className="text-left space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Nama Panggilan / Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 font-medium"
                  placeholder="Contoh: Kiko"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Pilih Avatar Petualang
                </label>
                <div className="flex justify-center gap-2.5">
                  {['🧑‍🚀', '🤖', '👾', '🐱', '🦄'].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`text-3xl p-3 rounded-xl border-2 transition transform active:scale-95 ${
                        avatar === a
                          ? 'border-teal-500 bg-teal-50 shadow-toyTeal scale-105'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="toy-btn-teal px-8 py-3.5 font-bold text-sm sm:text-base rounded-xl shadow-toyTeal"
            >
              Lanjut Pilih Kelas! ➔
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-900 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
              Langkah 2 dari 3: Pilih Kelas
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Kamu Duduk di Kelas Berapa, {nickname}? 🎒
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 font-medium">
              Blokuma akan otomatis menyiapkan tingkatan materi yang paling pas untuk kemampuanmu!
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`p-4 rounded-xl border-2 font-bold text-base transition transform active:scale-95 ${
                    selectedGrade === g
                      ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-toyTeal'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Kelas {g}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="toy-btn-white px-5 py-3 text-xs font-bold rounded-xl text-slate-700"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="toy-btn-teal px-8 py-3.5 font-bold text-sm rounded-xl shadow-toyTeal"
              >
                Lanjut ke Ringkasan! ➔
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-4xl shadow-md mb-3">
              {avatar}
            </div>
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-emerald-300">
              Langkah 3 dari 3: Siap Berangkat!
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Dunia Koding {nickname} Sudah Siap! 🎉
            </h2>
            
            <div className="p-4 bg-teal-50/70 border-2 border-teal-300 rounded-xl my-5 text-left">
              <p className="text-xs text-teal-900 font-bold mb-1">Mode Pembelajaran Khusus Kelas {selectedGrade} SD:</p>
              <p className="text-sm font-extrabold text-teal-800">
                ✨{' '}
                {selectedGrade <= 2
                  ? 'Dunia Ikon & Suara (Kontrol Gambar & Suara Interaktif)'
                  : selectedGrade <= 4
                  ? 'Dunia Blok & Logika (Balok Susun & Teka-Teki Logika)'
                  : 'Dunia Algoritma & Game (Mekanik Game, Skor & Kode Asli)'}
              </p>
            </div>

            <button
              onClick={handleFinish}
              disabled={loading}
              className="toy-btn-amber px-9 py-4 font-bold text-base text-slate-900 rounded-xl shadow-toyAmber flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                'Buka Pintu Petualangan! 🚀'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
