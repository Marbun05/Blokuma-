import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function ParentChildrenPage() {
  const { user } = useAuthStore();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChildren() {
      if (!user) return;
      try {
        const { data: relations } = await supabase
          .from('parent_students')
          .select('student_id')
          .eq('parent_id', user.id);

        if (relations && relations.length > 0) {
          const studentIds = relations.map(r => r.student_id);

          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .in('id', studentIds);

          const { data: progresses } = await supabase
            .from('student_progress')
            .select('*')
            .in('student_id', studentIds);

          const combined = profiles.map(profile => {
            const progress = progresses?.find(p => p.student_id === profile.id) || {};
            return { ...profile, ...progress };
          });

          setChildren(combined);
        }
      } catch (err) {
        console.error('Error fetching children:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchChildren();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            👨‍👩‍👧 Pendampingan Keluarga
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Daftar Ananda Terhubung
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Pantau karya digital dan proses belajar logika komputasional ananda tercinta.
          </p>
        </div>
        <Link
          to="/parent"
          className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10">Memuat data...</div>
        ) : children.length > 0 ? (
          children.map(child => (
            <div key={child.id} className="bg-white rounded-2xl p-6 border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border-2 border-teal-300 flex items-center justify-center text-3xl shadow-sm">
                  {child.avatar_url || '🧑‍🚀'}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">{child.full_name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Kelas {child.grade} SD • Level {child.level || 1} • Total XP: <strong className="text-teal-700">{child.xp || 0} XP</strong> 💎
                  </p>
                </div>
              </div>
              <Link
                to="/parent"
                className="toy-btn-teal px-5 py-2.5 text-white font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal flex items-center gap-1.5"
              >
                <span>Lihat Laporan Belajar</span>
                <span>➔</span>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500 font-medium">
            Belum ada anak yang terhubung.
          </div>
        )}
      </div>
    </div>
  );
}
