// Supabase Edge Function: kiko-praise-generator
// Memberikan Kalimat Apresiasi Personal & Umpan Balik Motivatif Instan (< 100 ms)
// Model Default: openai/gpt-oss-20b (atau OpenRouter / Groq API)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PraisePayload {
  studentName?: string;
  islandTitle?: string;
  xpEarned?: number;
  hasBonus?: boolean;
  gradeLevel?: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: PraisePayload = await req.json();
    const {
      studentName = 'Arsitek Kode',
      islandTitle = 'Pulau Petualangan',
      xpEarned = 100,
      hasBonus = false,
      gradeLevel = 'Kelas 3-4 SD',
    } = body;

    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY') || Deno.env.get('GROQ_TOKEN') || '';
    const preferredModel = Deno.env.get('AI_PRAISE_MODEL') || 'openai/gpt-oss-20b';

    if (openRouterApiKey) {
      try {
        const systemPrompt = `
Kamu adalah Kiko, maskot robot ceria dan sahabat terbaik anak-anak Sekolah Dasar (Kelas 1 - 6 SD) di Indonesia.
Tugas utamamu adalah memberikan VALIDASI EMOSIONAL & KALIMAT APRESIASI INSTAN (< 100 ms) saat anak baru saja berhasil menuntaskan suatu misi petualangan koding.

PRINSIP KALIMAT APRESIASI:
1. Panggil nama anak secara ramah dan bangga: "${studentName}".
2. Berikan pujian spesifik tentang usaha dan logika koding mereka saat menaklukkan "${islandTitle}".
3. Jika mendapat bonus (${hasBonus ? 'Ya, mendapat bonus efisiensi kode' : 'Selesai standar'}), puji kecerdasan mereka merakit balok paling ringkas.
4. Gunakan nada bahasa ceria, hangat, bertabur emoji gembira, dan membangkitkan rasa percaya diri (1-2 kalimat singkat).

FORMAT OUTPUT JSON MURNI (TANPA MARKDOWN WRAPPER):
{
  "praiseMessage": "Luar biasa, Pahlawan [Nama]! Kamu berhasil menyusun algoritma paling ringkas di [Pulau]! Kiko sangat bangga padamu! 🚀✨",
  "kikoMood": "cheerful" | "super_excited" | "proud"
}
`;

        const userPrompt = `
Nama Siswa: ${studentName}
Judul Pulau: ${islandTitle}
XP Didapat: ${xpEarned}
Mendapat Bonus Efisiensi: ${hasBonus ? 'Ya' : 'Tidak'}
Jenjang Kelas: ${gradeLevel}

Buatkan kalimat validasi emosional instan dari Kiko!
`;

        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://blokuma.id',
            'X-Title': 'Blokuma Kiko Praise Generator',
          },
          body: JSON.stringify({
            model: preferredModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.8,
            max_tokens: 150,
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const contentStr = aiData.choices?.[0]?.message?.content?.trim();

          if (contentStr) {
            const cleanJsonStr = contentStr.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedAi = JSON.parse(cleanJsonStr);

            return new Response(
              JSON.stringify({
                success: true,
                source: 'ai_model',
                modelUsed: preferredModel,
                praiseMessage: parsedAi.praiseMessage || `Hebat sekali, ${studentName}! Kiko bangga padamu! 🚀`,
                kikoMood: parsedAi.kikoMood || 'super_excited',
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
              }
            );
          }
        }
      } catch (aiErr) {
        console.warn('AI Praise Generator fallback to local engine:', aiErr);
      }
    }

    // Local Engine Fallback (< 10 ms)
    const bonusPhrase = hasBonus ? ' dengan efisiensi kode yang sangat cerdas!' : ' dengan sukses!';
    const fallbackPraise = `Luar biasa, Pahlawan ${studentName}! Kamu berhasil menaklukkan ${islandTitle}${bonusPhrase} Kiko bangga sekali dengan semangat pantang menyerahmu! 🚀✨`;

    return new Response(
      JSON.stringify({
        success: true,
        source: 'local_praise_engine',
        modelUsed: 'openai/gpt-oss-20b-fallback',
        praiseMessage: fallbackPraise,
        kikoMood: 'super_excited',
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
        error: error.message || 'Internal server error in Kiko Praise Generator Edge Function',
        praiseMessage: 'Hore! Kamu berhasil memecahkan teka-teki koding ini bersama Kiko! 🚀✨',
        kikoMood: 'cheerful',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
