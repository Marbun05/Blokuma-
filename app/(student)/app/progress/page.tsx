'use client';

import { StudentSidebar } from '../../../../components/navigation/StudentSidebar';

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Progress Computational Thinking</h1>
        <p className="text-slate-600 text-sm mb-8">Perkembangan 4 pilar kemampuan berpikir komputasional Kiko.</p>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Decomposition (Membagi Masalah)</span>
              <span>75%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500" style={{ width: '75%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Pattern Recognition (Pengenalan Pola)</span>
              <span>68%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: '68%' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
