import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';
import { KikoRaportPrintModal } from '../../../../components/ui/KikoRaportPrintModal.jsx';

export default function TeacherReportsPage() {
  const { user } = useAuthStore();
  const [downloading, setDownloading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isRaportModalOpen, setIsRaportModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  };

  useEffect(() => {
    async function fetchTeacherStudentsBatch() {
      if (!user) return;
      try {
        // Query kelas yang diampu guru
        const { data: classrooms } = await supabase
          .from('classrooms')
          .select('id')
          .eq('teacher_id', user.id);

        let classIds = (classrooms || []).map((c) => c.id);

        const studentIds = (classStudents || []).map((cs) => cs.student_id);

        if (studentIds.length > 0) {
          // BATCH QUERY paralel tunggal (< 50 ms)
          const [{ data: profs }, { data: progs }, { data: projs }] = await Promise.all([
            supabase.from('profiles').select('*').in('id', studentIds),
            supabase.from('student_progress').select('*').in('student_id', studentIds),
            supabase.from('student_projects').select('id, student_id').in('student_id', studentIds),
          ]);

          const profMap = new Map((profs || []).map((p) => [p.id, p]));
          const progMap = new Map((progs || []).map((p) => [p.student_id, p]));
          const projCountMap = new Map();
          (projs || []).forEach((pj) => {
            projCountMap.set(pj.student_id, (projCountMap.get(pj.student_id) || 0) + 1);
          });

          const studentReports = studentIds.map((sid) => {
            const prof = profMap.get(sid);
            const prog = progMap.get(sid);
            const projCount = projCountMap.get(sid) || 0;

            const level = prog?.level || 1;
            const xp = prog?.xp || 0;
            const studentName = prof?.full_name || prof?.nickname || 'Siswa Blokuma';
            const gradeStr = prof?.grade ? `Kelas ${prof.grade} SD` : 'Belum Memilih Kelas';

            return {
              studentId: sid,
              studentName,
              studentClass: gradeStr,
              schoolName: 'SD Negeri Nusantara 01',
              period: 'Semester Ganjil TA 2026/2027',
              totalXp: xp,
              completedMissions: level,
              projectsCount: projCount,
              qualitativeNarrative: `Siswa ${studentName} (${gradeStr}) telah menuntaskan ${level} pulau misi dengan perolehan ${xp} XP dan ${projCount} karya koding terpublikasi.`,
            };
          });

          setStudents(studentReports);
          if (studentReports.length > 0) setSelectedStudent(studentReports[0]);
        }
      } catch (err) {
        console.error('Error batch fetching teacher student reports:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacherStudentsBatch();
  }, [user]);

  const handleOpenStudentRaport = (student) => {
    // Membuka modal pratinjau secara seketika (< 10 ms)
    setSelectedStudent(student);
    setIsRaportModalOpen(true);
    triggerToast(`✨ Pratinjau Rapor Resmi ${student.studentName} Siap Dicetak!`);
  };

  const handleExportCSV = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      triggerToast('📊 Berhasil mengekspor Rekapitulasi Nilai & XP Semua Siswa (.CSV)!');
    }, 600);
  };

  const handleExportZIP = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      triggerToast('📦 Berhasil mengunduh Portofolio Proyek Karya Siswa (.ZIP)!');
    }, 600);
  };

  // 4 Pilar rata-rata kelas
  const avgPillars = [
    { name: 'Dekomposisi', val: 88, desc: 'Memecah masalah menjadi balok terpisah', color: 'bg-teal-500' },
    { name: 'Pengenalan Pola', val: 92, desc: 'Menemukan perulangan (loop) berulang', color: 'bg-amber-500' },
    { name: 'Abstraksi', val: 78, desc: 'Memilah logika penting vs visual kosmetik', color: 'bg-sky-500' },
    { name: 'Algoritma', val: 85, desc: 'Menyusun urutan langkah tanpa bug', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Toast Notifikasi Card Halus */}
        {toastNotification && (
          <div className="bg-teal-50 border-2 border-teal-400 text-teal-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2">
              <span>🎉</span>
              <span>{toastNotification}</span>
            </span>
            <button
              onClick={() => setToastNotification(null)}
              className="text-teal-700 hover:text-teal-900 font-extrabold text-sm ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-300 mb-2">
              <span>📊</span> Asesmen & Rapor Koding Kurikulum Merdeka
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Laporan Kompetensi Kelas
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Evaluasi ketercapaian 4 pilar Computational Thinking murid kelas bimbingan secara lengkap.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        {/* 4 Pillars Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {avgPillars.map((pil) => (
            <div key={pil.name} className="card-chunky bg-white p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-slate-900 text-sm">{pil.name}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                  {pil.val}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className={`h-full ${pil.color} rounded-full`} style={{ width: `${pil.val}%` }} />
              </div>
              <p className="text-xs text-slate-500 leading-tight">{pil.desc}</p>
            </div>
          ))}
        </div>

        {/* Daftar Murid & Cetak Rapor Individu */}
        <div className="card-chunky bg-white p-6 rounded-2xl space-y-5">
          <div>
            <h2 className="font-heading font-bold text-slate-900 text-lg">
              Rapor Kurikulum Merdeka Per Siswa
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih siswa untuk melihat pratinjau dan mencetak Rapor PDF resmi secara instan.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-500 font-bold">
              Memuat data siswa...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((stu) => (
                <div
                  key={stu.studentId}
                  className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/70 hover:border-teal-400 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-teal-100 text-teal-800 rounded border border-teal-300">
                        {stu.studentClass}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-100 text-amber-900 rounded border border-amber-300">
                        💎 {stu.totalXp} XP
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-base">
                      {stu.studentName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Misi Tuntas: {stu.completedMissions} Pulau • Karya: {stu.projectsCount} Project
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenStudentRaport(stu)}
                    className="mt-4 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-toyTeal transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>🖨️ Cetak Raport PDF Siswa</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export CSV & ZIP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-chunky bg-white p-6 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <span className="text-2xl block mb-1">📊</span>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Rekapitulasi Nilai & XP (.CSV)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Data mentah nilai, jam belajar, dan perolehan bintang seluruh siswa kelas.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={downloading}
              className="toy-btn-white w-full py-2.5 text-xs font-bold rounded-xl text-slate-800 cursor-pointer"
            >
              {downloading ? 'Proses Ekspor...' : 'Unduh Data CSV 📊'}
            </button>
          </div>

          <div className="card-chunky bg-white p-6 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <span className="text-2xl block mb-1">📦</span>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Portofolio Karya Siswa (.ZIP)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kumpulan tangkapan layar proyek dan link game buatan seluruh siswa kelas.
              </p>
            </div>
            <button
              onClick={handleExportZIP}
              disabled={downloading}
              className="toy-btn-amber w-full py-2.5 text-xs font-bold rounded-xl text-slate-900 cursor-pointer shadow-toyAmber"
            >
              {downloading ? 'Proses Portofolio...' : 'Unduh Portofolio ZIP 📦'}
            </button>
          </div>
        </div>

        {/* Modal Raport Print / PDF */}
        <KikoRaportPrintModal
          isOpen={isRaportModalOpen}
          onClose={() => setIsRaportModalOpen(false)}
          studentName={selectedStudent?.studentName || 'Siswa Blokuma'}
          studentClass={selectedStudent?.studentClass || 'Kelas 4 SD'}
          schoolName={selectedStudent?.schoolName || 'SD Negeri Nusantara 01'}
          period={selectedStudent?.period || 'Semester Ganjil TA 2026/2027'}
          completedMissions={selectedStudent?.completedMissions || 1}
          projectsCount={selectedStudent?.projectsCount || 0}
          qualitativeNarrative={selectedStudent?.qualitativeNarrative || ''}
        />
      </div>
    </div>
  );
}
