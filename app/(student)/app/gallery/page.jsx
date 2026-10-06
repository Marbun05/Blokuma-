import React from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Galeri Karya Anak</h1>
        <p className="text-slate-600 text-sm mb-8">Eksplorasi karya game dan animasi kreatif buatan teman-teman Blokuma.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div className="h-40 bg-slate-900 rounded-2xl flex items-center justify-center text-4xl mb-3">
              🎵
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-base">Hutan Ajaib Musik</h3>
            <p className="text-xs text-slate-500 mb-3">Oleh: ArsitekKode9 • Kelas 2</p>
            <span className="text-xs font-bold text-rose-500">❤️ 15 Suka</span>
          </div>
        </div>
      </main>
    </div>
  );
}
