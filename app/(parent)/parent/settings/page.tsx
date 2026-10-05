'use client';

export default function ParentSettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 max-w-4xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Pengaturan Orang Tua</h1>
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <p className="text-xs text-slate-600">Atur notifikasi ringkasan belajar mingguan via email.</p>
      </div>
    </div>
  );
}
