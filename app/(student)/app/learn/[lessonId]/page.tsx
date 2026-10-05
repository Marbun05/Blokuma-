'use client';

import Link from 'next/link';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar';

export default function LessonDetailPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-6">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full">
            Misi Sequence #1
          </span>
          <h1 className="font-heading text-3xl font-bold text-slate-900 mt-3 mb-4">
            Desa Urutan: Langkah Pertama Kiko
          </h1>

          <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl mb-6">
            <h3 className="font-heading font-bold text-teal-900 text-sm mb-1">📖 Cerita Misi:</h3>
            <p className="text-xs text-teal-800 leading-relaxed">
              Robot Kiko tersesat di Desa Urutan! Susun 2 blok MAJU di panggung koding untuk membantu Kiko mencapai gerbang desa.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/app/playground"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl shadow transition"
            >
              🚀 Buka Playground Misi
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
