import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="font-heading text-2xl font-bold text-white">Blokuma</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Platform edukasi coding visual adaptif untuk anak SD usia 6–12 tahun. Rancang, buat, dan hidupkan karyamu!
          </p>
        </div>

        <div>
          <h4 className="font-heading text-white text-lg font-semibold mb-3">Produk</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/playground" className="hover:text-teal-400">Playground Visual</Link></li>
            <li><Link to="/app/adventure" className="hover:text-teal-400">Peta Petualangan</Link></li>
            <li><Link to="/app/gallery" className="hover:text-teal-400">Galeri Karya Anak</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white text-lg font-semibold mb-3">Akses Peran</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/dashboard" className="hover:text-teal-400">Dashboard Siswa</Link></li>
            <li><Link to="/parent" className="hover:text-teal-400">Dashboard Orang Tua</Link></li>
            <li><Link to="/teacher" className="hover:text-teal-400">Dashboard Guru</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white text-lg font-semibold mb-3">Keamanan & Privasi</h4>
          <p className="text-xs text-slate-400 mb-4">
            Blokuma memprioritaskan privasi anak tanpa pengumpulan data sensitif.
          </p>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-teal-900/60 text-teal-300 rounded-full border border-teal-700">
            ✓ Child Safe Guaranteed
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © 2026 Blokuma Edtech Platform. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
