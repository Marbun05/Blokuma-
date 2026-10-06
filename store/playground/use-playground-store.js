import { create } from 'zustand';
import { generateJavaScriptFromAST } from '../../engine/code-generation/javascript/js-generator.js';
import { generatePythonFromAST } from '../../engine/code-generation/python/py-generator.js';

export const usePlaygroundStore = create((set, get) => ({
  nodes: [
    { id: 'b-init-1', category: 'events', type: 'onStart', label: 'Saat Mulai', icon: '🚀' },
    { id: 'b-init-2', category: 'motion', type: 'move', label: 'Maju 10 Langkah', value: 10, icon: '🡆' },
  ],
  previewMode: 'blocks',
  isExecuting: false,

  addBlock: (node) => {
    set((state) => ({
      nodes: [...state.nodes, { ...node, id: `b-${Date.now()}` }],
    }));
  },

  clearAll: () => set({ nodes: [] }),

  setPreviewMode: (mode) => set({ previewMode: mode }),

  getCodeText: () => {
    const { nodes, previewMode } = get();
    if (previewMode === 'javascript') {
      return generateJavaScriptFromAST(nodes);
    }
    if (previewMode === 'python') {
      return generatePythonFromAST(nodes);
    }
    return '';
  },
}));
