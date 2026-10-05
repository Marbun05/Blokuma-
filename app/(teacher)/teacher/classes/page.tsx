'use client';

export default function TeacherClassesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Kelola Kelas</h1>
      <p className="text-slate-600 text-sm mb-6">Buat kelas baru dan dapatkan kode gabung untuk siswa.</p>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-2">Coding SD Nusa Bangsa 4A</h3>
        <p className="text-xs text-slate-500">Kode Gabung Siswa: <strong className="text-teal-600">BLOKUMA4A</strong></p>
      </div>
    </div>
  );
}
