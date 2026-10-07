import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { supabase } from '../../../lib/supabase/client.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithSupabase, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // State Lupa Kata Sandi
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const userProfile = await loginWithSupabase(email, password);

      if (userProfile?.role === 'student') navigate('/app/dashboard');
      else if (userProfile?.role === 'parent') navigate('/parent');
      else if (userProfile?.role === 'teacher') navigate('/teacher');
      else navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.');
    }
  };

  // Fungsi Kirim Link Reset Password
  const handleForgotPassword = async () => {
    if (!email) {
      alert('Silakan isi Email Pengguna terlebih dahulu pada kolom email!');
      return;
    }

    setIsResetting(true);
    setResetMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      setIsResetting(false);

      if (error) {
        alert(`Gagal mengirim email reset: ${error.message}`);
      } else {
        setResetMessage('Link reset kata sandi telah dikirim ke email kamu! Cek kotak masuk atau spam.');
      }
    } catch (err) {
      setIsResetting(false);
      alert('Terjadi kesalahan saat menghubungkan ke server Supabase.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* Left Side: Photo Panel */}
      <div className="relative w-full h-full min-h-[260px] lg:min-h-screen hidden lg:flex flex-col justify-between p-8 xl:p-12 overflow-hidden bg-slate-950">
        <img
          src="/Anak.jpg"
          alt="Anak Belajar Coding Blokuma"
          className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition duration-1000"
        />

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-lg">
              🚀
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Blokuma
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-xl bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
          <span className="inline-block px-3.5 py-1 bg-teal-500 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
            ✨ Creative Digital Workshop
          </span>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            "Rancang, Buat, dan Hidupkan Karyamu dengan Kode!"
          </h2>
          <p className="text-xs lg:text-sm text-slate-200 leading-relaxed font-medium">
            Platform koding visual adaptif anak SD kelas 1–6. Selamat datang kembali di panggung kreasi digitalmu!
          </p>
        </div>
      </div>

      {/* Right Side: Form Panel */}
      <div className="w-full min-h-screen bg-white p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between">
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

          {resetMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold rounded-2xl text-center shadow-sm">
              {resetMessage}
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
                placeholder="kiko@gmail.com"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-700">
                  Password
                </label>
                {/* Tombol Lupa Kata Sandi */}
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isResetting}
                  className="text-xs text-teal-600 font-bold hover:underline"
                >
                  {isResetting ? 'Mengirim...' : 'Lupa kata sandi?'}
                </button>
              </div>
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

        <div className="text-center text-xs text-slate-400 mt-8 pt-4 border-t border-slate-100">
          © 2026 Blokuma Platform. Child-Safe & Adaptive Learning.
        </div>
      </div>
    </div>
  );
}