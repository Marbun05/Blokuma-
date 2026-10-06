import React from 'react';
import { Link } from 'react-router-dom';

export default function ParentChildrenPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Daftar Anak Terhubung</h1>
      <p className="text-slate-600 text-sm mb-8">Kelola dan lihat perkembangan koding setiap anak Anda.</p>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🧑‍🚀</div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Kiko Pratama</h3>
            <p className="text-xs text-slate-500">Kelas 4 SD • Level 6 (1,240 XP)</p>
          </div>
        </div>
        <Link to="/parent/children/kiko" className="px-4 py-2 bg-teal-500 text-white font-bold text-xs rounded-xl">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
