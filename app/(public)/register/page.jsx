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
    <div className="h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side: Animated Interactive Kiko Stage for Elementary Students (No Scroll) */}
      <div className="hidden lg:block w-full h-full overflow-hidden">
        <AnimatedRegisterHero />
      </div>

      {/* Right Side: Full-Screen Form Panel */}
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

        {/* Main Content wrapper to keep it centered */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto bg-white p-5 sm:p-7 md:p-8 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm shrink-0 my-4 lg:my-0">
            <div className="text-left mb-4 sm:mb-5">
              <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                Buat Akun Petualang Baru 🚀
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 mt-1 font-medium">
                Pilih peranmu dan siapkan profil koding seru bareng Robot Kiko!
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-rose-50 border-2 border-rose-300 text-rose-700 text-[11px] sm:text-xs md:text-sm font-bold rounded-xl text-center shadow-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">Pilih Peranmu:</label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-bold rounded-xl border-2 transition ${
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
                    className={`py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-bold rounded-xl border-2 transition ${
                      role === 'parent'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    👨‍👩‍👧 Ortu
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-bold rounded-xl border-2 transition ${
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
                <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">Nama Lengkapmu</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Kiko Pratama"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">Email</label>
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
                <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">Kata Sandi</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition shadow-sm font-medium"
                  required
                />
              </div>

              {role === 'student' && (
                <div>
                  <label className="block text-[11px] sm:text-xs md:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">Jenjang Kelas SD</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition shadow-sm bg-white cursor-pointer font-medium"
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
                className="toy-btn-teal w-full py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-xl shadow-toyTeal flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4"
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

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 text-center text-[11px] sm:text-xs md:text-sm text-slate-600 font-medium">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-teal-700 font-bold hover:underline">
                Masuk ke Sini
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] sm:text-xs text-slate-400 mt-2 sm:mt-4 pb-2 sm:pb-0 shrink-0">
          © 2026 Blokuma Platform. Belajar Koding Seru Anak SD.
        </div>
      </div>
    </div>
  );
}
