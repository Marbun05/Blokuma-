import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

const worlds = [
  { id: 1, title: 'World 1: Desa Urutan', icon: '🏡', unlocked: true, desc: 'Instruksi dasar sequence' },
  { id: 2, title: 'World 2: Hutan Perulangan', icon: '🌲', unlocked: true, desc: 'Loop dan repeating pattern' },
  { id: 3, title: 'World 3: Gunung Kondisi', icon: '⛰️', unlocked: false, desc: 'Kondisi if / else' },
  { id: 4, title: 'World 4: Kota Variabel', icon: '🏙️', unlocked: false, desc: 'Skor dan simpan data' },
  { id: 5, title: 'World 5: Arena Game', icon: '🎮', unlocked: false, desc: 'Mekanik game interaktif' },
  { id: 6, title: 'World 6: Laboratorium Algoritma', icon: '🔬', unlocked: false, desc: 'Algoritma kompleks' },
];

export default function AdventurePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Peta Petualangan Kode</h1>
        <p className="text-slate-600 text-sm mb-8">Selesaikan misi di tiap dunia untuk membuka gerbang selanjutnya!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worlds.map((w) => (
            <div
              key={w.id}
              className={`rounded-3xl p-6 border transition ${
                w.unlocked
                  ? 'bg-white border-teal-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-100 border-slate-200 opacity-60'
              }`}
            >
              <div className="text-4xl mb-3">{w.icon}</div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">{w.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{w.desc}</p>
              {w.unlocked ? (
                <Link
                  to="/app/learn"
                  className="inline-block px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Masuk Dunia
                </Link>
              ) : (
                <span className="inline-block px-3 py-1 bg-slate-200 text-slate-600 font-bold text-xs rounded-full">
                  🔒 Terkunci
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
