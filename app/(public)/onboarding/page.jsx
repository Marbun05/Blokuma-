'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearningStore } from '../../../store/learning/use-learning-store';

export default function OnboardingPage() {
  const router = useRouter();
  const { setGrade } = useLearningStore();
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState(4);

  const handleFinish = () => {
    setGrade(selectedGrade);
    router.push('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-lg text-center">
        {step === 1 && (
          <div>
            <span className="text-5xl block mb-4">👋</span>
            <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Halo, Arsitek Kode!</h1>
            <p className="text-slate-600 mb-6 text-sm">Selamat datang di Blokuma! Mari kita siapkan dunia koding yang pas untukmu.</p>
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow transition"
            >
              Lanjut
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
            <span className="text-5xl block mb-3">🚀</span>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Dunia Kodingmu Siap!</h2>
            <p className="text-slate-600 text-sm mb-6">
              Berdasarkan Kelas {selectedGrade}, kamu akan belajar di mode{' '}
              <strong className="text-teal-600">
                {selectedGrade <= 2 ? 'Dunia Ikon & Suara' : selectedGrade <= 4 ? 'Dunia Blok & Logika' : 'Dunia Algoritma & Game'}
              </strong>.
            </p>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow transition"
            >
              Mulai Petualangan!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
