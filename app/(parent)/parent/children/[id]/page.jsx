import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../../../../lib/supabase/client.js';

export default function ParentChildDetailPage() {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChildDetail() {
      if (!id) return;
      try {
        const [{ data: prof }, { data: prog }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', id).single(),
          supabase.from('student_progress').select('*').eq('student_id', id).single(),
        ]);

        setChild(prof);
        setProgress(prog);
      } catch (err) {
        console.error('Error fetching child detail:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChildDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] p-8 flex items-center justify-center">
        <div className="text-slate-600 font-bold text-sm animate-pulse">Memuat laporan detail ananda...</div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 text-center">
          <p className="text-slate-600 font-bold mb-4">Data siswa tidak ditemukan.</p>
          <Link to="/parent/children" className="toy-btn-teal px-4 py-2 font-bold text-xs rounded-xl">
            ← Kembali ke Daftar Anak
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500">Ruang Pendampingan Ananda</span>
          <Link
            to="/parent/children"
            className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Daftar Anak
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full border border-teal-300 inline-block mb-3">
            Rapor Individual Siswa
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Laporan Detail: {child.full_name} {child.grade ? `(Kelas ${child.grade} SD)` : '(Belum Memilih Kelas)'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-700 font-bold mb-4">
            💎 Total XP: {progress?.xp || 0} XP • 🏆 Pulau Misi Tuntas: {progress?.level || 0} Pulau
          </p>
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {child.nickname || child.full_name} telah menuntaskan {progress?.level || 0} pulau misi dengan perolehan total {progress?.xp || 0} XP. Perkembangan pemecahan masalah dan logika koding terpantau terus berjalan secara konsisten!
          </div>
        </div>
      </div>
    </div>
  );
}
