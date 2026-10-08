import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🧱</span>
            <span className="font-heading text-2xl font-bold text-white">Blokuma</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dunia kreasi coding balok interaktif untuk anak SD kelas 1–6. Belajar logika sambil bikin game, cerita kartun, dan musik seru!
          </p>
        </div>

        <div>
          <h4 className="font-heading text-white text-base font-bold mb-3 flex items-center gap-1.5">
            <span>🎮</span> Zona Bermain
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/playground" className="hover:text-amber-400 transition">Kanvas Balok Visual</Link></li>
            <li><Link to="/app/adventure" className="hover:text-amber-400 transition">Peta 6 Pulau Petualangan</Link></li>
            <li><Link to="/app/gallery" className="hover:text-amber-400 transition">Pameran Karya Sahabat Kiko</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white text-base font-bold mb-3 flex items-center gap-1.5">
            <span>👥</span> Ruang Pengguna
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/dashboard" className="hover:text-teal-400 transition">Meja Belajar Siswa</Link></li>
            <li><Link to="/parent" className="hover:text-teal-400 transition">Laporan Ayah & Bunda</Link></li>
            <li><Link to="/teacher" className="hover:text-teal-400 transition">Ruang Guru & Kelas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white text-base font-bold mb-3 flex items-center gap-1.5">
            <span>🛡️</span> Keamanan Ramah Anak
          </h4>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Blokuma dirancang 100% aman tanpa iklan, tanpa pelacakan data sensitif, dan ramah eksplorasi anak.
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/40">
            <span>✓</span> 100% Child-Safe Guaranteed
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © 2026 Blokuma Edtech Platform. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
