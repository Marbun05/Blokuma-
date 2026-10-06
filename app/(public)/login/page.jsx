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
    <div className="min-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* Left Side: Edge-to-Edge Hero Banner Image */}
      <div className="relative w-full h-full min-h-[260px] lg:min-h-screen hidden lg:flex flex-col justify-between p-8 xl:p-14 overflow-hidden">
        <img
          src="/Anak.jpg"
          alt="Anak Belajar Coding Blokuma"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transform hover:scale-105 transition duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-teal-950/40" />

        {/* Top Brand Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-lg">
              🚀
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Blokuma
            </span>
          </Link>
        </div>

        {/* Bottom Headline & Tagline */}
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-4 py-1.5 bg-teal-500 text-white backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-teal-300/40 shadow-lg">
            ✨ Creative Digital Workshop
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
            "Rancang, Buat, dan Hidupkan Karyamu dengan Kode!"
          </h2>
          <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-medium drop-shadow">
            Platform koding visual adaptif anak SD kelas 1–6. Selamat datang kembali di panggung kreasi digitalmu!
          </p>
        </div>
      </div>

      {/* Right Side: Full-Screen Form Panel (100% Width Edge-to-Edge for Android & Desktop) */}
      <div className="w-full min-h-screen bg-white p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between">
        {/* Mobile Header Logo */}
        <div className="flex items-center justify-between lg:hidden mb-6 pt-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-md">
              🚀
            </div>
            <span className="font-heading text-2xl font-bold text-slate-900">Blokuma</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto">
          <div className="text-left mb-8">
            <span className="text-3xl mb-2 block lg:hidden">👋</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Masuk ke Blokuma
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Masuk dengan akun terdaftar untuk melanjutkan petualangan kodingmu.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold rounded-2xl text-center shadow-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                Email Pengguna
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kiko@blokuma.id"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold text-base rounded-2xl shadow-xl shadow-teal-200 transition transform active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Masuk ke Akun Sekarang'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link to="/register" className="text-teal-600 font-bold hover:underline">
              Daftar Akun Baru
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 mt-8 pt-4 border-t border-slate-100">
          © 2026 Blokuma Platform. Child-Safe & Adaptive Learning.
        </div>
      </div>
    </div>
  );
}
