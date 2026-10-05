import { create } from 'zustand';
import { BlockASTNode } from '../../engine/blocks/ast/ast-node';
import { generateJavaScriptFromAST } from '../../engine/code-generation/javascript/js-generator';
import { generatePythonFromAST } from '../../engine/code-generation/python/py-generator';

interface PlaygroundStoreState {
  nodes: BlockASTNode[];
  previewMode: 'blocks' | 'javascript' | 'python';
  isExecuting: boolean;
  addBlock: (node: BlockASTNode) => void;
  clearAll: () => void;
  setPreviewMode: (mode: 'blocks' | 'javascript' | 'python') => void;
  getCodeText: () => string;
}

export const usePlaygroundStore = create<PlaygroundStoreState>((set, get) => ({
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
