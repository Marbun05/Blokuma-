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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Brand & Banner Image */}
        <div className="relative min-h-[280px] md:min-h-[500px] bg-slate-900 hidden md:block overflow-hidden">
          <img
            src="/Anak.jpg"
            alt="Anak Belajar Coding Blokuma"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85 transform hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-teal-900/30" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-lg">
                🚀
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Blokuma
              </span>
            </Link>

            <div>
              <span className="inline-block px-3 py-1 bg-teal-500/80 text-teal-100 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-teal-400/30">
                ✨ Arsitek Kode Masa Depan
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                "Rancang, Buat, dan Hidupkan Karyamu!"
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Platform koding visual adaptif untuk anak SD kelas 1–6. Selamat datang kembali di workshop digitalmu!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Panel */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center md:text-left mb-6">
            <Link to="/" className="inline-block md:hidden text-3xl mb-2">🚀</Link>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Masuk ke Blokuma</h1>
            <p className="text-xs text-slate-500 mt-1">Masuk dengan akun terdaftar untuk melanjutkan petualangan</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl text-center">
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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-teal-200 transition transform active:scale-95 flex items-center justify-center gap-2"
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
    </div>
  );
}
