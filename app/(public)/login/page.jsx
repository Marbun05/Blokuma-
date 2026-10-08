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

        <div className="relative z-10 max-w-xl bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
          <span className="inline-block px-3.5 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
            🎈 Belajar Koding Ceria Anak SD
          </span>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            "Yuk, Lanjutkan Petualangan Kodingmu Bareng Robot Kiko!"
          </h2>
          <p className="text-xs lg:text-sm text-slate-200 leading-relaxed font-medium">
            Selamat datang kembali! Misi-misi seru di pulau petualangan sudah menunggumu untuk diselesaikan.
          </p>
        </div>
      </div>

      {/* Right Side: Form Panel */}
      <div className="w-full min-h-screen bg-[#FBF9F5] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between">
        <div className="flex items-center justify-between lg:hidden mb-6 pt-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-toyTeal border-b-2 border-teal-700">
              🧱
            </div>
            <span className="font-heading text-2xl font-bold text-slate-900">Blokuma</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto bg-white p-7 sm:p-8 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm">
          <div className="text-left mb-6">
            <span className="text-3xl mb-1 block">👋</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Halo Lagi, Sahabat Kiko!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Masukkan email dan kata sandimu untuk melanjutkan petualangan.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs sm:text-sm font-bold rounded-xl text-center shadow-sm">
              {errorMessage}
            </div>
          )}

          {resetMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold rounded-xl text-center shadow-sm">
              {resetMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                Email Terdaftar
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kiko@gmail.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-700">
                  Kata Sandi
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
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="toy-btn-teal w-full py-4 text-white font-bold text-base rounded-xl shadow-toyTeal flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Yuk, Masuk Petualangan! 🚀'
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Belum punya akun?{' '}
            <Link to="/register" className="text-teal-700 font-bold hover:underline">
              Daftar & Main Gratis Di Sini!
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