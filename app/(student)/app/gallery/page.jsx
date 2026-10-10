import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 'hutan-ajaib-melodi',
      title: 'Hutan Ajaib Melodi',
      author: 'Rania Arsitek',
      grade: 'Kelas 2 SD',
      category: 'Musik Interaktif',
      likes: 24,
      icon: '🎵',
      gradient: 'from-emerald-100 to-teal-50',
      borderColor: 'border-emerald-300',
      badgeColor: 'text-emerald-800 border-emerald-300',
    },
    {
      id: 'kiko-baterai-emas',
      title: 'Kiko Mencari Baterai Emas',
      author: 'Bima Pratama',
      grade: 'Kelas 4 SD',
      category: 'Petualangan Labirin',
      likes: 42,
      icon: '🤖',
      gradient: 'from-sky-100 to-teal-50',
      borderColor: 'border-teal-300',
      badgeColor: 'text-teal-800 border-teal-300',
    },
    {
      id: 'balap-roket-galaksi',
      title: 'Balap Roket Galaksi',
      author: 'Alya Bintang',
      grade: 'Kelas 5 SD',
      category: 'Game Arcade',
      likes: 38,
      icon: '🚀',
      gradient: 'from-purple-100 to-indigo-50',
      borderColor: 'border-purple-300',
      badgeColor: 'text-purple-800 border-purple-300',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            🌟 Panggung Pameran Sahabat
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Galeri Karya Sahabat Blokuma
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Yuk, mainkan dan beri apresiasi untuk game dan animasi keren hasil karya teman-teman seluruh Indonesia!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-5 border-2 ${item.borderColor} card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className={`h-40 bg-gradient-to-b ${item.gradient} rounded-xl border border-slate-200 flex flex-col items-center justify-center text-5xl mb-4 relative overflow-hidden`}>
                  <span className="animate-bounce">{item.icon}</span>
                  <span className={`text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full border ${item.badgeColor} mt-2`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  Oleh: <strong className="text-teal-700">{item.author}</strong> • {item.grade}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                  <span>❤️</span> {item.likes} Suka
                </span>
                <Link
                  to={`/app/gallery/play/${item.id}`}
                  className="toy-btn-teal px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-toyTeal flex items-center gap-1"
                >
                  <span>Mainkan</span>
                  <span>🎮</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
