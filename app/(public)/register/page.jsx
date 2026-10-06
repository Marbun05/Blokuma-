import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerWithSupabase, loading } = useAuthStore();

  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState(4);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (role === 'student') {
        navigate('/onboarding', { state: { role, fullName, email, password, grade } });
        return;
      }

      await registerWithSupabase({
        email,
        password,
        fullName,
        nickname: fullName.split(' ')[0],
        role,
        avatarUrl: role === 'parent' ? '👨‍👩‍👧' : '👩‍🏫',
      });

      if (role === 'parent') navigate('/parent');
      else if (role === 'teacher') navigate('/teacher');
      else navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mendaftar akun.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block text-3xl mb-2">🚀</Link>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Daftar Akun Blokuma</h1>
          <p className="text-xs text-slate-500">Pilih peran dan buat akun terintegrasi ke Supabase</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Peran:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  role === 'student'
                    ? 'bg-teal-50 border-teal-500 text-teal-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                👦 Siswa
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  role === 'parent'
                    ? 'bg-amber-50 border-amber-500 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                👨‍👩‍👧 Orang Tua
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  role === 'teacher'
                    ? 'bg-purple-50 border-purple-500 text-purple-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                👩‍🏫 Guru
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Contoh: Kiko Pratama"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kiko@blokuma.id"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password (Minimal 6 Karakter)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          {role === 'student' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelas SD</label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              >
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <option key={g} value={g}>
                    Kelas {g} SD
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              role === 'student' ? 'Lanjut ke Onboarding' : 'Daftar Akun Sekarang'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
