'use client';

import Link from 'next/link';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar';

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Pilih Template Project</h1>
        <p className="text-slate-600 text-sm mb-8">Pilih jenis karya digital yang ingin kamu rancang hari ini.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/app/playground" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 transition">
            <span className="text-4xl block mb-2">🎮</span>
            <h3 className="font-heading font-bold text-slate-900">Mini Game</h3>
            <p className="text-xs text-slate-500 mt-1">Buat game seru dengan skor dan rintangan.</p>
          </Link>

          <Link href="/app/playground" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 transition">
            <span className="text-4xl block mb-2">🎨</span>
            <h3 className="font-heading font-bold text-slate-900">Animasi</h3>
            <p className="text-xs text-slate-500 mt-1">Hidupkan karakter dengan tarian dan percakapan.</p>
          </Link>

          <Link href="/app/playground" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 transition">
            <span className="text-4xl block mb-2">🎵</span>
            <h3 className="font-heading font-bold text-slate-900">Musik</h3>
            <p className="text-xs text-slate-500 mt-1">Rangkai melodi instrumen interaktif.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
