import React from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../../components/navigation/StudentSidebar.jsx';

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
            ✨ Mulai Karya Baru
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Pilih Jenis Karyamu Hari Ini
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Mau bikin game arcade seru, animasi kartun interaktif, atau instrumen musik ceria?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/app/playground"
            className="bg-teal-50/80 p-6 rounded-2xl border-2 border-teal-400 card-chunky hover:-translate-y-1.5 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-200 text-3xl flex items-center justify-center mb-4 shadow-sm border border-teal-300 group-hover:scale-110 transition transform">
                🎮
              </div>
              <span className="text-[10px] font-bold text-teal-900 bg-teal-200 px-2.5 py-0.5 rounded-full border border-teal-300 uppercase tracking-wide">
                Paling Seru
              </span>
              <h3 className="font-heading font-bold text-xl text-slate-900 mt-2 mb-1">
                Mini Game Aksi
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Rakit game rintangan luar angkasa dengan tombol lompat dan pengumpul skor koin.
              </p>
            </div>
            <span className="toy-btn-teal mt-6 py-2.5 px-4 text-xs font-bold rounded-xl text-center shadow-toyTeal block">
              Pilih Template Game ➔
            </span>
          </Link>

          <Link
            to="/app/playground"
            className="bg-amber-50/80 p-6 rounded-2xl border-2 border-amber-300 card-chunky hover:-translate-y-1.5 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-200 text-3xl flex items-center justify-center mb-4 shadow-sm border border-amber-300 group-hover:scale-110 transition transform">
                🎨
              </div>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-300 uppercase tracking-wide">
                Imajinatif
              </span>
              <h3 className="font-heading font-bold text-xl text-slate-900 mt-2 mb-1">
                Animasi & Cerita
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Buat Robot Kiko menari, berbicara dengan gelembung teks, dan bertualang di desa.
              </p>
            </div>
            <span className="toy-btn-amber mt-6 py-2.5 px-4 text-xs font-bold rounded-xl text-center shadow-toyAmber text-slate-900 block">
              Pilih Template Animasi ➔
            </span>
          </Link>

          <Link
            to="/app/playground"
            className="bg-purple-50/80 p-6 rounded-2xl border-2 border-purple-300 card-chunky hover:-translate-y-1.5 transition duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-200 text-3xl flex items-center justify-center mb-4 shadow-sm border border-purple-300 group-hover:scale-110 transition transform">
                🎵
              </div>
              <span className="text-[10px] font-bold text-purple-900 bg-purple-200 px-2.5 py-0.5 rounded-full border border-purple-300 uppercase tracking-wide">
                Melodi Asyik
              </span>
              <h3 className="font-heading font-bold text-xl text-slate-900 mt-2 mb-1">
                Musik Interaktif
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Rangkai nada tangga instrumen dan efek suara POP ceria saat tombol dipencet.
              </p>
            </div>
            <span className="bg-purple-600 hover:bg-purple-700 text-white mt-6 py-2.5 px-4 text-xs font-bold rounded-xl text-center shadow-toyPurple border-b-4 border-purple-800 block">
              Pilih Template Musik ➔
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
