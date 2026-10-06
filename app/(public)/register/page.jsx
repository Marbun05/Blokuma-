import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { AnimatedRegisterHero } from '../../../components/ui/AnimatedRegisterHero.jsx';

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
    <div className="h-screen max-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side: Animated Interactive Kiko Stage for Elementary Students (No Scroll) */}
      <div className="hidden lg:block w-full h-full max-h-screen overflow-hidden">
        <AnimatedRegisterHero />
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
              Buat Akun Baru
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Pilih peranmu dan ayo buat akun untuk mulai koding!
            </p>
          </div>

          {errorMessage && (
            <div className="mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center shadow-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Siapa Kamu?</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    role === 'student'
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm'
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
                      ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-sm'
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
                      ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  👩‍🏫 Guru
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkapmu</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Kiko Pratama"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm"
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
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kata Kunci / Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter ya!"
                minLength={6}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm"
                required
              />
            </div>

            {role === 'student' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kamu Kelas Berapa?</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition shadow-sm bg-white"
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
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-teal-200 transition transform active:scale-95 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : role === 'student' ? (
                'Siapkan Karaktermu! 🚀'
              ) : (
                'Daftar Akun Sekarang'
              )}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-teal-600 font-bold hover:underline">
              Masuk di Sini
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          © 2026 Blokuma Platform. Belajar Koding Seru Anak SD.
        </div>
      </div>
    </div>
  );
}
