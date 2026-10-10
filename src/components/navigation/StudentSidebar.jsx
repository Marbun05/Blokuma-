import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLearningStore } from '../../store/learning/use-learning-store.js';

const menuItems = [
  { name: 'Beranda', href: '/app/dashboard', icon: '🏠' },
  { name: 'Petualangan', href: '/app/adventure', icon: '🗺️' },
  { name: 'Playground', href: '/app/playground', icon: '🧩' },
  { name: 'Projects', href: '/app/projects', icon: '🎮' },
  { name: 'Achievements', href: '/app/achievements', icon: '🏆' },
  { name: 'Galeri', href: '/app/gallery', icon: '🖼️' },
  { name: 'Progress', href: '/app/progress', icon: '📊' },
  { name: 'Pengaturan', href: '/app/settings', icon: '⚙️' },
];

export function StudentSidebar() {
  const location = useLocation();
  const { grade, getPhaseModeTitle } = useLearningStore();

  const mobileNavItems = [
    { name: 'Beranda', href: '/app/dashboard', icon: '🏠' },
    { name: 'Playground', href: '/app/playground', icon: '🧩' },
    { name: 'Projects', href: '/app/projects', icon: '🎮' },
    { name: 'Progress', href: '/app/progress', icon: '📊' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 min-h-screen">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow">
              🚀
            </div>
            <div>
              <span className="font-heading text-xl font-bold text-slate-800 block">Blokuma</span>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Kelas {grade} • {getPhaseModeTitle()}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm'
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

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧑‍🚀</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Kiko</p>
              <p className="text-xs text-slate-500">Arsitek Kode Level 6</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Android / Mobile Fixed Bottom Bar */}
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
