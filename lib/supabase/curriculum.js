import { supabase } from './client.js';

/**
 * Pemetaan Data Kurikulum Realtime Berdasarkan Kelas
 */
const DEFAULT_CURRICULUM = {
  // Kelas 1-2 SD: Dunia Ikon & Suara
  1: [
    { island_number: 1, island_title: 'Pulau 1: Taman Suara', icon: '🎵', desc: 'Urutan ikon musik ceria untuk menyambut Kiko di desa.', tag: 'Urutan Ikon Musik', required_blocks: ['sound'], target_distance: 2, river_width: 0, theme: 'village' },
    { island_number: 2, island_title: 'Pulau 2: Hutan Langkah', icon: '🐾', desc: 'Petunjuk arah dan urutan langkah jalan sederhana.', tag: 'Arah & Urutan', required_blocks: ['move'], target_distance: 3, river_width: 0, theme: 'forest' },
    { island_number: 3, island_title: 'Pulau 3: Danau Warna', icon: '🎨', desc: 'Mencocokkan pola warna-warni bunga air.', tag: 'Pola Warna', required_blocks: ['move', 'sound'], target_distance: 3, river_width: 1, theme: 'river' },
    { island_number: 4, island_title: 'Pulau 4: Buah Gemas', icon: '🍎', desc: 'Perulangan gambar buah apel dan jeruk segar.', tag: 'Perulangan Gambar', required_blocks: ['repeat', 'move'], target_distance: 4, river_width: 1, theme: 'forest' },
    { island_number: 5, island_title: 'Pulau 5: Pesta Hewan', icon: '🐱', desc: 'Perpaduan gerak tari dan suara hewan lucu.', tag: 'Suara & Gerak', required_blocks: ['jump', 'sound'], target_distance: 3, river_width: 2, theme: 'village' },
    { island_number: 6, island_title: 'Pulau 6: Istana Bintang', icon: '⭐', desc: 'Tantangan jalur akhir menuju gerbang istana bintang.', tag: 'Jalur Akhir Master', required_blocks: ['move', 'jump', 'repeat'], target_distance: 5, river_width: 2, theme: 'space' },
  ],
  2: [
    { island_number: 1, island_title: 'Pulau 1: Taman Suara', icon: '🎵', desc: 'Urutan ikon musik ceria untuk menyambut Kiko di desa.', tag: 'Urutan Ikon Musik', required_blocks: ['sound'], target_distance: 2, river_width: 0, theme: 'village' },
    { island_number: 2, island_title: 'Pulau 2: Hutan Langkah', icon: '🐾', desc: 'Petunjuk arah dan urutan langkah jalan sederhana.', tag: 'Arah & Urutan', required_blocks: ['move'], target_distance: 3, river_width: 0, theme: 'forest' },
    { island_number: 3, island_title: 'Pulau 3: Danau Warna', icon: '🎨', desc: 'Mencocokkan pola warna-warni bunga air.', tag: 'Pola Warna', required_blocks: ['move', 'sound'], target_distance: 3, river_width: 1, theme: 'river' },
    { island_number: 4, island_title: 'Pulau 4: Buah Gemas', icon: '🍎', desc: 'Perulangan gambar buah apel dan jeruk segar.', tag: 'Perulangan Gambar', required_blocks: ['repeat', 'move'], target_distance: 4, river_width: 1, theme: 'forest' },
    { island_number: 5, island_title: 'Pulau 5: Pesta Hewan', icon: '🐱', desc: 'Perpaduan gerak tari dan suara hewan lucu.', tag: 'Suara & Gerak', required_blocks: ['jump', 'sound'], target_distance: 3, river_width: 2, theme: 'village' },
    { island_number: 6, island_title: 'Pulau 6: Istana Bintang', icon: '⭐', desc: 'Tantangan jalur akhir menuju gerbang istana bintang.', tag: 'Jalur Akhir Master', required_blocks: ['move', 'jump', 'repeat'], target_distance: 5, river_width: 2, theme: 'space' },
  ],
  // Kelas 3-4 SD: Dunia Blok & Logika
  3: [
    { island_number: 1, island_title: 'Pulau 1: Desa Urutan', icon: '🏡', desc: 'Langkah pertama Kiko menuju gerbang desa.', tag: 'Dasar Sequence', required_blocks: ['move'], target_distance: 3, river_width: 0, theme: 'village' },
    { island_number: 2, island_title: 'Pulau 2: Hutan Perulangan', icon: '🌲', desc: 'Bantu Kiko melompati pohon lebat dengan balok Loop 3 Kali!', tag: 'Perulangan (Loop)', required_blocks: ['move', 'repeat'], target_distance: 4, river_width: 2, theme: 'forest' },
    { island_number: 3, island_title: 'Pulau 3: Gunung Kondisi', icon: '⛰️', desc: 'Memilih jalur aman dengan balok pembuat keputusan If.', tag: 'Logika If / Else', required_blocks: ['move', 'jump'], target_distance: 4, river_width: 1, theme: 'mountain' },
    { island_number: 4, island_title: 'Pulau 4: Rawa Rintangan', icon: '🐊', desc: 'Kombinasi perulangan dan kondisi melewati rawa.', tag: 'Kombinasi Loop + If', required_blocks: ['repeat', 'jump'], target_distance: 5, river_width: 2, theme: 'river' },
    { island_number: 5, island_title: 'Pulau 5: Goa Misteri', icon: '🦇', desc: 'Navigasi sensor koding di tempat gelap.', tag: 'Sensor & Navigasi', required_blocks: ['move', 'sound', 'jump'], target_distance: 5, river_width: 1, theme: 'lab' },
    { island_number: 6, island_title: 'Pulau 6: Benteng Kiko', icon: '🏰', desc: 'Menyusun algoritma lengkap penakluk benteng.', tag: 'Algoritma Master', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'space' },
  ],
  4: [
    { island_number: 1, island_title: 'Pulau 1: Desa Urutan', icon: '🏡', desc: 'Langkah pertama Kiko menuju gerbang desa.', tag: 'Dasar Sequence', required_blocks: ['move'], target_distance: 3, river_width: 0, theme: 'village' },
    { island_number: 2, island_title: 'Pulau 2: Hutan Perulangan', icon: '🌲', desc: 'Bantu Kiko melompati pohon lebat dengan balok Loop 3 Kali!', tag: 'Perulangan (Loop)', required_blocks: ['move', 'repeat'], target_distance: 4, river_width: 2, theme: 'forest' },
    { island_number: 3, island_title: 'Pulau 3: Gunung Kondisi', icon: '⛰️', desc: 'Memilih jalur aman dengan balok pembuat keputusan If.', tag: 'Logika If / Else', required_blocks: ['move', 'jump'], target_distance: 4, river_width: 1, theme: 'mountain' },
    { island_number: 4, island_title: 'Pulau 4: Rawa Rintangan', icon: '🐊', desc: 'Kombinasi perulangan dan kondisi melewati rawa.', tag: 'Kombinasi Loop + If', required_blocks: ['repeat', 'jump'], target_distance: 5, river_width: 2, theme: 'river' },
    { island_number: 5, island_title: 'Pulau 5: Goa Misteri', icon: '🦇', desc: 'Navigasi sensor koding di tempat gelap.', tag: 'Sensor & Navigasi', required_blocks: ['move', 'sound', 'jump'], target_distance: 5, river_width: 1, theme: 'lab' },
    { island_number: 6, island_title: 'Pulau 6: Benteng Kiko', icon: '🏰', desc: 'Menyusun algoritma lengkap penakluk benteng.', tag: 'Algoritma Master', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'space' },
  ],
  // Kelas 5-6 SD: Dunia Algoritma & Game
  5: [
    { island_number: 1, island_title: 'Pulau 1: Kota Variabel', icon: '🏙️', desc: 'Pengumpulan koin emas & brankas penyimpanan skor.', tag: 'Skor & Variabel', required_blocks: ['move', 'repeat'], target_distance: 4, river_width: 0, theme: 'city' },
    { island_number: 2, island_title: 'Pulau 2: Arena Tembak Skor', icon: '🎯', desc: 'Perhitungan waktu presisi & poin tertinggi.', tag: 'Timer & Skor', required_blocks: ['repeat', 'jump'], target_distance: 4, river_width: 1, theme: 'city' },
    { island_number: 3, island_title: 'Pulau 3: Labirin Algoritma', icon: '🔬', desc: 'Penyelesaian rute kompleks menggunakan fungsi.', tag: 'Fungsi & Rute', required_blocks: ['move', 'jump', 'repeat'], target_distance: 5, river_width: 2, theme: 'lab' },
    { island_number: 4, island_title: 'Pulau 4: Cyber City', icon: '🤖', desc: 'Deteksi benturan dan collision detector.', tag: 'Collision Detect', required_blocks: ['repeat', 'jump'], target_distance: 5, river_width: 1, theme: 'city' },
    { island_number: 5, island_title: 'Pulau 5: Boss Battle Logic', icon: '👾', desc: 'Timer dan logika berlapis penakluk monster.', tag: 'Logic Nested', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'lab' },
    { island_number: 6, island_title: 'Pulau 6: Antariksa Kode', icon: '🚀', desc: 'Membuat game mini utuh di panggung antariksa.', tag: 'Full Game Architecture', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'space' },
  ],
  6: [
    { island_number: 1, island_title: 'Pulau 1: Kota Variabel', icon: '🏙️', desc: 'Pengumpulan koin emas & brankas penyimpanan skor.', tag: 'Skor & Variabel', required_blocks: ['move', 'repeat'], target_distance: 4, river_width: 0, theme: 'city' },
    { island_number: 2, island_title: 'Pulau 2: Arena Tembak Skor', icon: '🎯', desc: 'Perhitungan waktu presisi & poin tertinggi.', tag: 'Timer & Skor', required_blocks: ['repeat', 'jump'], target_distance: 4, river_width: 1, theme: 'city' },
    { island_number: 3, island_title: 'Pulau 3: Labirin Algoritma', icon: '🔬', desc: 'Penyelesaian rute kompleks menggunakan fungsi.', tag: 'Fungsi & Rute', required_blocks: ['move', 'jump', 'repeat'], target_distance: 5, river_width: 2, theme: 'lab' },
    { island_number: 4, island_title: 'Pulau 4: Cyber City', icon: '🤖', desc: 'Deteksi benturan dan collision detector.', tag: 'Collision Detect', required_blocks: ['repeat', 'jump'], target_distance: 5, river_width: 1, theme: 'city' },
    { island_number: 5, island_title: 'Pulau 5: Boss Battle Logic', icon: '👾', desc: 'Timer dan logika berlapis penakluk monster.', tag: 'Logic Nested', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'lab' },
    { island_number: 6, island_title: 'Pulau 6: Antariksa Kode', icon: '🚀', desc: 'Membuat game mini utuh di panggung antariksa.', tag: 'Full Game Architecture', required_blocks: ['move', 'repeat', 'jump', 'sound'], target_distance: 6, river_width: 2, theme: 'space' },
  ],
};

/**
 * Mengambil 6 Pulau Kurikulum Realtime dari Supabase
 *
 * @param {number|string} targetClass - Kelas SD (1 s.d 6)
 * @param {string} userId - ID Siswa dari Supabase Auth
 * @returns {Promise<Array>} Daftar 6 Pulau
 */
export async function getCurriculumMissionsByClass(targetClass = 3, userId = null) {
  const numericClass = parseInt(String(targetClass).replace(/\D/g, '')) || 3;

  let unlockedLevel = 2; // Default Pulau 1 & 2 terbuka

  // Fetch student progress dari Supabase
  if (userId) {
    try {
      const { data: progressData } = await supabase
        .from('student_progress')
        .select('level')
        .eq('student_id', userId)
        .single();

      if (progressData && progressData.level) {
        unlockedLevel = progressData.level + 1;
      }
    } catch (e) {
      console.warn('Unable to load progress level from Supabase:', e);
    }
  }

  // Coba query dari tabel Supabase `curriculum_missions`
  try {
    const { data: dbMissions, error } = await supabase
      .from('curriculum_missions')
      .select('*')
      .eq('target_class', numericClass)
      .order('island_number', { ascending: true });

    if (!error && dbMissions && dbMissions.length > 0) {
      return dbMissions.map((m) => {
        const isUnlocked = m.island_number <= unlockedLevel;
        return {
          id: m.island_number,
          title: m.island_title,
          icon: m.icon || '🏡',
          unlocked: isUnlocked,
          status: isUnlocked
            ? m.island_number < unlockedLevel
              ? 'Tuntas ⭐⭐⭐'
              : '📍 Sedang Aktif'
            : '🔒 Terkunci',
          statusColor: isUnlocked
            ? m.island_number < unlockedLevel
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse'
            : 'bg-slate-200 text-slate-700 border-slate-300',
          borderColor: isUnlocked
            ? m.island_number < unlockedLevel
              ? 'border-amber-300 bg-amber-50/70'
              : 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40'
            : 'border-slate-300 bg-slate-100/70 border-dashed',
          desc: m.mission_description || m.desc,
          tag: m.tag,
          required_blocks: m.required_blocks || ['move'],
          target_distance: m.target_distance || 4,
          river_width: m.river_width || 1,
          theme: m.theme || 'village',
        };
      });
    }
  } catch (err) {
    console.warn('Realtime Supabase query for curriculum_missions fallback:', err);
  }

  // Fallback Kurikulum Realtime
  const classMissions = DEFAULT_CURRICULUM[numericClass] || DEFAULT_CURRICULUM[3];

  return classMissions.map((m) => {
    const isUnlocked = m.island_number <= unlockedLevel;
    return {
      id: m.island_number,
      title: m.island_title,
      icon: m.icon,
      unlocked: isUnlocked,
      status: isUnlocked
        ? m.island_number < unlockedLevel
          ? 'Tuntas ⭐⭐⭐'
          : '📍 Sedang Aktif'
        : '🔒 Terkunci',
      statusColor: isUnlocked
        ? m.island_number < unlockedLevel
          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
          : 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse'
        : 'bg-slate-200 text-slate-700 border-slate-300',
      borderColor: isUnlocked
        ? m.island_number < unlockedLevel
          ? 'border-amber-300 bg-amber-50/70'
          : 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40'
        : 'border-slate-300 bg-slate-100/70 border-dashed',
      desc: m.desc,
      tag: m.tag,
      required_blocks: m.required_blocks,
      target_distance: m.target_distance,
      river_width: m.river_width,
      theme: m.theme,
    };
  });
}

/**
 * Membuka kunci pulau berikutnya di Supabase
 *
 * @param {string} userId - ID Siswa
 * @param {number} completedIsland - Nomor Pulau yang baru saja diselesaikan
 */
export async function unlockNextIslandInDatabase(userId, completedIsland) {
  if (!userId) return;

  try {
    const { data: existingProgress } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
      .single();

    const currentLevel = existingProgress?.level || 1;
    const newLevel = Math.max(currentLevel, completedIsland + 1);

    if (existingProgress) {
      await supabase
        .from('student_progress')
        .update({
          level: newLevel,
          xp: (existingProgress.xp || 0) + 100,
          updated_at: new Date().toISOString(),
        })
        .eq('student_id', userId);
    } else {
      await supabase.from('student_progress').insert({
        student_id: userId,
        level: newLevel,
        xp: 100,
        streak_days: 1,
      });
    }
  } catch (e) {
    console.error('Error unlocking next island in Supabase:', e);
  }
}
