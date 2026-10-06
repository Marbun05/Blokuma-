'use client';

import React, { useState, useRef } from 'react';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar';
import { usePlaygroundStore } from '../../../../store/playground/use-playground-store';
import { PALETTE_BLOCKS } from '../../../../engine/blocks/definitions';
import { generateGuidedFeedback } from '../../../../engine/debugger/guided-debugger';

export default function PlaygroundPage() {
  const { nodes, previewMode, addBlock, clearAll, setPreviewMode, getCodeText } = usePlaygroundStore();

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [speechBubble, setSpeechBubble] = useState(null);

  const currentPos = useRef({ x: 0, y: 0, rot: 0 });
  const feedback = generateGuidedFeedback(nodes);

  const resetCharacter = () => {
    currentPos.current = { x: 0, y: 0, rot: 0 };
    setPosX(0);
    setPosY(0);
    setRotation(0);
    setSpeechBubble(null);
  };

  const speakText = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playBeepSound = () => {
    if (typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch (e) {
        console.error('Audio Error:', e);
      }
    }
  };

  const runAction = (node) => {
    const rawKey = `${node.id || ''} ${node.type || ''} ${node.label || ''}`.toLowerCase();

    if (rawKey.includes('maju') || rawKey.includes('move')) {
      currentPos.current.x += 30;
      setPosX(currentPos.current.x);
    } else if (rawKey.includes('putar') || rawKey.includes('rotate')) {
      currentPos.current.rot += 90;
      setRotation(currentPos.current.rot);
    } else if (rawKey.includes('lompat') || rawKey.includes('jump')) {
      setPosY(-40);
      setTimeout(() => setPosY(0), 300);
    } else if (rawKey.includes('bicara') || rawKey.includes('say') || rawKey.includes('speak') || rawKey.includes('halo')) {
      const textToSay = 'Halo teman-teman!';
      setSpeechBubble(textToSay);
      speakText(textToSay);
      setTimeout(() => setSpeechBubble(null), 2500);
    } else if (rawKey.includes('suara') || rawKey.includes('sound') || rawKey.includes('play') || rawKey.includes('mainkan')) {
      playBeepSound();
    }
  };

  const handleRun = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      const silent = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(silent);
    }

    resetCharacter();

    if (!nodes || nodes.length === 0) return;

    let queue = [];

    nodes.forEach((node) => {
      const rawKey = `${node.id || ''} ${node.type || ''} ${node.label || ''}`.toLowerCase();

      if (rawKey.includes('ulangi') || rawKey.includes('repeat') || rawKey.includes('loop')) {
        if (queue.length > 0) {
          const previousBlocks = [...queue];
          queue.push(...previousBlocks, ...previousBlocks);
        } else {
          const defaultBlock = { label: 'Maju 10 Langkah' };
          queue.push(defaultBlock, defaultBlock, defaultBlock);
        }
      } else {
        queue.push(node);
      }
    });

    queue.forEach((actionNode, index) => {
      setTimeout(() => {
        runAction(actionNode);
      }, (index + 1) * 700);
    });
  };

  const handleClear = () => {
    clearAll();
    resetCharacter();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="flex-1 p-4 sm:p-6 flex flex-col h-screen overflow-hidden">
        {/* Header */}
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
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow transition active:scale-95"
            >
              ▶ Jalankan Kode
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition active:scale-95"
            >
              Hapus
            </button>
          </div>
        </div>

        {/* Layout 3 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
          {/* Kolom 1: Palet Blok */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200 overflow-y-auto">
            <h3 className="font-heading font-bold text-xs uppercase text-slate-400 mb-3">Palet Blok</h3>
            <div className="space-y-2">
              {PALETTE_BLOCKS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => addBlock(b)}
                  className="w-full text-left p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs flex items-center gap-2 hover:bg-teal-100 transition shadow-sm active:scale-98"
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kolom 2: Kanvas Kode */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <span className="font-heading font-bold text-xs text-slate-600">Kanvas Kode</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPreviewMode('blocks')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${previewMode === 'blocks' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Blok
                </button>
                <button
                  onClick={() => setPreviewMode('javascript')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${previewMode === 'javascript' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  JS
                </button>
                <button
                  onClick={() => setPreviewMode('python')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${previewMode === 'python' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Python
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 overflow-y-auto space-y-2">
              {previewMode === 'blocks' ? (
                nodes.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic border-2 border-dashed border-slate-200 rounded-xl">
                    Pilih blok dari palet di sebelah kiri!
                  </div>
                ) : (
                  nodes.map((n) => (
                    <div key={n.id} className="p-3 bg-amber-400 text-slate-900 rounded-xl font-bold text-xs shadow-sm flex items-center gap-2">
                      <span>{n.icon || '📦'}</span>
                      <span>{n.label}</span>
                    </div>
                  ))
                )
              ) : (
                <pre className="text-xs font-mono bg-slate-900 text-teal-300 p-3 rounded-xl overflow-x-auto">{getCodeText()}</pre>
              )}
            </div>
          </div>

          {/* Kolom 3: Panggung Karakter */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between">
            <div>
              <span className="font-heading font-bold text-xs text-teal-400 block mb-2">Panggung Karakter</span>
              <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                {speechBubble && (
                  <div className="absolute top-4 bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md z-10 animate-bounce">
                    {speechBubble}
                  </div>
                )}

                <div
                  className="transition-all duration-500 ease-in-out select-none flex items-center justify-center"
                  style={{
                    transform: `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src="/images/robot.webp"
                    alt="Robot Mascot"
                    className="w-28 h-28 object-contain drop-shadow-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerText = '🤖';
                        e.currentTarget.parentElement.className += ' text-6xl';
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs mt-4">
              <span className="font-bold text-amber-300 block mb-1">💡 Panduan Kiko:</span>
              <p className="text-slate-300">{feedback.friendlyExplanation}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}