import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';
import { fetchClassrooms } from '../../../../services/classroom-service.js';

export default function TeacherStudentsPage() {
  const { user } = useAuthStore();
  const [filterClass, setFilterClass] = useState('Semua');
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form State
  const [targetStudentId, setTargetStudentId] = useState('');
  const [targetClassroomId, setTargetClassroomId] = useState('');
  const [targetGrade, setTargetGrade] = useState('4');
  const [allStudentProfiles, setAllStudentProfiles] = useState([]);
  const [toastNotification, setToastNotification] = useState(null);

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  };

  const fetchTeacherStudentsData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Fetch classrooms owned by teacher or seeded rombels in database
      const teacherClassrooms = await fetchClassrooms(user.id);
      setClassrooms(teacherClassrooms);

      // 2. Fetch all student profiles in database
      const { data: studentProfData } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('full_name', { ascending: true });

      const allStudents = studentProfData || [];
      setAllStudentProfiles(allStudents);

      // 3. Fetch classroom_students relationships
      const classIds = teacherClassrooms.map((c) => c.id);
      let classroomStudents = [];
      if (classIds.length > 0) {
        const { data: csData } = await supabase
          .from('classroom_students')
          .select('classroom_id, student_id')
          .in('classroom_id', classIds);
        classroomStudents = csData || [];
      }

      // 4. Fetch student progress
      const studentIds = allStudents.map((s) => s.id);
      let progresses = [];
      if (studentIds.length > 0) {
        const { data: progData } = await supabase
          .from('student_progress')
          .select('*')
          .in('student_id', studentIds);
        progresses = progData || [];
      }

      // Combine student data
      const combined = allStudents.map((prof) => {
        const progress = progresses.find((p) => p.student_id === prof.id) || {};
        const csRel = classroomStudents.find((cs) => cs.student_id === prof.id);
        const assignedClassroom = teacherClassrooms.find((c) => c.id === csRel?.classroom_id);

        const levelNum = Number(progress.level || 0);
        const completionRate = Math.min(100, Math.round((levelNum / 6) * 100));

        return {
          id: prof.id,
          fullName: prof.full_name,
          nickname: prof.nickname || prof.full_name.split(' ')[0],
          grade: prof.grade ? `Kelas ${prof.grade} SD` : 'Belum Memilih Kelas',
          rawGrade: prof.grade || null,
          classroomId: assignedClassroom?.id || null,
          classroomName: assignedClassroom?.name || 'Belum Ditempatkan',
          avatar: prof.avatar_url || '🧑‍🚀',
          progress: completionRate,
          xp: progress.xp || 0,
          level: levelNum,
          lastActive: progress.last_active_date || 'Baru Saja',
          status: prof.grade ? 'Aktif' : 'Nonaktif / Belum Ditempatkan',
        };
      });

      setStudents(combined);
    } catch (err) {
      console.error('Error fetching teacher student data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherStudentsData();
  }, [user]);

  // Handle Penempatan Siswa Baru ke Rombel Guru
  const handleAssignStudent = async (e) => {
    e.preventDefault();
    if (!targetStudentId || !targetClassroomId) {
      triggerToast('⚠️ Silakan pilih Siswa dan Rombel Kelas!');
      return;
    }

    try {
      // 1. Remove existing relation if any
      await supabase.from('classroom_students').delete().eq('student_id', targetStudentId);

      // 2. Insert into classroom_students
      await supabase.from('classroom_students').insert([
        { classroom_id: targetClassroomId, student_id: targetStudentId },
      ]);

      // 3. Update student grade in profiles
      await supabase
        .from('profiles')
        .update({
          grade: Number(targetGrade),
          updated_at: new Date().toISOString(),
        })
        .eq('id', targetStudentId);

      const targetStudent = allStudentProfiles.find((s) => s.id === targetStudentId);
      const targetClassroom = classrooms.find((c) => c.id === targetClassroomId);

      triggerToast(`🎉 ${targetStudent?.full_name || 'Siswa'} berhasil ditempatkan di Rombel ${targetClassroom?.name}!`);
      setIsAssignModalOpen(false);
      setTargetStudentId('');
      setTargetClassroomId('');
      fetchTeacherStudentsData();
    } catch (err) {
      console.error('Error assigning student:', err);
      triggerToast('⚠️ Gagal memperbarui penempatan kelas.');
    }
  };

  // Helper Otomatiskan Jenjang Kelas dari Nama Rombel
  const handleSelectClassroomChange = (classroomId) => {
    setTargetClassroomId(classroomId);
    const selectedC = classrooms.find((c) => c.id === classroomId);
    if (selectedC?.name) {
      const matchDigit = selectedC.name.match(/\b([1-6])\b/);
      if (matchDigit) {
        setTargetGrade(matchDigit[1]);
      }
    }
  };

  // Open Edit Modal for a specific student
  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    const initialClassId = student.classroomId || (classrooms[0]?.id || '');
    setTargetClassroomId(initialClassId);
    setTargetGrade(student.rawGrade ? String(student.rawGrade) : '4');
    setIsEditModalOpen(true);
  };

  // Save Edit Student Assignment / Grade
  const handleSaveStudentEdit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      if (targetClassroomId) {
        await supabase.from('classroom_students').delete().eq('student_id', selectedStudent.id);
        await supabase.from('classroom_students').insert([
          { classroom_id: targetClassroomId, student_id: selectedStudent.id },
        ]);
      }

      await supabase
        .from('profiles')
        .update({
          grade: Number(targetGrade),
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedStudent.id);

      triggerToast(`✨ Data penempatan ${selectedStudent.fullName} berhasil diperbarui!`);
      setIsEditModalOpen(false);
      setSelectedStudent(null);
      fetchTeacherStudentsData();
    } catch (err) {
      console.error('Error editing student:', err);
      triggerToast('⚠️ Gagal menyimpan perubahan siswa.');
    }
  };

  // Toggle Status Aktif / Nonaktif
  const handleToggleStudentStatus = async (student) => {
    try {
      const isCurrentlyActive = student.rawGrade !== null;
      const newGrade = isCurrentlyActive ? null : 4; // Toggle active/inactive

      await supabase
        .from('profiles')
        .update({
          grade: newGrade,
          updated_at: new Date().toISOString(),
        })
        .eq('id', student.id);

      triggerToast(
        isCurrentlyActive
          ? `⏸️ Status ${student.fullName} diubah menjadi Nonaktif.`
          : `▶️ Status ${student.fullName} berhasil Diaktifkan kembali!`
      );
      fetchTeacherStudentsData();
    } catch (err) {
      console.error('Error toggling student status:', err);
    }
  };

  // Keluarkan Siswa dari Rombel Kelas
  const handleRemoveStudentFromClass = async (student) => {
    if (!window.confirm(`Apakah Anda yakin ingin mengeluarkan ${student.fullName} dari Rombel Kelas?`)) {
      return;
    }

    try {
      await supabase.from('classroom_students').delete().eq('student_id', student.id);
      await supabase.from('profiles').update({ grade: null }).eq('id', student.id);

      triggerToast(`🗑️ ${student.fullName} berhasil dikeluarkan dari rombel kelas.`);
      fetchTeacherStudentsData();
    } catch (err) {
      console.error('Error removing student:', err);
    }
  };

  // Filter List
  const filtered = students.filter((s) => {
    const matchClass =
      filterClass === 'Semua'
        ? true
        : filterClass === 'Belum Ditempatkan'
        ? s.classroomName === 'Belum Ditempatkan'
        : s.classroomName.includes(filterClass);

    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.nickname.toLowerCase().includes(search.toLowerCase());

    return matchClass && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Toast Notifikasi Status */}
        {toastNotification && (
          <div className="bg-purple-50 border-2 border-purple-400 text-purple-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2">
              <span>🎒</span>
              <span>{toastNotification}</span>
            </span>
            <button
              onClick={() => setToastNotification(null)}
              className="text-purple-700 hover:text-purple-900 font-extrabold text-sm ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold border border-purple-300 mb-2">
              <span>👩‍🏫</span> Manajemen Siswa Terpusat • Ruang Guru
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Daftar Penjelajah Cilik (Siswa)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kelola penempatan kelas, edit status, aktifkan/nonaktifkan siswa, dan pantau perkembangan belajar secara terpusat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="toy-btn-teal px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>+</span>
              <span>Penempatan Siswa ke Rombel</span>
            </button>
            <Link
              to="/teacher"
              className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
            >
              ← Hub Guru
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="card-chunky bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari nama atau nickname siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 w-full sm:w-80 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Filter Rombel:</span>
            <button
              onClick={() => setFilterClass('Semua')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition ${
                filterClass === 'Semua'
                  ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Semua
            </button>
            {classrooms.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setFilterClass(cls.name)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition ${
                  filterClass === cls.name
                    ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cls.name}
              </button>
            ))}
            <button
              onClick={() => setFilterClass('Belum Ditempatkan')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition ${
                filterClass === 'Belum Ditempatkan'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Belum Ditempatkan
            </button>
          </div>
        </div>

        {/* Student Cards Grid */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat data siswa...</span>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <div key={s.id} className="card-chunky bg-white p-5 rounded-2xl space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-sm">
                      {s.avatar}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">{s.fullName}</h3>
                      <p className="text-xs text-slate-500 font-medium">@{s.nickname}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md border border-purple-200">
                          {s.classroomName}
                        </span>
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md border border-teal-200">
                          {s.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleStudentStatus(s)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition cursor-pointer ${
                      s.status === 'Aktif'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                    }`}
                    title="Klik untuk mengubah status Aktif / Nonaktif"
                  >
                    {s.status === 'Aktif' ? '✓ Aktif' : '⏸️ Nonaktif'}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Capaian Kurikulum ({s.level} Pulau Misi)</span>
                    <span className="text-teal-600">{s.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Control Bar untuk Guru */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs gap-2">
                  <span className="font-bold text-amber-600">💎 {s.xp} XP</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(s)}
                      className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold rounded-lg border border-teal-300 transition cursor-pointer"
                    >
                      ✏️ Edit Rombel
                    </button>
                    {s.classroomId && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStudentFromClass(s)}
                        className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg border border-rose-200 transition cursor-pointer"
                        title="Keluarkan dari Rombel Kelas"
                      >
                        🗑️ Keluarkan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-slate-300 text-center text-slate-500 font-medium">
            <span className="text-4xl block mb-2">🎒</span>
            Tidak ada siswa yang ditemukan. Klik tombol "+ Penempatan Siswa ke Rombel" di atas untuk menambahkan siswa.
          </div>
        )}

        {/* Modal Penempatan Siswa Baru */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border-4 border-purple-300 rounded-3xl p-6 max-w-md w-full card-chunky shadow-2xl relative my-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎒</span>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">Penempatan Siswa ke Rombel</h3>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAssignStudent} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pilih Siswa
                  </label>
                  <select
                    required
                    value={targetStudentId}
                    onChange={(e) => setTargetStudentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-purple-500 bg-white"
                  >
                    <option value="">-- Pilih Siswa --</option>
                    {allStudentProfiles.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.full_name} (@{s.nickname || 'kiko'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pilih Target Rombel Kelas
                  </label>
                  <select
                    required
                    value={targetClassroomId}
                    onChange={(e) => handleSelectClassroomChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-purple-500 bg-white"
                  >
                    <option value="">-- Pilih Rombel Kelas --</option>
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Jenjang Kelas (SD 1 - 6)
                  </label>
                  <select
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-purple-500 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <option key={g} value={g}>
                        Kelas {g} SD
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="toy-btn-teal w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal cursor-pointer"
                  >
                    Simpan Penempatan Siswa 🚀
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Edit Penempatan / Kelas Siswa */}
        {isEditModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border-4 border-teal-300 rounded-3xl p-6 max-w-md w-full card-chunky shadow-2xl relative my-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✏️</span>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">
                    Edit Rombel: {selectedStudent.fullName}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveStudentEdit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ubah Rombel Kelas
                  </label>
                  <select
                    value={targetClassroomId}
                    onChange={(e) => handleSelectClassroomChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="">-- Pilih Rombel Kelas --</option>
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ubah Jenjang Kelas SD
                  </label>
                  <select
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-500 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <option key={g} value={g}>
                        Kelas {g} SD
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="toy-btn-teal w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal cursor-pointer"
                  >
                    Simpan Perubahan 🚀
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
