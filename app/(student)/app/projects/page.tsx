'use client';

import Link from 'next/link';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">Project Saya</h1>
            <p className="text-slate-600 text-sm">Kelola dan kembangkan seluruh karya koding buatanmu.</p>
          </div>
          <Link
            href="/app/projects/new"
            className="px-5 py-2.5 bg-teal-500 text-white font-bold text-sm rounded-xl shadow"
          >
            + Buat Project Baru
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Space Runner Kiko</h3>
            <p className="text-xs text-slate-500 mb-4">Game menghindari rintangan di luar angkasa.</p>
            <Link href="/app/playground" className="text-teal-600 font-bold text-xs hover:underline">
              Buka di Playground →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
