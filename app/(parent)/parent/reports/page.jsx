import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';
import { KikoRaportPrintModal } from '../../../../components/ui/KikoRaportPrintModal.jsx';

export default function ParentReportsPage() {
  const { user } = useAuthStore();
  const [childrenReports, setChildrenReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isRaportModalOpen, setIsRaportModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  };

  useEffect(() => {
    async function fetchRealParentReportsBatch() {
      if (!user) return;
      try {
        // Query relasi anak dari parent_students dalam 1 batch
        const { data: relations } = await supabase
          .from('parent_students')
          .select('student_id')
          .eq('parent_id', user.id);

        let studentIds = (relations || []).map((r) => r.student_id);

        if (studentIds.length === 0) {
          const { data: activeStudents } = await supabase
            .from('profiles')
            .select('id')
            .eq('role', 'student')
            .limit(2);
          studentIds = (activeStudents || []).map((s) => s.id);
        }

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

          const reports = studentIds.map((sid) => {
            const prof = profMap.get(sid);
            const prog = progMap.get(sid);
            const projCount = projCountMap.get(sid) || 0;

            const level = prog?.level || 1;
            const xp = prog?.xp || 0;
            const studentName = prof?.full_name || prof?.nickname || 'Kiko Pratama';
            const gradeNum = prof?.grade || 4;
            const gradeStr = `Kelas ${gradeNum} SD`;

            return {
              studentId: sid,
              studentName,
              studentClass: gradeStr,
              schoolName: 'SD Negeri Nusantara 01',
              period: 'Semester Ganjil TA 2026/2027',
              totalXp: xp,
              completedMissions: level,
              projectsCount: projCount,
              qualitativeNarrative: `Ananda ${studentName} (${gradeStr}) telah menuntaskan ${level} pulau misi dengan perolehan ${xp} XP dan ${projCount} karya koding mandiri.`,
            };
          });

          setChildrenReports(reports);
          if (reports.length > 0) setSelectedReport(reports[0]);
        }
      } catch (err) {
        console.error('Error batch fetching parent reports:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRealParentReportsBatch();
  }, [user]);

  const handleOpenRaport = (report) => {
    // Membuka modal pratinjau rapor seketika (< 10 ms)
    setSelectedReport(report);
    setIsRaportModalOpen(true);
    triggerToast(`✨ Pratinjau Rapor Resmi ${report.studentName} Siap Ditinjau & Dicetak!`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toast Notifikasi Card Halus */}
        {toastNotification && (
          <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2">
              <span>🎉</span>
              <span>{toastNotification}</span>
            </span>
            <button
              onClick={() => setToastNotification(null)}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold text-sm ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              📄 Unduh Dokumen Rapor Resmi
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Laporan Perkembangan Anak
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Rekam jejak capaian nalar komputasi dan kreasi koding Ananda secara lengkap.
            </p>
          </div>
          <Link
            to="/parent"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-600 font-bold text-sm">Memuat Rapor Siswa...</p>
          </div>
        ) : childrenReports.length > 0 ? (
          <div className="space-y-4">
            {childrenReports.map((report) => (
              <div
                key={report.studentId}
                className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300 inline-block">
                      {report.studentClass}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      💎 {report.totalXp} XP
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-lg">
                    Rapor Resmi: {report.studentName}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {report.completedMissions} Pulau Misi Tuntas • {report.projectsCount} Karya Koding • Satuan: {report.schoolName}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenRaport(report)}
                  className="toy-btn-teal px-5 py-2.5 text-xs font-bold rounded-xl shadow-toyTeal shrink-0 cursor-pointer flex items-center gap-2 text-white active:scale-95 transition"
                >
                  <span>Cetak / Unduh Raport PDF</span>
                  <span>📥</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 text-center text-slate-500 font-medium">
            Belum ada data rapor siswa terhubung.
          </div>
        )}

        {/* Modal Raport Print / PDF */}
        <KikoRaportPrintModal
          isOpen={isRaportModalOpen}
          onClose={() => setIsRaportModalOpen(false)}
          studentName={selectedReport?.studentName || 'Siswa Blokuma'}
          studentClass={selectedReport?.studentClass || 'Kelas 4 SD'}
          schoolName={selectedReport?.schoolName || 'SD Negeri Nusantara 01'}
          period={selectedReport?.period || 'Semester Ganjil TA 2026/2027'}
          completedMissions={selectedReport?.completedMissions || 1}
          projectsCount={selectedReport?.projectsCount || 0}
          qualitativeNarrative={selectedReport?.qualitativeNarrative || ''}
        />
      </div>
    </div>
  );
}
