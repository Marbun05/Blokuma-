'use client';

export default function TeacherStudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Daftar Siswa</h1>
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex justify-between text-xs font-bold border-b pb-2 mb-2">
          <span>NICKNAME</span>
          <span>KELAS</span>
          <span>PROGRESS</span>
        </div>
        <div className="flex justify-between text-xs py-2 border-b">
          <span>Kiko</span>
          <span>4A</span>
          <span className="text-teal-600 font-bold">90%</span>
        </div>
      </div>
    </div>
  );
}
