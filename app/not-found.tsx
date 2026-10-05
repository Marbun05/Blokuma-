import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4 text-center">
      <span className="text-6xl mb-4">🚀</span>
      <h2 className="font-heading text-3xl font-bold mb-2">Halaman Tidak Ditemukan!</h2>
      <p className="text-slate-600 mb-6">Mungkin Kiko tersesat di peta petualangan yang belum terbuka.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-md transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
