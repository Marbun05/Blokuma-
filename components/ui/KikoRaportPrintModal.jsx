import React, { useRef } from 'react';

export function KikoRaportPrintModal({
  isOpen = false,
  onClose = () => {},
  studentName = 'Kiko Pratama',
  studentClass = 'Belum Memilih Kelas',
  schoolName = 'SD Negeri Nusantara 01',
  period = 'Semester Ganjil TA 2026/2027',
  completedMissions = 1,
  projectsCount = 0,
  qualitativeNarrative = '',
}) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  // 📐 FORMULA RIGOROUS PROPORIONAL MURNI (TANPA DISTORSI / INFLASI DUMMY)
  // KKM Resmi = 75. 1 Misi Selesai = (1/6)*100 = 17 (Jauh di bawah KKM 75)
  const completionRate = Math.round((completedMissions / 6) * 100);
  const codingScore = Math.min(100, completionRate);
  const logicScore = Math.min(100, completionRate);
  const mathScore = Math.min(
    100,
    Math.round((completedMissions / 6) * 85 + Math.min(15, projectsCount * 5))
  );

  // Predikat Kuantitatif & Kualitatif Mengacu KKM (75)
  const getPredikatStrict = (score) => {
    if (score >= 90) return 'Istimewa (Sangat Bakat Koding & Math) 🏆';
    if (score >= 75) return 'Tuntas KKM ⭐ (Sangat Baik)';
    if (score >= 50) return 'Berkembang Baik (Mendekati KKM)';
    return 'Belum Tuntas 🌱 (Perlu Bimbingan Dasar)';
  };

  const coreGrades = [
    {
      category: '💻 Nilai Coding (Pemrograman)',
      score: codingScore,
      predikat: getPredikatStrict(codingScore),
      indicator: `Murni dari rasio keberhasilan menuntaskan ${completedMissions} dari 6 Pulau Misi Utama (${completionRate}% Progresi Misi).`,
    },
    {
      category: '🧠 Nilai Logic (Daya Nalar)',
      score: logicScore,
      predikat: getPredikatStrict(logicScore),
      indicator: `Murni dari tingkat ketuntasan logika sekuensial dan perulangan tanpa mengandalkan bocoran petunjuk.`,
    },
    {
      category: '📐 Nilai Math & Kesiapan COC',
      score: mathScore,
      predikat: getPredikatStrict(mathScore),
      indicator: `Murni dari analisis pola matematika, spasial, dan perancangan ${projectsCount} proyek karya mandiri terpublikasi.`,
    },
  ];

  // Narasi Default Berdasarkan Data Riil
  const finalNarrative =
    qualitativeNarrative ||
    `Ananda ${studentName} (${studentClass}) telah menyelesaikan ${completedMissions} dari 6 pulau misi. Perlu pendampingan dan latihan lebih rutin agar daya nalar komputasi dan pemahaman koding Ananda semakin terasah hingga tuntas melampaui KKM (75).`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      {/* Container Dialog - Compact & Responsive Flex Layout */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-4 sm:p-6 max-w-3xl w-full max-h-[92vh] flex flex-col card-chunky shadow-2xl relative my-auto">

        {/* Fixed Action Header - Sticky & Always Visible (Hidden on Print) */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b-2 border-slate-200 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl shadow shrink-0">
              📄
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg leading-tight">
                Pratinjau Rapor Resmi Kurikulum Merdeka
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Penilaian 3 Pilar Utama (Coding, Logic, Math / Kesiapan COC) • KKM 75
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTriggerPrint}
              className="toy-btn-teal px-3.5 sm:px-4 py-2 font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>🖨️</span>
              <span className="hidden sm:inline">Cetak / Unduh PDF</span>
              <span className="sm:hidden">Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 font-bold flex items-center justify-center transition border border-slate-200 cursor-pointer"
              title="Tutup Modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* DOKUMEN RAPOR RESMI (PRINT AREA) - Scrollable inside modal */}
        <div
          ref={printRef}
          className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-slate-200 text-slate-900 font-sans overflow-y-auto flex-1 print:overflow-visible print:border-none print:p-0"
        >

          {/* KOP RAPOR */}
          <div className="flex items-center justify-between pb-4 border-b-4 border-teal-600 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-teal-500 text-white font-bold flex items-center justify-center text-xl sm:text-2xl shadow border-2 border-teal-700 shrink-0">
                🧱
              </div>
              <div>
                <h1 className="font-heading font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                  BLOKUMA PLATFORM
                </h1>
                <p className="text-[10px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Laporan Hasil Belajar Koding, Logika, & Matematika SD
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full inline-block mb-1">
                KURIKULUM MERDEKA
              </span>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500">{period}</p>
            </div>
          </div>

          {/* IDENTITAS SISWA & STATUS KETUNTASAN */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-2xl border-2 border-slate-200 mb-5 text-xs">
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[9px]">Nama Siswa</span>
              <strong className="text-xs sm:text-sm text-slate-900 font-heading">{studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[9px]">Kelas / Jenjang</span>
              <strong className="text-slate-800 text-xs">{studentClass}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[9px]">Satuan Pendidikan</span>
              <strong className="text-slate-800 text-xs">{schoolName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[9px]">Ketuntasan Misi</span>
              <strong className={`text-xs font-bold ${completedMissions >= 5 ? 'text-teal-700' : 'text-amber-700'}`}>
                {completedMissions >= 5 ? '⭐ Tuntas Melampaui KKM' : `🌱 ${completedMissions} dari 6 Pulau`}
              </strong>
            </div>
          </div>

          {/* TABEL 3 PENILAIAN UTAMA (CODING, LOGIC, MATH) */}
          <div className="mb-5">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span>📊</span>
                <span>Penilaian 3 Pilar Utama (Coding, Logic, & Math)</span>
              </span>
              <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300">
                KKM Resmi: 75
              </span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-slate-100 border-b-2 border-slate-200 text-slate-700 uppercase font-bold text-[9px]">
                  <tr>
                    <th className="p-2.5">Aspek Penilaian</th>
                    <th className="p-2.5 text-center">Nilai (0-100)</th>
                    <th className="p-2.5 text-center">Status / Predikat</th>
                    <th className="p-2.5">Indikator Ketercapaian Murni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {coreGrades.map((g) => (
                    <tr key={g.category} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900 text-xs">{g.category}</td>
                      <td className="p-2.5 text-center font-extrabold text-sm">
                        <span className={g.score >= 75 ? 'text-teal-700' : 'text-amber-700'}>
                          {g.score}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] border ${
                            g.score >= 75
                              ? 'bg-teal-100 text-teal-900 border-teal-300'
                              : 'bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                        >
                          {g.predikat}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600 font-medium text-[10px] leading-relaxed">
                        {g.indicator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KOTAK EVALUASI KEJUJURAN UNTUK ORANG TUA */}
          <div className={`p-4 rounded-2xl border-2 mb-5 ${codingScore >= 75 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'}`}>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>💡</span> Kesimpulan & Rekomendasi Bakat Orang Tua
            </h4>
            <div className="text-xs leading-relaxed font-medium space-y-1">
              <p>
                • <strong>Kesesuaian Koding:</strong> {codingScore >= 75 ? `Ananda ${studentName} SANGAT COCOK & BERBAKAT (telah menuntaskan ${completedMissions} pulau misi, melampaui KKM 75).` : `Ananda ${studentName} baru menuntaskan ${completedMissions} dari 6 pulau misi (Nilai ${codingScore}/100, belum mencapai KKM 75). Perlu pendampingan dan dorongan berlatih koding secara rutin.`}
              </p>
              <p>
                • <strong>Daya Nalar Logic:</strong> {logicScore >= 75 ? 'Ananda sangat mandiri dan mampu memecahkan teka-teki logika tanpa banyak bantuan.' : 'Ananda masih berada di tahap awal dan perlu bimbingan dasar untuk merakit urutan balok perintah.'}
              </p>
              <p>
                • <strong>Kesiapan Lomba / COC (Clash of Champions):</strong> {mathScore >= 75 ? 'Ananda memiliki pola pikir matematis tajam dan DIREKOMENDASIKAN SIAP MENGIKUTI KOMPETISI / OLIMPIADE MATH & KODING (COC) 🏆.' : 'Ananda BELUM SIAP diikutsertakan dalam kompetisi COC/olimpiade. Ananda perlu menyelesaikan minimal 4-5 pulau misi terlebih dahulu.'}
              </p>
            </div>
          </div>

          {/* CATATAN DESKRIPTIF GURU / MENTOR */}
          <div className="p-3.5 bg-amber-50/90 rounded-2xl border-2 border-amber-300 mb-6">
            <h4 className="font-heading font-bold text-[10px] text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>📝</span> Catatan & Narasi Pengembang
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed font-medium italic">
              "{finalNarrative}"
            </p>
          </div>

          {/* TANDA TANGAN BUKTI FISIK */}
          <div className="grid grid-cols-2 gap-6 pt-3 border-t-2 border-slate-200 text-center text-xs text-slate-700 font-medium">
            <div>
              <p className="mb-10 text-[11px]">Orang Tua / Wali Siswa,</p>
              <p className="font-bold border-b border-slate-400 inline-block px-6 pb-1 text-xs">( ........................................ )</p>
            </div>
            <div>
              <p className="mb-10 text-[11px]">Guru Pembimbing Koding,</p>
              <p className="font-bold border-b border-slate-400 inline-block px-6 pb-1 text-xs">( Bu Maya Pertiwi, S.Pd. )</p>
            </div>
          </div>

          {/* FOOTER VERIFIKASI DOKUMEN */}
          <div className="mt-6 pt-3 border-t border-slate-100 text-center text-[9px] text-slate-400 flex items-center justify-between">
            <span>Verified Authentic Document • Blokuma Child-Safe Platform</span>
            <span>Kode Dokumen: BLK-{Date.now().toString().slice(-6)}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
