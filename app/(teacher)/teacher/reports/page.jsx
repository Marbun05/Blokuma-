import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherReportsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = (type) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Berhasil mengunduh dokumen: ${type}!`);
    }, 1200);
  };

  const pillars = [
    { name: 'Dekomposisi', val: 88, desc: 'Memecah masalah menjadi balok terpisah', color: 'bg-teal-500' },
    { name: 'Pengenalan Pola', val: 92, desc: 'Menemukan perulangan (loop) berulang', color: 'bg-amber-500' },
    { name: 'Abstraksi', val: 78, desc: 'Memilah logika penting vs visual kosmetik', color: 'bg-sky-500' },
    { name: 'Algoritma', val: 85, desc: 'Menyusun urutan langkah tanpa bug', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-300 mb-2">
              <span>📊</span> Asesmen & Raport Koding
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Laporan Kompetensi Kelas
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Evaluasi ketercapaian 4 pilar Computational Thinking kelas 4A & 4B untuk pelaporan wali murid.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        {/* 4 Pillars Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pil) => (
            <div key={pil.name} className="card-chunky bg-white p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-slate-900 text-sm">{pil.name}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                  {pil.val}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className={`h-full ${pil.color} rounded-full`} style={{ width: `${pil.val}%` }} />
              </div>
              <p className="text-xs text-slate-500 leading-tight">{pil.desc}</p>
            </div>
          ))}
        </div>

        {/* Export Formats Card */}
        <div className="card-chunky bg-white p-6 rounded-2xl space-y-5">
          <div>
            <h2 className="font-heading font-bold text-slate-900 text-lg">
              Ekspor Dokumen Penilaian Kurikulum Merdeka
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Format siap cetak dengan deskripsi capaian kualitatif dan kuantitatif per siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">📑</span>
                <h3 className="font-heading font-bold text-slate-900 text-sm">
                  Format Raport Kurikulum Merdeka (PDF)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Lengkap dengan narasi capaian berpikir komputasional per siswa untuk buku raport sekolah.
                </p>
              </div>
              <button
                onClick={() => handleExport('Raport Kurikulum Merdeka (PDF)')}
                disabled={downloading}
                className="mt-4 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition"
              >
                {downloading ? 'Menyiapkan Dokumen...' : 'Unduh Raport PDF ➔'}
              </button>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">📊</span>
                <h3 className="font-heading font-bold text-slate-900 text-sm">
                  Rekapitulasi Nilai & XP (Excel / CSV)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Data tabular mentah: total jam koding, tantangan tuntas, dan perolehan bintang.
                </p>
              </div>
              <button
                onClick={() => handleExport('Rekapitulasi Nilai (Excel CSV)')}
                disabled={downloading}
                className="mt-4 w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border-2 border-slate-300 transition"
              >
                Unduh Data CSV ➔
              </button>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">📦</span>
                <h3 className="font-heading font-bold text-slate-900 text-sm">
                  Portofolio Proyek Siswa (ZIP)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Tangkapan layar proyek dan link game koding buatan siswa kelas untuk pameran kelas.
                </p>
              </div>
              <button
                onClick={() => handleExport('Portofolio Karya Siswa (ZIP)')}
                disabled={downloading}
                className="mt-4 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition"
              >
                Unduh Portofolio ZIP ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

