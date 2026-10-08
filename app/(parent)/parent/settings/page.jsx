import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ParentSettingsPage() {
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [screenLimit, setScreenLimit] = useState('45');
  const [soundEffects, setSoundEffects] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 mb-2">
              <span>⚙️</span> Ruang Kendali Orang Tua
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Pengaturan Akun & Batasan
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Atur pendampingan belajar, batas waktu layar sehat, dan pengingat mingguan anak.
            </p>
          </div>
          <Link
            to="/parent"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>

        {saved && (
          <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 px-4 py-3 rounded-2xl flex items-center gap-3 animate-fade-in font-medium text-sm">
            <span>🎉</span> Pengaturan pendampingan berhasil disimpan dengan aman!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Batas Waktu Layar Sehat */}
          <div className="card-chunky bg-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <h2 className="font-heading font-bold text-slate-900 text-lg">
                  Batas Durasi Bermain & Belajar Sehat
                </h2>
                <p className="text-xs text-slate-500">
                  Kiko akan memberikan jeda istirahat dan senam mata kecil saat batas tercapai.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { value: '30', label: '30 Menit / Hari', badge: 'Santai' },
                { value: '45', label: '45 Menit / Hari', badge: 'Direkomendasikan' },
                { value: '60', label: '60 Menit / Hari', badge: 'Maksimal Akhir Pekan' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setScreenLimit(opt.value)}
                  className={`p-4 rounded-xl text-left border-2 transition ${
                    screenLimit === opt.value
                      ? 'border-amber-500 bg-amber-50/80 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {opt.badge}
                    </span>
                    {screenLimit === opt.value && <span className="text-amber-600 font-bold text-xs">✓ Dipilih</span>}
                  </div>
                  <div className="font-heading font-bold text-slate-900 text-sm mt-1">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Notifikasi & Komunikasi */}
          <div className="card-chunky bg-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📬</span>
              <div>
                <h2 className="font-heading font-bold text-slate-900 text-lg">
                  Laporan & Notifikasi Ayah Bunda
                </h2>
                <p className="text-xs text-slate-500">
                  Tetap terinformasi tanpa perlu khawatir anak terganggu saat koding.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 divide-y divide-slate-100">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-800">Ringkasan Prestasi Mingguan via Email</div>
                  <div className="text-xs text-slate-500">
                    Kirim ringkasan logika komputasi dan proyek yang diselesaikan Kiko setiap Minggu sore.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    weeklyDigest ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      weeklyDigest ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-slate-800">Efek Suara Riang & Musik Latar</div>
                  <div className="text-xs text-slate-500">
                    Nyalakan audio interaktif saat balok berhasil terpasang di panggung playground.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEffects(!soundEffects)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    soundEffects ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      soundEffects ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="toy-btn-teal px-6 py-3 font-bold text-sm rounded-xl shadow-toyTeal flex items-center gap-2"
            >
              <span>💾</span> Simpan Preferensi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
