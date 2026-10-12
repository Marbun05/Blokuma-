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
          .from('student_projects')
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
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="w-full px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="font-heading text-2xl font-bold text-teal-600">Blokuma Admin Panel</span>
        </div>
        <button
          onClick={async () => {
            await logout();
            navigate('/');
          }}
          className="text-xs font-bold bg-slate-100 border border-slate-300 px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition"
        >
          Keluar
        </button>
      </header>

      <main className="w-full px-4 sm:px-6 md:px-8 pb-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
          <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200 mb-2">
            Panel Pengawas Sistem
          </div>
          <h1 className="font-heading text-2xl font-bold mb-1 text-slate-800">Ringkasan Sistem Blokuma</h1>
          <p className="text-xs text-slate-500 mb-6">Manajemen platform, monitoring aktivitas belajar siswa, dan keamanan konten galeri.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Siswa Aktif</span>
              <p className="font-heading text-3xl font-bold text-teal-600 mt-1">
                {loading ? '...' : stats.students}
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Guru Terverifikasi</span>
              <p className="font-heading text-3xl font-bold text-amber-500 mt-1">
                {loading ? '...' : stats.teachers}
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Karya di Galeri</span>
              <p className="font-heading text-3xl font-bold text-purple-600 mt-1">
                {loading ? '...' : stats.projects}
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Moderasi Child-Safe</span>
              <p className="font-heading text-3xl font-bold text-emerald-600 mt-1">
                {stats.moderation}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Monitoring Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-slate-800">Log Pengguna Baru</h2>
              <button className="text-xs font-bold text-teal-600 hover:text-teal-700">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Nama Pengguna</th>
                    <th className="px-4 py-3">Peran</th>
                    <th className="px-4 py-3">Waktu Bergabung</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr><td colSpan="4" className="px-4 py-4 text-center">Memuat data...</td></tr>
                  ) : recentUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                        <span className="text-lg">{user.avatar_url || '🧑‍🚀'}</span>
                        {user.full_name}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                          user.role === 'student' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                          user.role === 'teacher' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          user.role === 'admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-rose-600 hover:text-rose-700 text-xs font-bold bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">Banned</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col">
            <h2 className="font-heading text-xl font-bold mb-4 text-slate-800">Fitur Eksklusif Admin</h2>
            <div className="space-y-3 flex-1">
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition group shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🚨</span>
                  <div>
                    <h3 className="font-bold text-sm text-rose-600">Review Laporan Konten</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Hapus proyek siswa jika melanggar panduan Child-Safe.</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition group shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">✅</span>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-600">Verifikasi Guru Baru</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Cek keabsahan identitas guru sebelum diaktifkan.</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition group shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📡</span>
                  <div>
                    <h3 className="font-bold text-sm text-sky-600">Pengumuman Platform</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Kirim pesan massal (broadcast) ke semua user.</p>
                  </div>
                </div>
              </button>
              <Link to="/admin/playground-data" className="block w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition group shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🧩</span>
                  <div>
                    <h3 className="font-bold text-sm text-teal-600">Master Data Playground</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Atur pulau dan balok yang muncul di halaman playground siswa.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
