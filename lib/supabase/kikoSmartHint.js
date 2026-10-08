import { supabase } from './client.js';
import {
  parseBlocksToAST,
  analyzeASTLogic,
  generateLocalSocraticHint,
} from '../blockEngine/astAnalyzer.js';

/**
 * Mengambil Kiko Smart Hint dari Supabase Edge Function
 * dengan pemrosesan AST dan Fallback Otomatis tanpa error.
 *
 * @param {Object} options
 * @param {Array} options.canvasBlocks - Balok di kanvas anak
 * @param {Object} options.targetLevel - Metadata target level
 * @param {Object} options.executionResult - Hasil eksekusi terakhir
 * @param {string} options.gradeLevel - Tingkat SD ("SD 1-2", "SD 3-4", "SD 5-6")
 * @param {number} options.attemptCount - Jumlah percobaan gagal
 * @returns {Promise<Object>} Respon Kiko Smart Hint
 */
export async function getKikoSmartHint({
  canvasBlocks = [],
  targetLevel = { targetDistance: 4, riverWidth: 2, hasRiver: true },
  executionResult = {},
  gradeLevel = 'SD 3-4',
  attemptCount = 1,
}) {
  // Parse balok ke struktur AST
  const ast = parseBlocksToAST(canvasBlocks);
  const analysis = analyzeASTLogic(ast, targetLevel);

  try {
    // Panggil Supabase Edge Function: kiko-smart-hint
    const { data, error } = await supabase.functions.invoke('kiko-smart-hint', {
      body: {
        ast,
        targetLevel,
        executionResult: {
          ...executionResult,
          stepsTaken: analysis.calculatedSteps,
        },
        gradeLevel,
        attemptCount,
      },
    });

    if (!error && data && data.success && data.hint) {
      return {
        hint: data.hint,
        emotion: data.emotion || 'cheerful',
        source: data.source || 'supabase_edge_function',
        modelUsed: data.modelUsed || 'qwen/qwen3.8-27b',
        highlightBlockTypes: data.highlightBlockTypes || [],
        socraticQuestions: data.socraticQuestions || [],
        ast,
        analysis,
      };
    }
  } catch (err) {
    console.warn('Edge Function invoke fallback:', err);
  }

  // Fallback Lokal jika Edge Function offline / belum dideploy
  const localHint = generateLocalSocraticHint(analysis, gradeLevel);

  return {
    hint: localHint.hint,
    emotion: localHint.emotion,
    source: 'local_socratic_engine',
    modelUsed: 'qwen/qwen3.8-27b-local-fallback',
    highlightBlockTypes: localHint.highlightBlockTypes,
    socraticQuestions: localHint.socraticQuestions,
    ast,
    analysis,
  };
}
