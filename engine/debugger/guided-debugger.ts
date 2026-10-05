import { evaluateRules } from '../rules/rule-engine';
import { BlockASTNode } from '../blocks/ast/ast-node';

export interface DebuggerOutput {
  hasError: boolean;
  friendlyExplanation: string;
  suggestedFix: string;
}

export function generateGuidedFeedback(nodes: BlockASTNode[]): DebuggerOutput {
  const result = evaluateRules(nodes);
  if (!result.passed) {
    return {
      hasError: true,
      friendlyExplanation: result.userFriendlyMessage,
      suggestedFix: 'Periksa blok bernuansa kuning atau ubah nilai parameter blok.',
    };
  }

  return {
    hasError: false,
    friendlyExplanation: 'Semua blok tampak sempurna! Klik tombol "Jalankan".',
    suggestedFix: 'Tekan tombol Jalankan.',
  };
}
