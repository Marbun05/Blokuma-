import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { AnimatedLoginHero } from '../../../components/ui/AnimatedLoginHero.jsx';
import { supabase } from '../../../lib/supabase/client.js';

const DEMO_ACCOUNTS = [
  { label: '👦 Siswa (Kiko Pratama - Kelas 4 SD)', email: 'kiko@blokuma.id', password: 'Password123!' },
  { label: '👨‍👩‍👧 Orang Tua (Ayah Budi)', email: 'parent@blokuma.id', password: 'Password123!' },
  { label: '👩‍🏫 Guru (Bu Maya Pertiwi)', email: 'guru@blokuma.id', password: 'Password123!' },
  { label: '🛡️ Admin (Admin Blokuma)', email: 'admin@blokuma.id', password: 'Password123!' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithSupabase, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // State Lupa Kata Sandi
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);

  const handleSelectDemoAccount = (e) => {
    const selectedEmail = e.target.value;
    if (!selectedEmail) return;

    const acc = DEMO_ACCOUNTS.find((a) => a.email === selectedEmail);
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      setErrorMessage(null);
    }
  };

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
    <div className="h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side: Interactive Animated Portal Stage for Login */}
      <div className="hidden lg:block w-full h-full overflow-hidden">
        <AnimatedLoginHero />
      </div>

      {/* Right Side: Form Panel */}
      <div className="w-full h-screen bg-[#FBF9F5] p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto">
        {/* Mobile Header Logo */}
        <div className="flex items-center justify-between lg:hidden mb-4 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-lg sm:text-xl shadow-toyTeal border-b-2 border-teal-700">
              🧱
            </div>
            <span className="font-heading text-lg sm:text-xl font-bold text-slate-900">Blokuma</span>
          </Link>
        </div>

        {/* Main Content wrapper to keep it centered when there's space */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto bg-white p-5 sm:p-7 md:p-8 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm shrink-0 my-4 lg:my-0">
            <div className="text-left mb-4 sm:mb-5">
              <span className="text-2xl sm:text-3xl mb-1 block">👋</span>
              <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                Halo Lagi, Sahabat Kiko!
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 mt-1 font-medium">
                Masukkan email dan kata sandimu untuk melanjutkan petualangan.
              </p>
            </div>

            {/* Quick Demo Dropdown Selector */}
            <div className="mb-4 sm:mb-5 relative overflow-hidden bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-3 sm:p-4 rounded-2xl shadow-sm group hover:shadow-md transition duration-300">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-teal-100/50 rounded-full blur-xl group-hover:bg-teal-200/50 transition duration-300"></div>
              <label className="block text-[11px] sm:text-xs font-bold text-teal-800 mb-1.5 sm:mb-2 flex items-center gap-1.5 relative z-10">
                <span className="text-xs sm:text-sm">⚡</span>
                <span className="tracking-wide">Pilih Akun Demo Cepat</span>
              </label>
              <div className="relative z-10">
                <select
                  onChange={handleSelectDemoAccount}
                  defaultValue=""
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-teal-200 text-xs sm:text-sm font-bold bg-white text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-2 sm:focus:ring-4 focus:ring-teal-100 transition shadow-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>-- Pilih Peran Akun Demo --</option>
                  {DEMO_ACCOUNTS.map((acc) => (
                    <option key={acc.email} value={acc.email}>
                      {acc.label}
                    </option>
                  ))}
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 text-teal-600">
                  <svg className="fill-current h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-rose-50 border-2 border-rose-300 text-rose-700 text-[11px] sm:text-xs md:text-sm font-bold rounded-xl text-center shadow-sm">
                {errorMessage}
              </div>
            )}

            {resetMessage && (
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-[11px] sm:text-xs md:text-sm font-bold rounded-xl text-center shadow-sm">
                {resetMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">
                  Email Terdaftar
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kiko@blokuma.id"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-1.5">
                  <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700">
                    Kata Sandi
                  </label>
                  {/* Tombol Lupa Kata Sandi */}
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResetting}
                    className="text-[10px] sm:text-xs md:text-sm text-teal-600 font-bold hover:underline"
                  >
                    {isResetting ? 'Mengirim...' : 'Lupa kata sandi?'}
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="toy-btn-teal w-full py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-xl shadow-toyTeal flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Yuk, Masuk Petualangan! 🚀'
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 text-center text-[11px] sm:text-xs md:text-sm text-slate-600 font-medium">
              Belum punya akun?{' '}
              <Link to="/register" className="text-teal-700 font-bold hover:underline">
                Daftar & Main Gratis Di Sini!
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] sm:text-xs text-slate-400 mt-2 sm:mt-4 pb-2 sm:pb-0 shrink-0">
          © 2026 Blokuma Platform. Child-Safe & Adaptive Learning.
        </div>
      </div>
    </div>
  );
}
