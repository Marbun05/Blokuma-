'use client';

import Link from 'next/link';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar';

export default function ProjectDetailPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-slate-900 mb-2">Space Runner Kiko</h1>
          <p className="text-xs text-slate-500 mb-4">Dibuat oleh Kiko • Kelas 4</p>

          <div className="bg-slate-900 rounded-2xl h-64 flex flex-col items-center justify-center text-white mb-6">
            <span className="text-6xl mb-2">🚀</span>
            <p className="font-heading font-bold text-teal-300">Pratinjau Project Game</p>
          </div>

          <div className="flex gap-3">
            <Link href="/app/playground" className="px-5 py-2.5 bg-teal-500 text-white font-bold text-xs rounded-xl shadow">
              Buka & Edit Kode
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
