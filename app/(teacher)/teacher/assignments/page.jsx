import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherAssignmentsPage() {
  const [activeTab, setActiveTab] = useState('Semua');

  const assignments = [
    {
      id: 'asg-1',
      title: 'Tantangan 1: Labirin Robot Kiko',
      level: 'Kelas 4A & 4B',
      concept: 'Looping & Percabangan Bergerak',
      deadline: '10 Oktober 2026',
      submitted: 28,
      total: 32,
      icon: '🤖',
      status: 'Sedang Berlangsung',
      color: 'teal',
    },
    {
      id: 'asg-2',
      title: 'Tantangan 2: Kartu Ucapan Hari Guru Bersuara',
      level: 'Kelas 4A',
      concept: 'Event Klik & Rekaman Suara',
      deadline: '15 Oktober 2026',
      submitted: 14,
      total: 32,
      icon: '🎨',
      status: 'Baru Dibuka',
      color: 'amber',
    },
    {
      id: 'asg-3',
      title: 'Tantangan Mini: Kuis Matematika Balok Cepat',
      level: 'Kelas 4B',
      concept: 'Variabel Skor & Timer 30 Detik',
      deadline: '5 Oktober 2026',
      submitted: 32,
      total: 32,
      icon: '🧮',
      status: 'Selesai & Dinilai',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 mb-2">
              <span>🎯</span> Misi & Tantangan Kelas
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Kelola Tugas Koding Siswa
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Buat proyek tantangan koding berbatas waktu dengan evaluasi otomatis blok visual.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <Link
              to="/teacher"
              className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
            >
              ← Kembali ke Hub Guru
            </Link>
            <button className="toy-btn-teal px-4 py-2 font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5">
              <span>➕</span> Buat Tantangan Baru
            </button>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((asg) => {
            const percent = Math.round((asg.submitted / asg.total) * 100);
            return (
              <div
                key={asg.id}
                className="card-chunky bg-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0">
                    {asg.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading font-bold text-slate-900 text-lg">{asg.title}</h3>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${
                          asg.status === 'Selesai & Dinilai'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : asg.status === 'Baru Dibuka'
                            ? 'bg-sky-50 text-sky-800 border-sky-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {asg.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                      <span className="font-bold text-slate-700">{asg.level}</span>
                      <span>•</span>
                      <span>Konsep: <strong className="text-teal-700">{asg.concept}</strong></span>
                      <span>•</span>
                      <span>Tenggat: {asg.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Submission meter and action */}
                <div className="flex items-center gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="w-36 text-right">
                    <div className="text-xs text-slate-500 font-bold mb-1">
                      Kumpul: {asg.submitted} / {asg.total} ({percent}%)
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition shrink-0">
                    Periksa Hasil ➔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

