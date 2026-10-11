import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { supabase } from '../../../../lib/supabase/client';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Updated table name and query to match schema
        const { data, error } = await supabase
          .from('projects')
          .select(`
            id,
            title,
            category,
            likes_count,
            profiles:owner_id (
              full_name,
              nickname,
              grade
            )
          `)
          .eq('is_public', true)
          .order('likes_count', { ascending: false });

        if (error) throw error;

        // Map data to UI structure to remove hardcoded values dependency
        const formattedData = (data || []).map(project => {
          const isAnimation = project.category?.toLowerCase() === 'animasi';
          return {
            id: project.id,
            title: project.title,
            category: project.category || 'Game',
            likes: project.likes_count || 0,

            // Computed UI Properties based on category
            icon: isAnimation ? '🎥' : '🎮',
            gradient: isAnimation ? 'from-purple-50 to-fuchsia-100' : 'from-emerald-50 to-teal-100',
            border_color: isAnimation ? 'border-purple-200' : 'border-teal-200',
            badge_color: isAnimation ? 'border-purple-200 text-purple-700' : 'border-teal-200 text-teal-700',

            // Profile joins
            author_name: project.profiles?.nickname || project.profiles?.full_name || 'Tanpa Nama',
            author_grade: project.profiles?.grade ? `Kelas ${project.profiles.grade}` : 'Kelas -'
          };
        });

        setGalleryItems(formattedData);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
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

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat karya di galeri...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.length > 0 ? galleryItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border-2 ${item.border_color} card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className={`h-40 bg-gradient-to-b ${item.gradient} rounded-xl border border-slate-200 flex flex-col items-center justify-center text-5xl mb-4 relative overflow-hidden`}>
                    <span className="animate-bounce">{item.icon}</span>
                    <span className={`text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full border ${item.badge_color} mt-2`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    Oleh: <strong className="text-teal-700">{item.author_name}</strong> • {item.author_grade}
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
            )) : (
              <div className="col-span-1 md:col-span-3 text-center py-10 bg-white border-2 border-dashed border-slate-300 rounded-2xl">
                <span className="text-4xl">🎨</span>
                <p className="mt-2 text-slate-500 font-medium">Belum ada karya yang diterbitkan ke Galeri Publik.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
