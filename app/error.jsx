'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4 text-center">
      <span className="text-6xl mb-4">🤖</span>
      <h2 className="font-heading text-2xl font-bold mb-2">Ups! Dunia kode sedang mengalami masalah.</h2>
      <p className="text-sm text-slate-500 mb-6">{error?.message || 'Terjadi kesalahan sistem.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-md transition"
      >
        Coba Lagi
      </button>
    </div>
  );
}
