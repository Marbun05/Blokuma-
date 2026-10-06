import React, { useState } from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { usePlaygroundStore } from '../../../../store/playground/use-playground-store.js';
import { PALETTE_BLOCKS } from '../../../../engine/blocks/definitions/index.js';
import { generateGuidedFeedback } from '../../../../engine/debugger/guided-debugger.js';

export default function PlaygroundPage() {
  const { nodes, previewMode, addBlock, clearAll, setPreviewMode, getCodeText } = usePlaygroundStore();
  const [stagePos, setStagePos] = useState(0);

  const feedback = generateGuidedFeedback(nodes);

  const handleRun = () => {
    setStagePos((prev) => prev + 20);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-4 sm:p-6 flex flex-col h-screen overflow-hidden">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧩</span>
            <div>
              <h1 className="font-heading text-lg font-bold text-slate-900">Visual Coding Playground</h1>
              <p className="text-xs text-slate-500">Susun blok untuk mengontrol karakter</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow transition"
            >
              ▶ Jalankan Kode
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Hapus
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200 overflow-y-auto">
            <h3 className="font-heading font-bold text-xs uppercase text-slate-400 mb-3">Palet Blok</h3>
            <div className="space-y-2">
              {PALETTE_BLOCKS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => addBlock(b)}
                  className="w-full text-left p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs flex items-center gap-2 hover:bg-teal-100 transition"
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <span className="font-heading font-bold text-xs text-slate-600">Kanvas Kode</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPreviewMode('blocks')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${previewMode === 'blocks' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Blok
                </button>
                <button
                  onClick={() => setPreviewMode('javascript')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${previewMode === 'javascript' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  JS
                </button>
                <button
                  onClick={() => setPreviewMode('python')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${previewMode === 'python' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Python
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 overflow-y-auto space-y-2">
              {previewMode === 'blocks' ? (
                nodes.map((n) => (
                  <div key={n.id} className="p-3 bg-amber-400 text-slate-900 rounded-xl font-bold text-xs shadow-sm flex items-center gap-2">
                    <span>{n.icon || '📦'}</span>
                    <span>{n.label}</span>
                  </div>
                ))
              ) : (
                <pre className="text-xs font-mono bg-slate-900 text-teal-300 p-3 rounded-xl">{getCodeText()}</pre>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between">
            <div>
              <span className="font-heading font-bold text-xs text-teal-400 block mb-2">Panggung Karakter</span>
              <div className="h-48 bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div
                  className="text-5xl transition-all duration-300"
                  style={{ transform: `translateX(${stagePos}px)` }}
                >
                  🧑‍🚀
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs">
              <span className="font-bold text-amber-300 block mb-1">💡 Panduan Kiko:</span>
              <p className="text-slate-300">{feedback.friendlyExplanation}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
