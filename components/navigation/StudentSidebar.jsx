import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Puzzle, Gamepad2, Trophy, Image as ImageIcon, BarChart3, Settings, LogOut, ChevronUp } from 'lucide-react';
import { useAuthStore } from '../../store/auth/use-auth-store.js';

const menuItems = [
  { name: 'Beranda', href: '/app/dashboard', icon: <Home className="w-5 h-5" /> },
  { name: 'Petualangan', href: '/app/adventure', icon: <Map className="w-5 h-5" /> },
  { name: 'Playground', href: '/app/playground', icon: <Puzzle className="w-5 h-5" /> },
  { name: 'Projects', href: '/app/projects', icon: <Gamepad2 className="w-5 h-5" /> },
  { name: 'Achievements', href: '/app/achievements', icon: <Trophy className="w-5 h-5" /> },
  { name: 'Galeri', href: '/app/gallery', icon: <ImageIcon className="w-5 h-5" /> },
  { name: 'Progress', href: '/app/progress', icon: <BarChart3 className="w-5 h-5" /> },
];

export function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [currentGrade, setCurrentGrade] = useState('Kelas 4 SD');
  const [currentSubtheme, setCurrentSubtheme] = useState('Dunia Blok & Logika');
  const [studentNickname, setStudentNickname] = useState('Kiko');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Helper untuk menentukan subtema materi
  const getSubthemeByClass = (selectedClass) => {
    if (!selectedClass) return 'Dunia Blok & Logika';
    if (selectedClass.includes('1') || selectedClass.includes('2')) {
      return 'Dunia Ikon & Suara';
    } else if (selectedClass.includes('3') || selectedClass.includes('4')) {
      return 'Dunia Blok & Logika';
    } else if (selectedClass.includes('5') || selectedClass.includes('6')) {
      return 'Dunia Algoritma & Game';
    }
    return 'Dunia Blok & Logika';
  };

  // Fungsi memuat data profil dari localStorage & store
  const loadProfileData = () => {
    const savedClass = localStorage.getItem('student_class');
    const savedName = localStorage.getItem('student_nickname');

    if (savedClass) {
      setCurrentGrade(savedClass);
      setCurrentSubtheme(getSubthemeByClass(savedClass));
    }
    if (savedName) {
      setStudentNickname(savedName);
    } else if (user?.nickname) {
      setStudentNickname(user.nickname);
    }
  };

  useEffect(() => {
    loadProfileData();

    const handleProfileUpdate = () => {
      loadProfileData();
    };

    window.addEventListener('student_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
    };
  }, [user]);

  // Handle Outside Click untuk Popover Profil
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
      navigate('/login');
    }
  };

  const mobileNavItems = [
    { name: 'Beranda', href: '/app/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Playground', href: '/app/playground', icon: <Puzzle className="w-5 h-5" /> },
    { name: 'Projects', href: '/app/projects', icon: <Gamepad2 className="w-5 h-5" /> },
    { name: 'Progress', href: '/app/progress', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 min-h-screen relative shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b-2 border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center shadow-toyTeal border-b-2 border-teal-700">
              <Puzzle className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-heading text-xl font-bold text-slate-800 block leading-tight">Blokuma</span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 block mt-0.5">
                {currentGrade} • {currentSubtheme}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border-2 border-teal-300 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profil Card & Popover Menu Pengaturan/Logout */}
        <div className="relative" ref={profileMenuRef}>
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border-2 border-amber-300 rounded-2xl p-2 shadow-xl animate-fadeIn z-50">
              <Link
                to="/app/settings"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition"
              >
                <Settings className="w-4 h-4 text-teal-600" />
                <span>⚙️ Pengaturan Profil</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition text-left"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>🚪 Keluar (Logout)</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full bg-amber-50/90 hover:bg-amber-100/90 p-3.5 rounded-2xl border-2 border-amber-200 shadow-sm transition flex items-center justify-between text-left"
            title="Klik untuk opsi profil & keluar"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                <img
                  src="/images/Robot.webp"
                  alt="Avatar Robot Kiko"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/robot.webp";
                  }}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="overflow-hidden">
                <p className="font-heading font-bold text-slate-900 text-sm truncate">{studentNickname}</p>
                <p className="text-[11px] font-bold text-teal-700 flex items-center gap-1">
                  Arsitek Kode <Trophy className="w-3 h-3 text-amber-500" />
                </p>
              </div>
            </div>
            <ChevronUp className={`w-4 h-4 text-slate-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex justify-around items-center shadow-lg">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition ${
                isActive ? 'text-teal-600 font-bold' : 'text-slate-500 font-medium'
              }`}
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
