'use client';

import Link from 'next/link';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar';

export default function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-6 text-white mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Arsitek Kode Level 6
              </span>
              <h1 className="font-heading text-3xl font-bold mt-1">Halo, Kiko! 👋</h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">🔥 7 Hari</span>
              <p className="text-xs text-teal-100">Streak Belajar</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div><strong>XP Total:</strong> 1,240 XP</div>
            <div><strong>Misi Selesai:</strong> 12 Misi</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-slate-900">Lanjutkan Misi</h2>
            <span className="text-xs font-bold text-teal-600">3 / 8 Misi Selesai</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🤖</div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Petualangan Loop: Hutan Perulangan</h3>
                <p className="text-xs text-slate-500">Pelajari cara mengulang instruksi gerakan tanpa koding berulang.</p>
              </div>
            </div>
            <Link
              href="/app/learn/l2"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition"
            >
              Lanjutkan
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link href="/app/playground" className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-slate-900 hover:shadow-md transition">
            <span className="text-3xl block mb-2">🧩</span>
            <h3 className="font-heading font-bold">Buat Project</h3>
            <p className="text-xs text-slate-600">Buka visual coding playground.</p>
          </Link>

          <Link href="/app/adventure" className="bg-teal-50 border border-teal-200 p-5 rounded-2xl text-slate-900 hover:shadow-md transition">
            <span className="text-3xl block mb-2">🗺️</span>
            <h3 className="font-heading font-bold">Peta Petualangan</h3>
            <p className="text-xs text-slate-600">Jelajahi 6 dunia koding.</p>
          </Link>

          <Link href="/app/gallery" className="bg-purple-50 border border-purple-200 p-5 rounded-2xl text-slate-900 hover:shadow-md transition">
            <span className="text-3xl block mb-2">🖼️</span>
            <h3 className="font-heading font-bold">Galeri Karya</h3>
            <p className="text-xs text-slate-600">Lihat game buatan teman-teman.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
