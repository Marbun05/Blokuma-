import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="text-2xl">🧱</span>
            <span className="font-heading text-2xl font-bold text-white">Blokuma</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Dunia kreasi coding balok interaktif untuk anak SD kelas 1–6. Belajar logika sambil bikin game, cerita kartun, dan musik seru!
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
          <h4 className="font-heading text-white text-base font-bold mb-3 flex items-center gap-1.5">
            <span>🛡️</span> Keamanan Ramah Anak
          </h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed font-medium">
            Dirancang 100% aman tanpa iklan, tanpa pelacakan data sensitif, ramah eksplorasi anak.
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/40">
            <span>✓</span> 100% Child-Safe Guaranteed
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        © 2026 Blokuma Edtech Platform. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
