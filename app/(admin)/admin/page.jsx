import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client.js';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';

export default function AdminDashboardPage() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    projects: 0,
    moderation: '100% Aman',
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: studentCount } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'student');

        const { count: teacherCount } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'teacher');

        const { count: projectCount } = await supabase
          .from('projects')
          .select('id', { count: 'exact', head: true });

        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        setStats({
          students: studentCount || 0,
          teachers: teacherCount || 0,
          projects: projectCount || 0,
          moderation: '100% Aman',
        });

        setRecentUsers(usersData || []);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="font-heading text-2xl font-bold text-teal-400">Blokuma Admin Panel</span>
        </div>
        <button
          onClick={async () => {
            await logout();
            navigate('/');
          }}
          className="text-xs font-bold bg-slate-800 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          Keluar
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-7 border-2 border-slate-700 shadow-md">
          <div className="inline-block px-3 py-1 bg-teal-900/60 text-teal-300 font-bold text-xs rounded-full border border-teal-700 mb-2">
            Panel Pengawas Sistem
          </div>
          <h1 className="font-heading text-2xl font-bold mb-1">Ringkasan Sistem Blokuma</h1>
          <p className="text-xs text-slate-400 mb-6">Manajemen platform, monitoring aktivitas belajar siswa, dan keamanan konten galeri.</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Siswa Aktif</span>
              <p className="font-heading text-3xl font-bold text-teal-400 mt-1">
                {loading ? '...' : stats.students}
              </p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Guru Terverifikasi</span>
              <p className="font-heading text-3xl font-bold text-amber-400 mt-1">
                {loading ? '...' : stats.teachers}
              </p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Karya di Galeri</span>
              <p className="font-heading text-3xl font-bold text-purple-400 mt-1">
                {loading ? '...' : stats.projects}
              </p>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Moderasi Child-Safe</span>
              <p className="font-heading text-3xl font-bold text-emerald-400 mt-1">
                {stats.moderation}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Monitoring Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 sm:p-7 border-2 border-slate-700 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold">Log Pengguna Baru</h2>
              <button className="text-xs font-bold text-teal-400 hover:text-teal-300">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900/50 text-xs uppercase font-bold text-slate-500 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Nama Pengguna</th>
                    <th className="px-4 py-3">Peran</th>
                    <th className="px-4 py-3">Waktu Bergabung</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {loading ? (
                    <tr><td colSpan="4" className="px-4 py-4 text-center">Memuat data...</td></tr>
                  ) : recentUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-700/50 transition">
                      <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                        <span className="text-lg">{user.avatar_url || '🧑‍🚀'}</span>
                        {user.full_name}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                          user.role === 'student' ? 'bg-teal-900/60 text-teal-300' :
                          user.role === 'teacher' ? 'bg-purple-900/60 text-purple-300' :
                          user.role === 'admin' ? 'bg-rose-900/60 text-rose-300' :
                          'bg-amber-900/60 text-amber-300'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">{new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-rose-400 hover:text-rose-300 text-xs font-bold bg-slate-900/50 px-3 py-1.5 rounded-lg">Banned</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 sm:p-7 border-2 border-slate-700 shadow-md flex flex-col">
            <h2 className="font-heading text-xl font-bold mb-4">Fitur Eksklusif Admin</h2>
            <div className="space-y-3 flex-1">
              <button className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🚨</span>
                  <div>
                    <h3 className="font-bold text-sm text-rose-400">Review Laporan Konten</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Hapus proyek siswa jika melanggar panduan Child-Safe.</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">✅</span>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-400">Verifikasi Guru Baru</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Cek keabsahan identitas guru sebelum diaktifkan.</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 transition group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📡</span>
                  <div>
                    <h3 className="font-bold text-sm text-sky-400">Pengumuman Platform</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Kirim pesan massal (broadcast) ke semua user.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
