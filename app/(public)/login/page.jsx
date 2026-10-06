import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email ? email.split('@')[0] : 'Arsitek Kode');
    if (role === 'student') navigate('/app/dashboard');
    else if (role === 'parent') navigate('/parent');
    else if (role === 'teacher') navigate('/teacher');
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block text-3xl mb-2">🚀</Link>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Masuk ke Blokuma</h1>
          <p className="text-xs text-slate-500">Pilih peran dan masuk untuk melanjutkan petualangan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Masuk Sebagai:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${role === 'student' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                👦 Siswa
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${role === 'parent' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                👨‍👩‍👧 Orang Tua
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${role === 'teacher' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                👩‍🏫 Guru
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email / Nickname</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kiko@blokuma.id"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password / PIN</label>
            <input
              type="password"
              defaultValue="123456"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow transition"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Belum punya akun? <Link to="/register" className="text-teal-600 font-bold hover:underline">Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
}
