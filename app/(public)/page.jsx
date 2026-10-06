import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { Footer } from '../../components/navigation/Footer.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 to-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full font-bold text-xs uppercase tracking-wider mb-4 border border-amber-200 shadow-sm">
              ✨ Creative Digital Workshop
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Belajar Coding dengan Cara Membangun!
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Blokuma membantu anak SD kelas 1–6 mengubah ide menjadi game, animasi, cerita, musik, dan eksperimen interaktif. Anak berperan sebagai <strong className="text-teal-700">"Arsitek Kode"</strong>!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-teal-200 transition transform active:scale-95 flex items-center gap-2"
              >
                <span>🚀</span> Mulai Petualangan
              </Link>
              <a
                href="#demo"
                className="px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 font-bold text-lg rounded-2xl border border-slate-200 transition"
              >
                Lihat Cara Kerja
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-2xl relative">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-heading font-bold text-xs text-slate-400 ml-2">Panggung Arsitek Kode Kiko</span>
              </div>
              <div className="h-64 bg-slate-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-6xl animate-bounce mb-2">🧑‍🚀</div>
                <div className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md animate-pulse">
                  💬 "Hore! Kiko Bergerak 10 Langkah!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="py-16 bg-white border-y border-slate-200 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">Coba Blok Coding Interaktif (Tanpa Login)</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Susun blok sederhana di bawah ini untuk melihat bagaimana kode menggerakkan karakter!</p>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <p className="font-heading font-bold text-slate-700 text-sm">Kanvas Blok:</p>
              <div className="bg-teal-500 text-white font-bold p-3 rounded-xl shadow-sm text-sm flex items-center justify-between">
                <span>🡆 MAJU 10 LANGKAH</span>
              </div>
              <div className="bg-amber-400 text-slate-900 font-bold p-3 rounded-xl shadow-sm text-sm flex items-center justify-between">
                <span>🔁 ULANGI 3 KALI</span>
              </div>
              <div className="bg-sky-500 text-white font-bold p-3 rounded-xl shadow-sm text-sm flex items-center justify-between">
                <span>🎵 MAINkan SUARA POP</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center">
              <div className="text-5xl mb-3">🤖</div>
              <p className="font-heading font-bold text-teal-300">Robot Kiko Siap Bergerak!</p>
              <button
                onClick={() => alert('Hebat! Blokuma menjalankan instruksi visual secara langsung!')}
                className="mt-4 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow transition"
              >
                ▶ Jalankan Kode
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="adaptive" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Sistem Pembelajaran Adaptif Sesuai Usia Anak</h2>
          <p className="text-slate-600">Seluruh antarmuka berubah menyesuaikan kemampuan kognitif jenjang kelas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">🎨</span>
            <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full font-bold text-xs uppercase">Kelas 1–2</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Ikon & Suara</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Icon-first, tombol besar, voice command Web Speech API, audio storytelling, drag-and-drop intuitif.</p>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">🧩</span>
            <span className="px-3 py-1 bg-teal-200 text-teal-900 rounded-full font-bold text-xs uppercase">Kelas 3–4</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Blok & Logika</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Text-block sederhana, perulangan (loops), kondisi (if/else) dasar, penyelesaian masalah berurutan.</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 hover:shadow-lg transition">
            <span className="text-3xl mb-3 block">⚡</span>
            <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full font-bold text-xs uppercase">Kelas 5–6</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-2 mb-2">Dunia Algoritma & Game</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Variabel, skor, timer, game logic, dan fitur "Intip Kode Asli" (konversi ke JavaScript / Python real-time).</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-teal-600 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl font-bold mb-4">Siap Menjadi Arsitek Kode?</h2>
          <p className="text-teal-100 text-lg mb-8">Bergabunglah dengan ribuan anak lain yang telah merancang karya digital pertamanya di Blokuma!</p>
          <Link
            to="/register"
            className="px-10 py-5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xl rounded-2xl shadow-2xl transition transform active:scale-95 inline-block"
          >
            Mulai Petualangan Blokuma
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
