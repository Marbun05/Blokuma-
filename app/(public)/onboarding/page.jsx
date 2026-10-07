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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-lg text-center">
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <div>
            <span className="text-5xl block mb-4">👋</span>
            <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Halo, Arsitek Kode!</h1>
            <p className="text-slate-600 mb-6 text-sm">Mari kita siapkan profil kodingmu yang pas untuk petualangan ini.</p>

            <div className="text-left space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nickname / Nama Panggilan</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Avatar Arsitek Kode</label>
                <div className="flex justify-center gap-3">
                  {['🧑‍🚀', '🤖', '👾', '🐱', '🦄'].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`text-3xl p-2.5 rounded-2xl border-2 transition ${
                        avatar === a ? 'border-teal-500 bg-teal-50' : 'border-slate-100 bg-slate-50'
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
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow transition"
            >
              Lanjut Pilih Kelas
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Kamu Kelas Berapa?</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`p-4 rounded-2xl border-2 font-bold text-lg transition ${
                    selectedGrade === g
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Kelas {g}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow transition"
            >
              Lanjut
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <span className="text-5xl block mb-3">{avatar}</span>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Dunia Koding {nickname} Siap!</h2>
            <p className="text-slate-600 text-sm mb-6">
              Berdasarkan Kelas {selectedGrade}, kamu akan belajar di mode{' '}
              <strong className="text-teal-600">
                {selectedGrade <= 2
                  ? 'Dunia Ikon & Suara'
                  : selectedGrade <= 4
                  ? 'Dunia Blok & Logika'
                  : 'Dunia Algoritma & Game'}
              </strong>.
            </p>

            <button
              onClick={handleFinish}
              disabled={loading}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow transition flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Mulai Petualangan!'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
