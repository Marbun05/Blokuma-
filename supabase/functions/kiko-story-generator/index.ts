// Supabase Edge Function: kiko-story-generator
// Menyulap Kode/Balok Anak (SD 1 - 4) menjadi Dongeng Petualangan (Storyfication)
// Model Default: openai/gpt-oss-120b (atau OpenRouter API)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface StoryPayload {
  studentName?: string;
  projectTitle?: string;
  blocksSummary?: Array<{ id?: string; label?: string }>;
  gradeLevel?: string; // "Kelas 1-2 SD" | "Kelas 3-4 SD"
  xpEarned?: number;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: StoryPayload = await req.json();
    const {
      studentName = 'Kiko',
      projectTitle = 'Petualangan Balok Ajaib',
      blocksSummary = [{ id: 'move', label: 'MAJU 1 LANGKAH' }],
      gradeLevel = 'Kelas 3-4 SD',
      xpEarned = 50,
    } = body;

    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY') || Deno.env.get('GROQ_TOKEN') || '';
    const preferredModel = Deno.env.get('AI_STORY_MODEL') || 'openai/gpt-oss-120b';

    const blockNames = blocksSummary.map((b) => b.label || b.id || 'Perintah').join(', ');

    if (openRouterApiKey) {
      try {
        const systemPrompt = `
Kamu adalah Kiko, dongeng pencerita ajaib untuk anak-anak Sekolah Dasar (Kelas 1 - 4 SD) di Indonesia.
Tugasmu adalah menyulap susunan koding/balok logika buatan anak menjadi "Dongeng Petualangan Mini" yang imajinatif, ajaib, dan memotivasi.

PRINSIP CERITA STORYFICATION:
1. Pahlawan Utama Cerita: Pahlawan [Nama Siswa] bersama Sahabat Robot Kiko.
2. Ubah konsep koding menjadi istilah ajaib:
   - Balok 'Repeat / Ulangi' -> "Mantra Ajaib Ulangi"
   - Balok 'Move / Maju' -> "Langkah Sepatu Terbang Ajaib"
   - Balok 'Jump / Melompat' -> "Lompatan Melayang Awan"
   - Balok 'Sound / Musik' -> "Mantra Nyanyian Ceria"
3. Nada Bahasa: Sangat imajinatif, ramah anak, hangat, dan membanggakan karya koding anak.
4. Bahasa disesuaikan dengan tingkat usia SD 1-4.

FORMAT OUTPUT JSON MURNI (TANPA MARKDOWN WRAPPER):
{
  "title": "Judul Dongeng Singkat Ajaib",
  "story": "Isi cerita mini imajinatif 3-4 kalimat. Contoh: Hari ini, Pahlawan [Nama Siswa] membuat mantra ajaib bernama 'Loop'. Karena mantra itu, naga merah dan Robot Kiko bisa menari 5 kali tanpa lelah! Hebat!",
  "moralValue": "Pesan moral positif ringan tentang kreativitas koding.",
  "characterBadge": "🧙‍♂️ Penyihir Mantra Kode Ajaib"
}
`;

        const userPrompt = `
Nama Siswa: ${studentName}
Judul Misi/Proyek: ${projectTitle}
Tingkat Kelas: ${gradeLevel}
Daftar Balok Koding Anak: ${blockNames}
Poin XP Didapat: ${xpEarned}

Buatkan Dongeng Petualangan Mini Ajaib dari karya koding di atas!
`;

        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://blokuma.id',
            'X-Title': 'Blokuma Kiko Story Generator',
          },
          body: JSON.stringify({
            model: preferredModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.8,
            max_tokens: 350,
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
                title: parsedAi.title || `Dongeng Pahlawan ${studentName}`,
                story: parsedAi.story,
                moralValue: parsedAi.moralValue || 'Setiap balok logika membawa keajaiban!',
                characterBadge: parsedAi.characterBadge || '🧙‍♂️ Penyihir Kode Ajaib',
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
              }
            );
          }
        }
      } catch (aiErr) {
        console.warn('AI Story Generator fallback to local engine:', aiErr);
      }
    }

    // Fallback Local Story Engine (Guaranteed 100% Error-Free)
    const hasLoop = blocksSummary.some((b) => (b.id || '').includes('repeat'));
    const hasJump = blocksSummary.some((b) => (b.id || '').includes('jump'));

    let localStory = `Hari ini, Pahlawan ${studentName} merakit mantra koding ajaib di Desa Blokuma! Dengan susunan balok ${blockNames}, Robot Kiko berhasil menuntaskan misi ${projectTitle} dengan sempurna!`;
    let localBadge = '🚀 Arsitek Kode Ajaib';

    if (hasLoop) {
      localStory = `Hari ini, Pahlawan ${studentName} membuat mantra ajaib bernama 'Loop'. Karena mantra itu, Robot Kiko dan naga merah bisa menari 5 kali tanpa lelah! Hebat!`;
      localBadge = '🧙‍♂️ Master Mantra Loop';
    } else if (hasJump) {
      localStory = `Di tengah hutan ajaib, Pahlawan ${studentName} memasang balok lompatan rahasia. Seketika Robot Kiko melayang tinggi melompati sungai jernih dan mendarat dengan gembira!`;
      localBadge = '🦘 Penjelajah Angkasa';
    }

    return new Response(
      JSON.stringify({
        success: true,
        source: 'local_story_engine',
        modelUsed: 'openai/gpt-oss-120b-fallback',
        title: `Kisah Pahlawan ${studentName} & Mantra Kiko`,
        story: localStory,
        moralValue: 'Kreativitas dan ketelitian koding membuat petualangan semakin seru!',
        characterBadge: localBadge,
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
        error: error.message || 'Internal server error in Kiko Story Generator Edge Function',
        title: 'Kisah Petualangan Kiko',
        story: 'Pahlawan kita telah berhasil merakit balok koding ajaib dan membuka gerbang petualangan baru bersama Robot Kiko! ✨',
        moralValue: 'Pantang menyerah adalah kunci sukses koding!',
        characterBadge: '⭐ Bintang Koding',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
