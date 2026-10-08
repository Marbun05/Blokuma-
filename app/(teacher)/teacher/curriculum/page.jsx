import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherCurriculumPage() {
  const phases = [
    {
      phase: 'Fase A (Kelas 1–2 SD)',
      badge: 'Visual Audio & Simbol',
      color: 'border-amber-300 bg-amber-50/50',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: '🌱',
      description:
        'Pendekatan tanpa teks panjang. Fokus pada ikon visual, instruksi suara, dan pengurutan langkah sederhana.',
      competencies: [
        'Urutan Langkah Logis (Sequence)',
        'Perintah Gerak Dasar & Putaran',
        'Penyebab & Akibat (Event: Saat Tombol Ditekan)',
        'Pengenalan Karakter & Cerita Bergambar',
      ],
      output: 'Animasi hewan bergerak & kartu salam bersuara',
    },
    {
      phase: 'Fase B (Kelas 3–4 SD)',
      badge: 'Teka-Teki & Pola Logika',
      color: 'border-teal-300 bg-teal-50/50',
      tagColor: 'bg-teal-100 text-teal-800 border-teal-300',
      icon: '🧩',
      description:
        'Pengenalan logika pemrograman fundamental menggunakan balok warna-warni berlabel teks ramah anak.',
      competencies: [
        'Perulangan Efisien (Loops / Ulangi N Kali)',
        'Pengambilan Keputusan (Kondisional Jika - Maka)',
        'Koordinat Gerak Sederhana (X dan Y)',
        'Dekomposisi Masalah Menjadi Bagian Kecil',
      ],
      output: 'Game labirin rintangan & cerita interaktif bercabang',
    },
    {
      phase: 'Fase C (Kelas 5–6 SD)',
      badge: 'Game Logic & Intip Kode Nyata',
      color: 'border-purple-300 bg-purple-50/50',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: '🚀',
      description:
        'Membangun logika kompleks tingkat lanjut serta jembatan awal menuju bahasa teks (JavaScript / Python).',
      competencies: [
        'Penyimpanan Nilai (Variabel & Skor Game)',
        'Logika Lanjutan (Operator AND / OR)',
        'Fungsi Kustom / Blok Mandiri',
        'Preview Sinkronisasi Kode Nyata (JavaScript)',
      ],
      output: 'Game arkade multi-level dengan sistem gravitasi & skor',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-300 mb-2">
              <span>📚</span> Peta Kurikulum Koding Terstandar
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Alur Pembelajaran Koding Adaptif SD
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Dirancang selaras dengan Kurikulum Merdeka (Capaian Pembelajaran Berpikir Komputasional) & CSTA K-12.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <Link
              to="/teacher"
              className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
            >
              ← Kembali ke Hub Guru
            </Link>
            <button className="px-4 py-2 bg-white text-teal-700 font-bold text-xs rounded-xl border-2 border-teal-500 hover:bg-teal-50 transition flex items-center gap-1.5 shadow-sm">
              <span>📥</span> Unduh Modul Ajar (PDF)
            </button>
          </div>
        </div>

        {/* 3 Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((p) => (
            <div
              key={p.phase}
              className={`card-chunky rounded-2xl p-6 flex flex-col justify-between border-2 ${p.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{p.icon}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${p.tagColor}`}>
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">{p.phase}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Capaian Kompetensi:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {p.competencies.map((comp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">✓</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 bg-white/60 p-3 rounded-xl">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Hasil Karya Akhir:</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">{p.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

