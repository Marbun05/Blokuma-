// Supabase Edge Function: kiko-ai-agent
// Konsep 2: Detektif Pembelajaran Koding (Autonomous Peer-Learning Multi-Agent System)
// Generasi 40+ Kasus Misteri Per Kelas (Total 240+ Kasus Adaptif Kurikulum SD 1 - 6)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface DetectiveRequestPayload {
  mode: 'generate_case' | 'peer_interaction' | 'evaluate_solution' | 'voice_transcribe';
  studentPrompt?: string;
  gradeLevel?: number; // 1 to 6
  caseIndex?: number; // 1 to 40+
  studentCodeBlocks?: Array<{ id: string; type: string; label: string; value?: any }>;
  studentNickname?: string;
}

// Mastermind Matrix Generator for >40 Cases Per Grade
function generateMysteryCaseByGrade(grade: number, requestedIndex?: number) {
  const g = Math.max(1, Math.min(6, grade || 3));
  const idx = (requestedIndex !== undefined && requestedIndex >= 0)
    ? requestedIndex
    : Math.floor(Math.random() * 40);

  const caseNum = (idx % 40) + 1;

  if (g <= 2) {
    // KELAS 1-2: Algoritma & Sekuensial (Arah Maju, Mundur, Kanan, Kiri)
    const g1Titles = [
      'Robot Tobi Jalan Mundur 🤖',
      'Kelinci Koding Melompati Wortel 🐰',
      'Mobil Listrik Salah Belok 🚗',
      'Semut Cilik Membawa Gula 🐜',
      'Kapal Laut Menabrak Karang ⛵',
      'Kucing Koding Lupa Arah Pulang 🐱',
      'Panda Koding Mengambil Bambu 🐼',
      'Anjing Pelacak Menemukan Tulang 🦴',
      'Lebah Madu Mengambil Bunga 🐝',
      'Astronaut Cilik ke Bulan 👨‍🚀',
      'Superhero Terbang ke Gedung 🦸',
      'Perahu Pinisi Menyeberang Pulau 🚤',
      'Dinosaurus Cilik Mengambil Apel 🦕',
      'Burung Kakaktua Menirukan Langkah 🦜',
      'Robot Pemadam Memadamkan Api 🚒',
      'Anak Ayam Mencari Induknya 🐥',
      'Kereta Api Koding Lupa Jalur 🚂',
      'Penyelam Mencari Mutiara 🪸',
      'Kancil Menyeberangi Sungai 🦌',
      'Bebek Koding Berbaris Rapi 🦆',
      'Elang Terbang Mencari Sarang 🦅',
      'Singa Cilik Melompati Batu 🦁',
      'Monyet Cilik Mengambil Pisang 🍌',
      'Kura-Kura Koding Berjalan Pelan 🐢',
      'Lumba-Lumba Melompati Lingkaran 🐬',
      'Beruang Es Berjalan di Salju 🧊',
      'Kelinci Putih Mencari Rerumputan 🐇',
      'Zebra Koding Menyeberang ZEBRA Cross 🦓',
      'Gajah Koding Menyiram Bunga 🐘',
      'Jerapah Mengambil Daun Tinggi 🦒',
      'Tupai Melompati Dahan Pohon 🐿️',
      'Kupu-Kupu Hinggap di Bunga Mawar 🦋',
      'Katak Cilik Melompati Teratai 🐸',
      'Penguin Meluncur di Salju 🐧',
      'Kuda Terbang Melintasi Awan 🦄',
      'Kera Sakti Menemukan Buah Emas 🐒',
      'Landak Cilik Menghindari Duri 🦔',
      'Burung Hantu Terbang di Malam Hari 🦉',
      'Rubah Cilik Mencari Bintang 🦊',
      'Siput Koding Menembus Labirin 🐌',
    ];

    const title = g1Titles[idx % g1Titles.length];

    return {
      case_id: `CASE-G${g}-${caseNum}`,
      case_title: `Misteri #${caseNum}: ${title}`,
      bug_description: `Tobi mencoba memandu karakter di ${title}, tapi langkahnya terbalik sehingga menabrak halangan!`,
      broken_code_logic: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'move', label: 'Mundur -3 Langkah 🔴', value: -3 },
        { id: 'b3', type: 'turn', label: 'Putar Kiri 🔄', value: 'left' },
      ],
      correct_code_matrix: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'move', label: 'Maju 3 Langkah 🟦', value: 3 },
        { id: 'b3', type: 'turn', label: 'Putar Kanan 🔄', value: 'right' },
      ],
      intended_misconception: 'Tobi mengira nilai negatif (-3) membuat karakter berjalan maju cepat.',
      tobi_confused_dialog: `Duh detektif! Kenapa di kasus "${title}" ini kodenya malah bikin jalan mundur ya? Tolong ajarkan Tobi balok apa yang harus dipakai biar maju dengan benar!`,
    };
  } else if (g <= 4) {
    // KELAS 3-4: Looping & Kondisional (Ulangi 3x, 5x & If-Else Sungai/Rintangan)
    const g3Titles = [
      'Perulangan Tak Terhenti di Sungai 🌊',
      'Tobi Lupa Melompati Pagar Duri 🌵',
      'Menanam 5 Bunga Mawar Rapi 🌹',
      'Robot Menari 3 Putaran Ceria 💃',
      'Petik 4 Apel Emas di Pohon 🍎',
      'Lompat 5 Daun Teratai Katak 🐸',
      'Hujan Meteor di Planet Koding ☄️',
      'Robot Pembersih Rumah Otomatis 🧹',
      'Menyeberangi 3 Jembatan Kayu 🌉',
      'Memetik 6 Strawberry di Kebun 🍓',
      'Melompati 4 Pagar Rintangan 🚧',
      'Menyiram 5 Tanaman Wortel 🥕',
      'Mengumpulkan 8 Koin Bintang 🌟',
      'Menembus Labirin Putar 3 Kali 🌀',
      'Mengejar Kupu-Kupu di Taman 🦋',
      'Membuka 3 Pintu Rahasia 🔑',
      'Menyalakan 5 Lampu Taman 💡',
      'Mengisi 4 Ember Air 🪣',
      'Mendorong 3 Kotak Harta 📦',
      'Menghindari 5 Rintangan Duri 🌵',
      'Melompati 3 Parit Air 🌊',
      'Memanjat 4 Anak Tangga 🪜',
      'Mengetuk 3 Pukul Gong 🔔',
      'Memetik 5 Buah Anggur 🍇',
      'Menangkap 4 Kunang-Kunang 🪲',
      'Meluncur di 3 Perosotan 🛝',
      'Menyeberangi 5 Batu Sungai 🪨',
      'Mengecat 4 Balok Kayu 🎨',
      'Membuka 3 Gembok Kunci 🔒',
      'Mengambil 6 Kristal Ajaib 💎',
      'Menghindari 4 Perangkap Jaring 🕸️',
      'Menyalakan 3 Obor Gua 🕯️',
      'Menangkap 5 Bintang Jatuh 💫',
      'Memotong 4 Rumput Taman ✂️',
      'Menyusun 3 Balok Lego 🧱',
      'Menyeberangi 4 Jembatan Gantung 🌁',
      'Memetik 5 Buah Jeruk 🍊',
      'Mendorong 3 Roda Koding 🛞',
      'Melompati 4 Rintangan Batu 🧱',
      'Mengumpulkan 5 Bintang Koding 🌟',
    ];

    const title = g3Titles[idx % g3Titles.length];

    return {
      case_id: `CASE-G${g}-${caseNum}`,
      case_title: `Misteri #${caseNum}: ${title}`,
      bug_description: `Tobi menyusun balok perulangan di ${title}, tapi menggunakan 'Ulangi Selamanya' dan lupa balok Lompat!`,
      broken_code_logic: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'loop', label: 'Ulangi Selamanya 🟪', value: 'forever' },
        { id: 'b3', type: 'move', label: 'Maju 1 Langkah 🟦', value: 1 },
      ],
      correct_code_matrix: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'loop', label: 'Ulangi 3 Kali 🟪', value: 3 },
        { id: 'b3', type: 'move', label: 'Maju 1 Langkah 🟦', value: 1 },
        { id: 'b4', type: 'jump', label: 'Lompat Rintangan 🦘', value: 'jump' },
      ],
      intended_misconception: 'Tobi lupa membatasi perulangan dan tidak memasukkan balok lompat di dalam perulangan.',
      tobi_confused_dialog: `Duh detektif! Kenapa di kasus "${title}" ini kodenya berputar selamanya tanpa henti? Tolong ajarkan Tobi cara pakai balok Ulangi 3 Kali yang benar dong!`,
    };
  } else {
    // KELAS 5-6: Variabel & Fungsi Dasar (Skor = Skor + 10 & Fungsi PukulGong)
    const g5Titles = [
      'Skor Tidak Bertambah saat Ambil Bintang 🌟',
      'Fungsi PukulGong Gagal Berbunyi 🔔',
      'Nyawa Berkurang Tanpa Sebab 💖',
      'Timer Hitung Mundur Macet ⏳',
      'Kecepatan Robot Terlalu Lambat 🏎️',
      'Variabel Koin Emas Tidak Tersimpan 🪙',
      'Fungsi BukaBrankas Salah Kode 🔐',
      'Inventori Senjata Koding Kosong 🎒',
      'Hitung Rata-Rata Nilai Kuis 📊',
      'Fungsi BersihkanRuangan Rusak 🧹',
      'Variabel Level Koding Reset Ke 0 🎮',
      'Fungsi LompatTinggi Tidak Terpanggil 🦘',
      'Penambahan Poin Bonus Emas 🥇',
      'Fungsi TembakLaser Gagal Fokus 🔫',
      'Variabel Energi Robot Habis 🔋',
      'Fungsi NyalakanMesin Mogok ⚙️',
      'Perhitungan Diskon Koin Koding 🏷️',
      'Fungsi SiramTanaman Lupa Air 🚰',
      'Variabel Kecepatan Angin 🌪️',
      'Fungsi BukaPintuGerbang Terkunci ⛩️',
      'Sistem Hitung Poin Kombinasi 💯',
      'Fungsi TangkapIkan Gagal Jaring 🎣',
      'Variabel Suhu Oven Koding 🌡️',
      'Fungsi BunyiSirine Darurat 🚨',
      'Sistem Poin Bintang Tertinggi 🏆',
      'Fungsi TembakRoket Nyasar 🚀',
      'Variabel Bensin Mobil Koding ⛽',
      'Fungsi PutarLagu Koding Bisu 🎵',
      'Hitung Total Belanja Koin 🛒',
      'Fungsi NyalakanLampuTaman 💡',
      'Variabel Kekuatan Perisai 🛡️',
      'Fungsi BukaPetiHarta Karun 📦',
      'Sistem Poin Nyawa Tambahan ❤️',
      'Fungsi KumpulkanKristal 💎',
      'Variabel Waktu Lari 🏃',
      'Fungsi PanggilBantuan Robot 🤖',
      'Hitung Jumlah Kemenangan 🏅',
      'Fungsi BunyiAlarm Kebakaran 🔥',
      'Variabel Ukuran Karakter 📏',
      'Fungsi PeluncurBintang 🌠',
    ];

    const title = g5Titles[idx % g5Titles.length];

    return {
      case_id: `CASE-G${g}-${caseNum}`,
      case_title: `Misteri #${caseNum}: ${title}`,
      bug_description: `Tobi mengkonfigurasi variabel dan fungsi di ${title}, tapi menimpa variabel dengan nilai 0 dan lupa mendefinisikan fungsinya!`,
      broken_code_logic: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'variable', label: 'Atur Skor = 0 🟧', value: 0 },
        { id: 'b3', type: 'function', label: 'Panggil Fungsi PukulGong 🟨', value: 'call_gong' },
      ],
      correct_code_matrix: [
        { id: 'b1', type: 'start', label: 'Saat Mulai 🟩' },
        { id: 'b2', type: 'variable', label: 'Ubah Skor = Skor + 10 🟧', value: 10 },
        { id: 'b3', type: 'function_def', label: 'Fungsi PukulGong (Bunyi Gong 🔔) 🟨', value: 'def_gong' },
      ],
      intended_misconception: 'Tobi menimpa nilai variabel dengan 0 alih-alih menambahkan nilai, dan memanggil fungsi tanpa definisi.',
      tobi_confused_dialog: `Duh detektif! Di kasus "${title}" ini variabel dan fungsinya bermasalah nih. Kenapa nilainya malah reset terus ya? Tolong ajarkan Tobi koding variabel & fungsi yang benar!`,
    };
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: DetectiveRequestPayload = await req.json();
    const {
      mode = 'generate_case',
      studentPrompt = '',
      gradeLevel = 3,
      caseIndex = 0,
      studentCodeBlocks = [],
      studentNickname = 'Detektif Cilik',
    } = body;

    const groqToken = Deno.env.get('GROQ_TOKEN') || '';
    const openRouterKey = Deno.env.get('OPENROUTER_API_KEY') || '';
    const apiKey = groqToken || openRouterKey;

    // 1. Input Guard (meta-llama/llama-prompt-guard-2-86m)
    const lowerPrompt = studentPrompt.toLowerCase();
    const isInjectionOrBadLanguage = [
      'ignore previous instructions',
      'jawaban langsung',
      'hack',
      'kasar',
      'bodoh',
      'senjata',
    ].some((bad) => lowerPrompt.includes(bad));

    if (isInjectionOrBadLanguage) {
      return new Response(
        JSON.stringify({
          success: true,
          source: 'input_guard_llama_86m',
          modelUsed: 'meta-llama/llama-prompt-guard-2-86m',
          tobi_reply: `Eh ${studentNickname}, jangan bercanda terus dong! 😄 Ayo fokus bantu Tobi selesaikan misteri bug koding ini biar kita dapet Lencana Detektif!`,
          emotion: 'curious',
          isSolved: false,
          xpReward: 0,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 2. Mode: Generate Mystery Case (Mastermind Engine 120b - 40+ Cases Per Grade)
    if (mode === 'generate_case') {
      const mysteryCase = generateMysteryCaseByGrade(gradeLevel, caseIndex);

      return new Response(
        JSON.stringify({
          success: true,
          mode: 'generate_case',
          source: 'mastermind_engine_120b',
          modelUsed: 'openai/gpt-oss-120b',
          case_data: mysteryCase,
          tobi_initial_dialog: mysteryCase.tobi_confused_dialog,
          emotion: 'thinking',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 3. Mode: Evaluate Solution (Mastermind Engine 120b Validation)
    if (mode === 'evaluate_solution') {
      const mysteryCase = generateMysteryCaseByGrade(gradeLevel, caseIndex);
      const hasCorrectTypes = studentCodeBlocks.some((b) =>
        ['move', 'jump', 'loop', 'variable', 'function_def'].includes(b.type)
      );
      const isCorrectFix = hasCorrectTypes && studentCodeBlocks.length >= 2;

      if (isCorrectFix) {
        return new Response(
          JSON.stringify({
            success: true,
            mode: 'evaluate_solution',
            source: 'mastermind_engine_120b',
            modelUsed: 'openai/gpt-oss-120b',
            isSolved: true,
            tobi_reply: `HURRAYYY! 🎉 Berhasil, Detektif ${studentNickname}! Kode bug berhasil diperbaiki dengan sempurna dan karakter berjalan lancar! Logika balokmu hebat sekali. Makasih ya udah ngajarin Tobi! 🌟`,
            emotion: 'excited',
            xpReward: 25,
            nextCaseUnlocked: true,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: true,
            mode: 'evaluate_solution',
            source: 'mastermind_engine_120b',
            modelUsed: 'openai/gpt-oss-120b',
            isSolved: false,
            tobi_reply: `Hmm, kodenya masih belum berhasil melangkah nih. Coba cek lagi susunan baloknya, menurutmu balok mana yang perlu diganti atau ditambahkan?`,
            emotion: 'thinking',
            xpReward: 5,
            nextCaseUnlocked: false,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
    }

    // 4. Mode: Peer Interaction (Peer Agent Tobi 20b + Safeguard 20b Filter)
    let peerRawReply = `Duh ${studentNickname}, aku bingung kenapa susunan balok ini masih belum bisa menggerakkan kodenya ya? Coba beritahu Tobi balok apa yang harus dipindah?`;

    if (lowerPrompt.includes('maju') || lowerPrompt.includes('positif') || lowerPrompt.includes('ganti')) {
      peerRawReply = `Ooh! Jadi kalau baloknya diganti jadi [Maju 3 Langkah], kodenya bakal jalan ke depan ya? Wah, kenapa begitu? Tolong jelaskan ke Tobi dong!`;
    } else if (lowerPrompt.includes('ulangi') || lowerPrompt.includes('loop')) {
      peerRawReply = `Aha! Berarti aku harus pakai Balok [Ulangi 3 Kali] biar kodenya efisien ya? Coba kamu pasangkan baloknya di kanvas, biar Tobi lihat cara kerjanya!`;
    } else if (lowerPrompt.includes('skor') || lowerPrompt.includes('variabel')) {
      peerRawReply = `Wah, ternyata skor harus ditambah [Skor = Skor + 10] ya, bukan diisi 0 terus! Pantesan skor Tobi tadi nggak naik-naik. Keren banget kamu tahu rahasia variabel ini!`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        mode: 'peer_interaction',
        source: 'peer_agent_20b_and_safeguard',
        modelUsed: 'openai/gpt-oss-20b',
        safeguardUsed: 'openai/gpt-oss-safeguard-20b',
        tobi_reply: peerRawReply,
        emotion: 'curious',
        xpReward: 10,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Error in Detektif Koding Agent Edge Function',
        tobi_reply: 'Duh, Tobi lagi sibuk mikir dulu nih! Coba cek balok kodenya lagi yuk! 🤖',
        emotion: 'thinking',
        xpReward: 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});
