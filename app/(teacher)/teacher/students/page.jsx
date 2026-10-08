import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherStudentsPage() {
  const [filterClass, setFilterClass] = useState('Semua');
  const [search, setSearch] = useState('');

  const students = [
    {
      id: 'std-1',
      name: 'Kiko Pratama',
      grade: 'Kelas 4A',
      avatar: '🦊',
      progress: 90,
      xp: 1450,
      badge: 'Master Balok Labirin',
      lastActive: '10 menit lalu',
      status: 'Sedang Aktif',
    },
    {
      id: 'std-2',
      name: 'Nadia Putri',
      grade: 'Kelas 4A',
      avatar: '🐱',
      progress: 75,
      xp: 1120,
      badge: 'Kreator Animasi',
      lastActive: '1 jam lalu',
      status: 'Tuntas Bab 3',
    },
    {
      id: 'std-3',
      name: 'Rian Dewantara',
      grade: 'Kelas 4B',
      avatar: '🦁',
      progress: 60,
      xp: 880,
      badge: 'Penjelajah Loop',
      lastActive: 'Kemarin',
      status: 'Butuh Bimbingan',
    },
    {
      id: 'std-4',
      name: 'Siti Zahra',
      grade: 'Kelas 4B',
      avatar: '🐰',
      progress: 95,
      xp: 1600,
      badge: 'Programmer Cilik',
      lastActive: '5 menit lalu',
      status: 'Sedang Aktif',
    },
  ];

  const filtered = students.filter((s) => {
    const matchClass = filterClass === 'Semua' || s.grade.includes(filterClass);
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-300 mb-2">
              <span>👩‍🏫</span> Ruang Kelas Bu Maya
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Daftar Penjelajah Cilik (Siswa)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pantau perkembangan misi komputasi, keaktifan, dan portofolio coding setiap siswa.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="card-chunky bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 w-full sm:w-64"
            />
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Filter Rombel:</span>
            {['Semua', '4A', '4B'].map((cls) => (
              <button
                key={cls}
                onClick={() => setFilterClass(cls)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition ${
                  filterClass === cls
                    ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <div key={s.id} className="card-chunky bg-white p-5 rounded-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl">
                    {s.avatar}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                        {s.grade}
                      </span>
                      <span className="text-xs text-slate-500">{s.lastActive}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                    s.status === 'Sedang Aktif'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : s.status === 'Butuh Bimbingan'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-sky-50 text-sky-800 border-sky-300'
                  }`}
                >
                  {s.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Penyelesaian Kurikulum</span>
                  <span className="text-teal-600">{s.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>

              {/* Bottom Info & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-bold text-amber-600">⭐ {s.xp} XP</span>
                  <span>•</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {s.badge}
                  </span>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg border border-amber-200 transition"
                >
                  Beri Apresiasi ⭐
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

