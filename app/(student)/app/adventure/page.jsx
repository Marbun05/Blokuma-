import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

const worlds = [
  {
    id: 1,
    title: 'Pulau 1: Desa Urutan',
    icon: '🏡',
    unlocked: true,
    status: 'Tuntas ⭐⭐⭐',
    statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-amber-300 bg-amber-50/70',
    desc: 'Langkah pertama Kiko! Pelajari urutan instruksi dasar agar robot bisa berjalan lurus.',
    tag: 'Dasar Sequence',
  },
  {
    id: 2,
    title: 'Pulau 2: Hutan Perulangan',
    icon: '🌲',
    unlocked: true,
    status: '📍 Sedang Aktif',
    statusColor: 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse',
    borderColor: 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40',
    desc: 'Bantu Kiko melewati rintangan pohon lebat menggunakan kekuatan balok Loop 3 Kali!',
    tag: 'Perulangan (Loop)',
  },
  {
    id: 3,
    title: 'Pulau 3: Gunung Kondisi',
    icon: '⛰️',
    unlocked: false,
    status: '🔒 Terkunci',
    statusColor: 'bg-slate-200 text-slate-700 border-slate-300',
    borderColor: 'border-slate-300 bg-slate-100/70 border-dashed',
    desc: 'Tantangan membuat keputusan cerdas (jika ada batu, maka melompat).',
    tag: 'Logika If / Else',
  },
  {
    id: 4,
    title: 'Pulau 4: Kota Variabel',
    icon: '🏙️',
    unlocked: false,
    status: '🔒 Terkunci',
    statusColor: 'bg-slate-200 text-slate-700 border-slate-300',
    borderColor: 'border-slate-300 bg-slate-100/70 border-dashed',
    desc: 'Kumpulkan koin emas dan simpan skor poin tertinggimu di brankas variabel.',
    tag: 'Skor & Penyimpanan Data',
  },
  {
    id: 5,
    title: 'Pulau 5: Arena Game Seru',
    icon: '🎮',
    unlocked: false,
    status: '🔒 Terkunci',
    statusColor: 'bg-slate-200 text-slate-700 border-slate-300',
    borderColor: 'border-slate-300 bg-slate-100/70 border-dashed',
    desc: 'Rakit mekanik game utuh dengan kontrol tombol panah keyboard!',
    tag: 'Mekanik Game Interaktif',
  },
  {
    id: 6,
    title: 'Pulau 6: Laboratorium Algoritma',
    icon: '🔬',
    unlocked: false,
    status: '🔒 Terkunci',
    statusColor: 'bg-slate-200 text-slate-700 border-slate-300',
    borderColor: 'border-slate-300 bg-slate-100/70 border-dashed',
    desc: 'Puncak petualangan arsitek kode: pecahkan teka-teki labirin tercanggih!',
    tag: 'Algoritma Master',
  },
];

export default function AdventurePage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            🗺️ Peta Petualangan Kiko
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            6 Pulau Petualangan Kode
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Taklukkan misi di tiap pulau untuk membuka gerbang pulau berikutnya bersama Robot Kiko!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worlds.map((w) => (
            <div
              key={w.id}
              className={`rounded-2xl p-6 border-2 transition duration-200 shadow-sm flex flex-col justify-between ${
                w.unlocked
                  ? `${w.borderColor} hover:-translate-y-1`
                  : 'bg-slate-100/80 border-slate-300 border-dashed opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-3xl shadow-sm">
                    {w.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${w.statusColor}`}
                  >
                    {w.status}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-1.5">
                  {w.tag}
                </span>

                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                  {w.desc}
                </p>
              </div>

              <div>
                {w.unlocked ? (
                  <Link
                    to={`/app/playground?island=${w.id}`}
                    className="toy-btn-teal w-full py-3 px-4 font-bold text-xs rounded-xl shadow-toyTeal flex items-center justify-center gap-1.5"
                  >
                    <span>Ayo Masuk Pulau!</span>
                    <span>➔</span>
                  </Link>
                ) : (
                  <div className="w-full py-2.5 px-4 bg-slate-200/80 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                    <span>🔒</span>
                    <span>Selesaikan pulau sebelumnya</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
