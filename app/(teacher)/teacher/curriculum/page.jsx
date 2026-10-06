import React from 'react';

export default function TeacherCurriculumPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Peta Kurikulum Koding Adaptif</h1>
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
        <div><strong>Kelas 1–2:</strong> Sequence, Motion, Events</div>
        <div><strong>Kelas 3–4:</strong> Loops, Conditional Statements, Storytelling</div>
        <div><strong>Kelas 5–6:</strong> Variables, Functions, Game Logic</div>
      </div>
    </div>
  );
}
