import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Beranda', href: '/app/dashboard', icon: '🏠' },
  { name: 'Petualangan', href: '/app/adventure', icon: '🗺️' },
  { name: 'Belajar', href: '/app/learn', icon: '📚' },
  { name: 'Playground', href: '/app/playground', icon: '🧩' },
  { name: 'Projects', href: '/app/projects', icon: '🎮' },
  { name: 'Achievements', href: '/app/achievements', icon: '🏆' },
  { name: 'Galeri', href: '/app/gallery', icon: '🖼️' },
  { name: 'Progress', href: '/app/progress', icon: '📊' },
  { name: 'Pengaturan', href: '/app/settings', icon: '⚙️' },
];

export function StudentSidebar() {
  const location = useLocation();

  const [currentGrade, setCurrentGrade] = useState('Kelas 4 SD');
  const [currentSubtheme, setCurrentSubtheme] = useState('Dunia Blok & Logika');
  const [studentNickname, setStudentNickname] = useState('Kiko');

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

  // Fungsi memuat data profil dari localStorage
  const loadProfileData = () => {
    const savedClass = localStorage.getItem('student_class');
    const savedName = localStorage.getItem('student_nickname');

    if (savedClass) {
      setCurrentGrade(savedClass);
      setCurrentSubtheme(getSubthemeByClass(savedClass));
    }
    if (savedName) {
      setStudentNickname(savedName);
    }
  };

  useEffect(() => {
    // 1. Muat data saat pertama di-render
    loadProfileData();

    // 2. Pasang Listener Custom Event untuk menangkap simpanan dari halaman Pengaturan
    const handleProfileUpdate = () => {
      loadProfileData();
    };

    window.addEventListener('student_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
    };
  }, []);

  const mobileNavItems = [
    { name: 'Beranda', href: '/app/dashboard', icon: '🏠' },
    { name: 'Belajar', href: '/app/learn', icon: '📚' },
    { name: 'Playground', href: '/app/playground', icon: '🧩' },
    { name: 'Projects', href: '/app/projects', icon: '🎮' },
    { name: 'Progress', href: '/app/progress', icon: '📊' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 min-h-screen">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b-2 border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow-toyTeal border-b-2 border-teal-700">
              🧱
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

        <div className="bg-amber-50/90 p-3.5 rounded-2xl border-2 border-amber-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-2xl shadow-sm">
              🧑‍🚀
            </div>
            <div className="overflow-hidden">
              <p className="font-heading font-bold text-slate-900 text-sm truncate">{studentNickname}</p>
              <p className="text-[11px] font-bold text-teal-700">Arsitek Kode Lv. 6 🎖️</p>
            </div>
          </div>
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
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}