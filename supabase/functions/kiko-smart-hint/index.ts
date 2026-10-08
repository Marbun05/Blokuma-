// Supabase Edge Function: kiko-smart-hint
// Membaca AST Balok Logika milik Siswa (SD 1 - 6) & Memberikan Socratic Hint Ramah & Ceria
// Model default: qwen/qwen3.8-27b (atau fallback Socratic AI Engine)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestPayload {
  ast?: any;
  targetLevel?: {
    title?: string;
    description?: string;
    riverWidth?: number;
    targetDistance?: number;
    hasObstacle?: boolean;
  };
  executionResult?: {
    status?: string;
    message?: string;
    stepsTaken?: number;
  };
  gradeLevel?: string; // "SD 1-2" | "SD 3-4" | "SD 5-6"
  attemptCount?: number;
}

serve(async (req: Request) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: RequestPayload = await req.json();
    const {
      ast = {},
      targetLevel = { targetDistance: 4, riverWidth: 2 },
      executionResult = {},
      gradeLevel = 'SD 3-4',
      attemptCount = 1,
    } = body;

    // AI API Configuration (Supports OpenRouter, Groq, or direct OpenRouter qwen/qwen3.8-27b)
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY') || Deno.env.get('GROQ_TOKEN') || '';
    const preferredModel = Deno.env.get('AI_MODEL') || 'qwen/qwen3.8-27b';

    let aiHint = '';
    let emotion = 'curious';
    let modelUsed = preferredModel;

    if (openRouterApiKey) {
      try {
        const systemPrompt = `
Kamu adalah Kiko, maskot robot ceria dan sahabat belajar koding untuk anak-anak Sekolah Dasar (SD Kelas 1 - 6) di Indonesia.
Tugas utamamu adalah memberikan "Kiko Smart Hint" (Bantuan Tanpa Memberi Bocoran) menggunakan Metode Socrates.

PRINSIP UTAMA:
1. JANGAN PERNAH memberikan jawaban langsung, baris kode perbaikan, atau solusi instan seperti "Error di baris 4".
2. Selalu gunakan nada bahasa ceria, empati, ramah anak, dan memotivasi agar anak tidak frustrasi atau menyerah.
3. Analisa AST (Abstract Syntax Tree) / susunan balok logika yang salah milik anak dan bandingkan dengan target misi.
4. Sesuaikan bahasa berdasarkan tingkat kelas:
   - SD 1-2: Pendekatan visual sangat sederhana, gunakan analogi hewan/objek lucu, kata-kata pendek.
   - SD 3-4: Gunakan pertanyaan pemicu logika ceria (contoh: "Ups! Kiko cuma jalan 2 langkah, padahal sungainya lebar lho. Coba cek lagi balok angka birumu, butuh berapa lompatan ya?").
   - SD 5-6: Gunakan konsep berpikir komputasional ringan (pola, urutan, perulangan) tanpa bahasa rumit.

FORMAT OUTPUT JSON:
Kembalikan respon DALAM FORMAT JSON MURNI tanpa markdown wrapper:
{
  "hint": "Pesan bantuan Socratic ceria di sini",
  "emotion": "cheerful" | "curious" | "thinking" | "surprised" | "encouraging",
  "highlightBlockTypes": ["move", "repeat", "jump"],
  "socraticQuestions": ["Pertanyaan pemicu 1", "Pertanyaan pemicu 2"]
}
`;

        const userPrompt = `
Tingkat Kelas: ${gradeLevel}
Percobaan ke: ${attemptCount}
Target Misi: ${JSON.stringify(targetLevel)}
AST Balok Logika Anak: ${JSON.stringify(ast)}
Hasil Eksekusi Terakhir: ${JSON.stringify(executionResult)}

Berikan Kiko Smart Hint terbaik untuk anak ini!
`;

        // Panggil OpenRouter / OpenAI compatible API
        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://blokuma.id',
            'X-Title': 'Blokuma Kiko Smart Hint',
          },
          body: JSON.stringify({
            model: preferredModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const contentStr = aiData.choices?.[0]?.message?.content?.trim();

          if (contentStr) {
            // Clean markdown code blocks if present
            const cleanJsonStr = contentStr.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedAi = JSON.parse(cleanJsonStr);

            return new Response(
              JSON.stringify({
                success: true,
                source: 'ai_model',
                modelUsed: preferredModel,
                hint: parsedAi.hint,
                emotion: parsedAi.emotion || 'cheerful',
                highlightBlockTypes: parsedAi.highlightBlockTypes || [],
                socraticQuestions: parsedAi.socraticQuestions || [],
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
              }
            );
          }
        }
      } catch (aiErr) {
        console.warn('AI Model call fallback to rule engine:', aiErr);
      }
    }

    // Smart Dynamic Fallback Rule Engine (Jaminan tanpa error jika API Key belum dipasang / limit)
    const stepsTaken = executionResult.stepsTaken || ast.blockCounts?.move || 0;
    const targetDistance = targetLevel.targetDistance || 4;

    if (stepsTaken < targetDistance) {
      if (gradeLevel === 'SD 1-2') {
        aiHint = `Ups! Kiko baru jalan ${stepsTaken} langkah, padahal sungainya masih di seberang sana! Coba tambah balok jalan birunya ya? 🌊`;
      } else if (gradeLevel === 'SD 5-6') {
        aiHint = `Kiko telah melangkah sebanyak ${stepsTaken} satuan dari ${targetDistance} satuan target. Coba periksa pola perulangannya agar susunan balok lebih efisien! 💡`;
      } else {
        aiHint = `Ups! Kiko cuma jalan ${stepsTaken} langkah, padahal sungainya lebar lho. Coba cek lagi balok angka birumu, butuh berapa lompatan ya? 🚀`;
      }
      emotion = 'curious';
    } else if (!ast.blockCounts?.jump && targetLevel.riverWidth) {
      aiHint = `Wah, Kiko melihat ada sungai jernih di depannya! Balok mana ya yang bisa bikin Kiko terbang melompati air? 🦘`;
      emotion = 'surprised';
    } else {
      aiHint = `Hampir sedikit lagi! Coba cek urutan balok dari yang paling atas. Apakah Kiko bergerak sesuai petunjuknya? ✨`;
      emotion = 'encouraging';
    }

    return new Response(
      JSON.stringify({
        success: true,
        source: 'socratic_fallback_engine',
        modelUsed: 'qwen/qwen3.8-27b-embedded-rules',
        hint: aiHint,
        emotion,
        highlightBlockTypes: ['move', 'repeat', 'jump'],
        socraticQuestions: [
          'Berapa langkah yang kurang?',
          'Apakah urutan balokmu sudah benar?',
        ],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error in Kiko Smart Hint Edge Function',
        hint: 'Ups! Kiko sedang berfikir keras. Coba periksa lagi balok pertamamu ya! 🤖',
        emotion: 'thinking',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 with fallback payload so app never crashes
      }
    );
  }
});
