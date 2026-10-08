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
    <div className="min-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* Left Side: Animated Interactive Kiko Stage for Elementary Students (No Scroll) */}
      <div className="hidden lg:block w-full h-full max-h-screen overflow-hidden">
        <AnimatedRegisterHero />
      </div>

      {/* Right Side: Full-Screen Form Panel */}
      <div className="w-full min-h-screen bg-[#FBF9F5] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between">
        {/* Mobile Header Logo */}
        <div className="flex items-center justify-between lg:hidden mb-2 pt-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-toyTeal border-b-2 border-teal-700">
              🧱
            </div>
            <span className="font-heading text-xl font-bold text-slate-900">Blokuma</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto bg-white p-7 sm:p-8 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm">
          <div className="text-left mb-6">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Buat Akun Petualang Baru 🚀
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Pilih peranmu dan siapkan profil koding seru bareng Robot Kiko!
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs sm:text-sm font-bold rounded-xl text-center shadow-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Pilih Peranmu:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-3 text-xs sm:text-sm font-bold rounded-xl border-2 transition ${
                    role === 'student'
                      ? 'bg-teal-50 border-teal-500 text-teal-800 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  👦 Siswa
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`py-3 text-xs sm:text-sm font-bold rounded-xl border-2 transition ${
                    role === 'parent'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  👨‍👩‍👧 Orang Tua
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`py-3 text-xs sm:text-sm font-bold rounded-xl border-2 transition ${
                    role === 'teacher'
                      ? 'bg-purple-50 border-purple-500 text-purple-800 shadow-sm'
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
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
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
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                required
              />
            </div>

            {role === 'student' && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Jenjang Kelas SD</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-teal-500 transition shadow-sm bg-white cursor-pointer font-medium"
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
              className="toy-btn-teal w-full py-4 text-white font-bold text-base rounded-xl shadow-toyTeal flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : role === 'student' ? (
                'Yuk, Siapkan Profil & Avatar! ➔'
              ) : (
                'Daftar Akun Sekarang! 🚀'
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-teal-700 font-bold hover:underline">
              Masuk ke Sini
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
