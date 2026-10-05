'use client';

import { StudentSidebar } from '../../../../components/navigation/StudentSidebar';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Pengaturan Akun Siswa</h1>
        <p className="text-slate-600 text-sm mb-8">Atur profil dan preferensi kodingmu.</p>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nickname</label>
            <input type="text" defaultValue="Kiko" className="w-full p-2.5 border rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
            <input type="text" defaultValue="Kelas 4 SD" disabled className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" />
          </div>
        </div>
      </main>
    </div>
  );
}
