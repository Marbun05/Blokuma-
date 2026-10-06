import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithSupabase, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const userProfile = await loginWithSupabase(email, password);

      if (userProfile.role === 'student') navigate('/app/dashboard');
      else if (userProfile.role === 'parent') navigate('/parent');
      else if (userProfile.role === 'teacher') navigate('/teacher');
      else navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block text-3xl mb-2">🚀</Link>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Masuk ke Blokuma</h1>
          <p className="text-xs text-slate-500 mt-1">Masuk dengan akun Supabase yang telah terdaftar</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Pengguna</label>
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
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Masuk ke Akun'
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Belum punya akun?{' '}
          <Link to="/register" className="text-teal-600 font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
