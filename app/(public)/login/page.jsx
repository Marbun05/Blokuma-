import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { AnimatedLoginHero } from '../../../components/ui/AnimatedLoginHero.jsx';

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

      if (userProfile.role === 'student') navigate('/app/dashboard');
      else if (userProfile.role === 'parent') navigate('/parent');
      else if (userProfile.role === 'teacher') navigate('/teacher');
      else navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <div className="h-screen max-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side: Interactive Animated Portal Stage for Login */}
      <div className="hidden lg:block w-full h-full max-h-screen overflow-hidden">
        <AnimatedLoginHero />
      </div>

      {/* Right Side: Compact Form Panel */}
      <div className="w-full h-full max-h-screen bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto lg:overflow-hidden">
        {/* Mobile Header Logo */}
        <div className="flex items-center justify-between lg:hidden mb-2 pt-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-lg shadow-md">
              🚀
            </div>
            <span className="font-heading text-xl font-bold text-slate-900">Blokuma</span>
          </Link>
        </div>

        <div className="max-w-sm w-full mx-auto my-auto py-2">
          {/* Desktop Logo & Title Header */}
          <div className="text-left mb-4">
            <Link to="/" className="hidden lg:flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-lg shadow-md">
                🚀
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
                Blokuma
              </span>
            </Link>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Masuk ke Blokuma
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Masuk dengan akun terdaftar untuk melanjutkan petualangan kodingmu.
            </p>
          </div>

          {/* Quick Demo Dropdown Selector */}
          <div className="mb-4 bg-teal-50 border border-teal-200 p-3 rounded-2xl">
            <label className="block text-xs font-bold text-teal-800 mb-1 flex items-center gap-1">
              <span>⚡</span>
              <span>Pilih Akun Demo Instan (Supabase Live DB):</span>
            </label>
            <select
              onChange={handleSelectDemoAccount}
              defaultValue=""
              className="w-full px-3 py-2 rounded-xl border border-teal-300 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="" disabled>-- Pilih Peran Akun Demo --</option>
              {DEMO_ACCOUNTS.map((acc) => (
                <option key={acc.email} value={acc.email}>
                  {acc.label}
                </option>
              ))}
            </select>
          </div>

          {errorMessage && (
            <div className="mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center shadow-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Pengguna
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kiko@blokuma.id"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-teal-200 transition transform active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Masuk ke Akun Sekarang'
              )}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
            Belum punya akun?{' '}
            <Link to="/register" className="text-teal-600 font-bold hover:underline">
              Daftar Akun Baru
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          © 2026 Blokuma Platform. Child-Safe & Adaptive Learning.
        </div>
      </div>
    </div>
  );
}
