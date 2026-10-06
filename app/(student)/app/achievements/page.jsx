import React from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Pencapaian & Lencana</h1>
        <p className="text-slate-600 text-sm mb-8">Kumpulkan badge berharga dari setiap milestone kodingmu!</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center">
            <span className="text-5xl block mb-2">🚀</span>
            <h3 className="font-heading font-bold text-slate-900">First Code</h3>
            <p className="text-xs text-slate-500 mt-1">Menjalankan blok kode pertama.</p>
            <span className="inline-block mt-3 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              ✓ Terbuka
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center opacity-60">
            <span className="text-5xl block mb-2">🔁</span>
            <h3 className="font-heading font-bold text-slate-900">Loop Master</h3>
            <p className="text-xs text-slate-500 mt-1">Gunakan loop 10 kali.</p>
            <span className="inline-block mt-3 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
              🔒 Terkunci
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
