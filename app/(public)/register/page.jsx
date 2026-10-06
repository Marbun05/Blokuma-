import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-md text-center">
        <Link to="/" className="inline-block text-3xl mb-2">🚀</Link>
        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-1">Siapa Kamu?</h1>
        <p className="text-xs text-slate-500 mb-6">Pilih pendaftaran sesuai kebutuhanmu</p>

        <div className="space-y-3">
          <Link
            to="/onboarding"
            className="block p-4 rounded-2xl border-2 border-teal-200 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 text-left transition"
          >
            <span className="text-2xl block mb-1">👦 Siswa (Anak SD)</span>
            <span className="text-xs text-slate-500">Mulai petualangan koding visual, game, dan animasi!</span>
          </Link>

          <Link
            to="/parent"
            className="block p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 text-left transition"
          >
            <span className="text-2xl block mb-1">👨‍👩‍👧 Orang Tua</span>
            <span className="text-xs text-slate-500">Pantau perkembangan kompetensi dan karya anak.</span>
          </Link>

          <Link
            to="/teacher"
            className="block p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50 text-left transition"
          >
            <span className="text-2xl block mb-1">👩‍🏫 Guru / Sekolah</span>
            <span className="text-xs text-slate-500">Kelola kelas, tugas koding, dan laporan siswa.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
