import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function LearnPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Materi & Misi Belajar</h1>
        <p className="text-slate-600 text-sm mb-8">Pilih topik koding yang ingin kamu kuasai hari ini!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <span className="text-3xl mb-2 block">🡆</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Sequence (Urutan Langkah)</h3>
            <p className="text-xs text-slate-500 mb-4">Menyusun perintah komputer satu per satu agar bekerja dengan tepat.</p>
            <Link to="/app/learn/l1" className="inline-block px-4 py-2 bg-teal-500 text-white font-bold text-xs rounded-xl">
              Mulai Misi
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <span className="text-3xl mb-2 block">🔁</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Loops (Perulangan)</h3>
            <p className="text-xs text-slate-500 mb-4">Mengulang perintah yang sama tanpa mengetik ulang berkali-kali.</p>
            <Link to="/app/learn/l2" className="inline-block px-4 py-2 bg-teal-500 text-white font-bold text-xs rounded-xl">
              Mulai Misi
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
