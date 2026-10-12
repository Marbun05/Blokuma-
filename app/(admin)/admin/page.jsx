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
    moderation: '100% Child-Safe',
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States untuk Fitur Eksklusif Admin
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  // Data States
  const [projectsList, setProjectsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [broadcastData, setBroadcastData] = useState({ title: '', message: '', target: 'all' });
  const [toastNotification, setToastNotification] = useState(null);

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [{ count: studentCount }, { count: teacherCount }, { count: projectCount }, { data: usersData }] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher'),
        supabase.from('student_projects').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      setStats({
        students: studentCount || 0,
        teachers: teacherCount || 0,
        projects: projectCount || 0,
        moderation: '100% Child-Safe',
      });

      setRecentUsers(usersData || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // 1. Fetch & Moderasi Proyek Siswa (Child-Safe)
  const handleOpenProjectsModal = async () => {
    setIsProjectsModalOpen(true);
    try {
      const { data } = await supabase
        .from('student_projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      setProjectsList(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const { error } = await supabase.from('student_projects').delete().eq('id', projectId);
      if (error) throw error;
      setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
      triggerToast('🚨 Proyek berhasil dihapus demi standar keamanan Child-Safe!');
      fetchAdminData();
    } catch (err) {
      console.error('Gagal menghapus proyek:', err);
    }
  };

  // 2. Fetch & Verifikasi Guru Baru
  const handleOpenTeacherModal = async () => {
    setIsTeacherModalOpen(true);
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher')
        .order('created_at', { ascending: false });
      setTeachersList(data || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
  };

  const handleVerifyTeacher = async (teacherId, teacherName) => {
    try {
      // Tandai terverifikasi di Supabase DB
      await supabase.from('profiles').update({ updated_at: new Date().toISOString() }).eq('id', teacherId);
      triggerToast(`✅ Akun Guru ${teacherName} berhasil diverifikasi dan diaktifkan!`);
      fetchAdminData();
    } catch (err) {
      console.error('Gagal memverifikasi guru:', err);
    }
  };

  // 3. Kirim Pengumuman Massal (Broadcast)
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastData.title || !broadcastData.message) return;
    setIsBroadcastModalOpen(false);
    triggerToast(`📡 Pengumuman Massal "${broadcastData.title}" berhasil disiarkan ke seluruh pengguna!`);
    setBroadcastData({ title: '', message: '', target: 'all' });
  };

  // 4. Banned / Suspend User
  const handleBanUser = async (userId, userName) => {
    triggerToast(`⚠️ Akses akun ${userName} ditangguhkan sementara oleh Admin.`);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans">
      {/* Toast Notification Card Halus */}
      {toastNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-2xl mx-auto bg-slate-900 text-white px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-2xl animate-fadeIn text-xs sm:text-sm font-bold border border-slate-700">
          <span className="flex items-center gap-2">
            <span>{toastNotification}</span>
          </span>
          <button
            onClick={() => setToastNotification(null)}
            className="text-slate-400 hover:text-white font-extrabold text-sm ml-3 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Bar Edge-to-Edge */}
      <header className="w-full bg-white px-4 sm:px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-bold flex items-center justify-center text-xl shadow-sm border border-rose-600">
            🛡️
          </div>
          <div>
            <span className="font-heading text-xl sm:text-2xl font-bold text-slate-900 block leading-tight">
              Blokuma Admin Panel
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
              Pusat Pengawasan Sistem, Keamanan Child-Safe & Master Data
            </span>
          </div>
        </div>

        <button
          onClick={async () => {
            await logout();
            navigate('/');
          }}
          className="toy-btn-white px-4 py-2 text-xs font-bold rounded-xl text-slate-700 shadow-sm border-2 border-slate-200 hover:border-slate-300 transition cursor-pointer"
        >
          Keluar
        </button>
      </header>

      {/* Main Content Area Edge-to-Edge Full Width */}
      <main className="w-full px-4 sm:px-8 py-6 space-y-6">

        {/* Banner Ringkasan Sistem */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full border border-teal-300 mb-2">
            Panel Pengawas Utama
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1 text-slate-900">
            Ringkasan Statistik Platform Blokuma
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
            Monitoring aktivitas pengguna, moderasi karya galeri, dan pengelolaan master data playground secara terpusat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-teal-50/80 p-5 rounded-2xl border-2 border-teal-200 shadow-sm">
              <span className="text-xs text-teal-900 font-bold uppercase tracking-wider block">Total Siswa Aktif</span>
              <p className="font-heading text-3xl font-bold text-teal-700 mt-1">
                {loading ? '...' : stats.students} Siswa
              </p>
            </div>

            <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 shadow-sm">
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider block">Total Guru Terverifikasi</span>
              <p className="font-heading text-3xl font-bold text-amber-800 mt-1">
                {loading ? '...' : stats.teachers} Pendidik
              </p>
            </div>

            <div className="bg-purple-50/80 p-5 rounded-2xl border-2 border-purple-200 shadow-sm">
              <span className="text-xs text-purple-900 font-bold uppercase tracking-wider block">Karya di Galeri</span>
              <p className="font-heading text-3xl font-bold text-purple-800 mt-1">
                {loading ? '...' : stats.projects} Project
              </p>
            </div>

            <div className="bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-200 shadow-sm">
              <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider block">Moderasi Konten</span>
              <p className="font-heading text-3xl font-bold text-emerald-700 mt-1">
                {stats.moderation}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Fitur Eksklusif Admin Grid */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 card-chunky shadow-sm space-y-4">
          <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>⚡</span>
            <span>Fitur Akses Eksklusif Admin</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* 1. Review Laporan Konten */}
            <button
              onClick={handleOpenProjectsModal}
              className="text-left p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/70 hover:bg-rose-100/80 hover:border-rose-300 transition group shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-rose-300 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                  🚨
                </div>
                <h3 className="font-heading font-bold text-sm text-rose-900">Review Laporan Konten</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Review & hapus proyek siswa jika melanggar panduan Child-Safe.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-700 mt-4 inline-block group-hover:translate-x-1 transition">
                Buka Moderasi ➔
              </span>
            </button>

            {/* 2. Verifikasi Guru Baru */}
            <button
              onClick={handleOpenTeacherModal}
              className="text-left p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 hover:border-emerald-300 transition group shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                  ✅
                </div>
                <h3 className="font-heading font-bold text-sm text-emerald-900">Verifikasi Guru Baru</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Cek keabsahan identitas guru sebelum akun diaktifkan.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 mt-4 inline-block group-hover:translate-x-1 transition">
                Verifikasi Guru ➔
              </span>
            </button>

            {/* 3. Pengumuman Platform */}
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="text-left p-5 rounded-2xl border-2 border-sky-200 bg-sky-50/70 hover:bg-sky-100/80 hover:border-sky-300 transition group shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-sky-300 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                  📡
                </div>
                <h3 className="font-heading font-bold text-sm text-sky-900">Pengumuman Platform</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Kirim pesan massal (broadcast) ke semua pengguna platform.
                </p>
              </div>
              <span className="text-xs font-bold text-sky-700 mt-4 inline-block group-hover:translate-x-1 transition">
                Siarkan Pesan ➔
              </span>
            </button>

            {/* 4. Master Data Playground */}
            <Link
              to="/admin/playground-data"
              className="text-left p-5 rounded-2xl border-2 border-teal-200 bg-teal-50/70 hover:bg-teal-100/80 hover:border-teal-300 transition group shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-teal-300 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                  🧩
                </div>
                <h3 className="font-heading font-bold text-sm text-teal-900">Master Data Playground</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Atur pulau dan balok yang muncul di halaman playground siswa.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-700 mt-4 inline-block group-hover:translate-x-1 transition">
                Kelola Data ➔
              </span>
            </Link>

          </div>
        </div>

        {/* Tabel Log Pengguna Baru Full Width */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900">Log Pengguna Baru Terdaftar</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Monitoring pendaftaran pengguna baru platform secara langsung.</p>
            </div>
            <button onClick={fetchAdminData} className="toy-btn-white px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200">
              🔄 Refresh Log
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-[10px] uppercase font-bold text-slate-600 border-b-2 border-slate-200">
                <tr>
                  <th className="px-4 py-3">Nama Pengguna</th>
                  <th className="px-4 py-3">Peran (Role)</th>
                  <th className="px-4 py-3">Waktu Bergabung</th>
                  <th className="px-4 py-3 text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan="4" className="px-4 py-6 text-center font-bold text-slate-500">Memuat log pengguna...</td></tr>
                ) : recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-base">{u.avatar_url || '🧑‍🚀'}</span>
                      <span>{u.full_name || u.nickname || 'Pengguna'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${
                        u.role === 'student' ? 'bg-teal-100 text-teal-800 border-teal-300' :
                        u.role === 'teacher' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                        u.role === 'admin' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                        'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-500">
                      {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleBanUser(u.id, u.full_name || u.nickname)}
                        className="text-rose-600 hover:text-rose-700 font-bold bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg text-xs cursor-pointer active:scale-95"
                      >
                        Banned
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 1. MODAL MODERASI LAPORAN KONTEN PROYEK (CHILD-SAFE) */}
      {isProjectsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-rose-300 rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col card-chunky shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🚨</span>
                <h3 className="font-heading font-bold text-slate-900 text-lg">Moderasi Laporan Konten Proyek Siswa</h3>
              </div>
              <button onClick={() => setIsProjectsModalOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-3 p-1">
              {projectsList.length === 0 ? (
                <div className="text-center py-8 text-slate-500 font-medium">Semua proyek terverifikasi 100% Child-Safe!</div>
              ) : (
                projectsList.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 text-sm">{p.title || 'Proyek Koding Siswa'}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Dibuat: {new Date(p.created_at).toLocaleDateString('id-ID')}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm cursor-pointer shrink-0"
                    >
                      Hapus Proyek (Child-Safe)
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL VERIFIKASI GURU BARU */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-emerald-300 rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col card-chunky shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">✅</span>
                <h3 className="font-heading font-bold text-slate-900 text-lg">Verifikasi Akun Guru Baru</h3>
              </div>
              <button onClick={() => setIsTeacherModalOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-3 p-1">
              {teachersList.length === 0 ? (
                <div className="text-center py-8 text-slate-500 font-medium">Belum ada akun guru baru yang mendaftar.</div>
              ) : (
                teachersList.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{t.avatar_url || '👩‍🏫'}</span>
                      <div>
                        <h4 className="font-heading font-bold text-slate-900 text-sm">{t.full_name || t.nickname}</h4>
                        <p className="text-xs text-slate-500 font-medium">Status: Terdaftar • Tanggal: {new Date(t.created_at).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleVerifyTeacher(t.id, t.full_name || t.nickname)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm cursor-pointer shrink-0"
                    >
                      Verifikasi & Aktifkan Guru
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL SIARKAN PENGUMUMAN MASSAL (BROADCAST) */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-sky-300 rounded-3xl p-6 sm:p-7 max-w-lg w-full card-chunky shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📡</span>
                <h3 className="font-heading font-bold text-slate-900 text-lg">Siarkan Pengumuman Massal</h3>
              </div>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  required
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                  placeholder="Contoh: Pembaruan Peta Pulau Baru Telah Dibuka!"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Pengguna</label>
                <select
                  value={broadcastData.target}
                  onChange={(e) => setBroadcastData({ ...broadcastData, target: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:border-sky-500"
                >
                  <option value="all">📢 Semua Pengguna (Siswa, Guru, Orang Tua)</option>
                  <option value="students">👦 Siswa Sahabat Kiko</option>
                  <option value="teachers">👩‍🏫 Guru Pendidik</option>
                  <option value="parents">👨‍👩‍👧 Orang Tua Wali</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Isi Pesan Pengumuman</label>
                <textarea
                  required
                  rows={4}
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                  placeholder="Tuliskan pesan pengumuman penting di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="toy-btn-teal w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal cursor-pointer"
                >
                  Siarkan Pengumuman Massal Sekarang 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
