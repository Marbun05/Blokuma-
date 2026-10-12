const defineMission = (islandNumber, islandTitle, icon, desc, tag, theme, solutions, smartHint) => ({
  island_number: islandNumber,
  island_title: islandTitle,
  icon,
  desc,
  tag,
  theme,
  solutions,
  required_blocks: [...new Set(solutions.flat())],
  smart_hint: smartHint,
});

const gradesOneTwo = [
  defineMission(1, 'Pulau 1: Desa Urutan', '🏡', 'Bantu Kiko melangkah tiga kali sampai ke gerbang desa.', 'Urutan Langkah', 'village', [
    ['move', 'move', 'move'],
  ], 'Hai sobat Kiko, bantu Kiko melangkah 3 kali ke gerbang desa dengan menyusun balok Maju 1 Langkah tiga kali! 🚀'),
  defineMission(2, 'Pulau 2: Hutan Perulangan', '🌲', 'Bunyikan nada ceria berulang kali agar teman-teman hutan berkumpul.', 'Suara & Perulangan', 'forest', [
    ['sound', 'repeat'],
  ], 'Hai sobat Kiko, ayo bunyikan Suara Pop Ceria lalu letakkan Ulangi 3 Kali tepat sesudahnya supaya nadanya terdengar tiga kali! 🎵'),
  defineMission(3, 'Pulau 3: Gunung Kondisi', '⛰️', 'Ajak Kiko maju lalu melompati bukit kecil.', 'Maju & Melompat', 'mountain', [
    ['move', 'jump'],
  ], 'Hai sobat Kiko, Kiko perlu maju satu langkah, lalu melompat tinggi melewati bukit kecil. Susun Maju sebelum Melompat, ya! ⛰️'),
  defineMission(4, 'Pulau 4: Rawa Rintangan', '🐊', 'Bantu Kiko menyeberangi rawa dengan langkah dan lompatan yang tepat.', 'Tantangan Rawa', 'river', [
    ['move', 'jump', 'move'],
  ], 'Hai sobat Kiko, bantu Kiko menyeberangi rawa dengan urutan Maju, Melompat Tinggi, lalu Maju lagi! 🐊'),
  defineMission(5, 'Pulau 5: Goa Misteri', '🦇', 'Buka pintu goa dengan melangkah dan membunyikan nada ceria.', 'Langkah & Suara', 'cave', [
    ['move', 'sound'],
  ], 'Hai sobat Kiko, pintu goa akan terbuka setelah Kiko Maju satu langkah dan memainkan Suara Pop Ceria. ✨'),
  defineMission(6, 'Pulau 6: Benteng Kiko', '🏰', 'Rayakan kemenangan di benteng dengan lompatan dan suara ceria.', 'Perayaan Benteng', 'castle', [
    ['jump', 'sound'],
  ], 'Hai sobat Kiko, untuk merayakan kemenangan benteng, ajak Kiko Melompat Tinggi lalu mainkan Suara Pop Ceria! 🏰'),
];

const gradesThreeFour = [
  defineMission(1, 'Pulau 1: Desa Urutan', '🏡', 'Bantu Kiko melangkah tiga kali sampai ke gerbang desa.', 'Urutan & Perulangan', 'village', [
    ['move', 'repeat'],
    ['move', 'move', 'move'],
  ], 'Hai sobat Kiko, Kiko perlu maju 1 langkah dan mengulanginya 3 kali. Letakkan Ulangi 3 Kali tepat setelah Maju, atau susun Maju tiga kali! 🚀'),
  defineMission(2, 'Pulau 2: Hutan Perulangan', '🌲', 'Bantu Kiko melompati pohon lebat dengan balok Loop 3 Kali!', 'Loop Lompatan', 'forest', [
    ['jump', 'repeat'],
  ], 'Hai sobat Kiko, pohonnya lebat! Susun Melompat Tinggi lalu Ulangi 3 Kali agar Kiko melompati rintangan tiga kali. 🌲'),
  defineMission(3, 'Pulau 3: Gunung Kondisi', '⛰️', 'Pilih jalur aman dengan melompati bukit lalu maju dua langkah.', 'Jalur Aman', 'mountain', [
    ['jump', 'move', 'move'],
  ], 'Hai sobat Kiko, pilih jalur aman: Melompat Tinggi melewati bukit, lalu Maju dua kali. ⛰️'),
  defineMission(4, 'Pulau 4: Rawa Rintangan', '🐊', 'Ajak Kiko maju ke rawa, lalu ulangi lompatan untuk melewatinya.', 'Kombinasi Rawa', 'river', [
    ['move', 'jump', 'repeat'],
  ], 'Hai sobat Kiko, Kiko perlu Maju dulu ke rawa, lalu Melompat Tinggi dan mengulanginya 3 kali. Pastikan blok Ulangi ada tepat setelah Melompat! 🐊'),
  defineMission(5, 'Pulau 5: Goa Misteri', '🦇', 'Bunyikan kode suara tiga kali untuk membuka jalan di dalam goa.', 'Kode Suara', 'cave', [
    ['sound', 'repeat'],
  ], 'Hai sobat Kiko, goa misterius akan menjawab jika Suara Pop Ceria diikuti Ulangi 3 Kali. Dengarkan nadanya bergema tiga kali! 🎵'),
  defineMission(6, 'Pulau 6: Benteng Kiko', '🏰', 'Gabungkan langkah dan lompatan berulang, lalu bunyikan tanda kemenangan.', 'Algoritma Master', 'castle', [
    ['move', 'jump', 'repeat', 'sound'],
  ], 'Hai sobat Kiko, susun Maju, lalu Melompat Tinggi dengan Ulangi 3 Kali tepat sesudahnya, dan akhiri dengan Suara Pop Ceria! 🏰'),
];

const gradesFiveSix = [
  defineMission(1, 'Pulau 1: Desa Urutan', '🏡', 'Navigasikan Kiko dengan satu langkah yang diulang tiga kali.', 'Navigasi Cepat', 'village', [
    ['move', 'repeat'],
  ], 'Hai sobat Kiko, sepertinya Kiko harus maju 1 langkah dan mengulanginya 3 kali untuk menyelesaikan misi ini! 🚀'),
  defineMission(2, 'Pulau 2: Hutan Perulangan', '🌲', 'Lewati pohon dan semak dengan lompatan berulang, lalu maju.', 'Rintangan Hutan', 'forest', [
    ['jump', 'repeat', 'move'],
  ], 'Hai sobat Kiko, bantu Kiko Melompat Tinggi dan mengulanginya 3 kali untuk melewati rintangan, lalu Maju setelahnya! 🌲'),
  defineMission(3, 'Pulau 3: Gunung Kondisi', '⛰️', 'Lewati tebing dengan melompat, maju, lalu mengulang langkah maju.', 'Tebing Gunung', 'mountain', [
    ['jump', 'move', 'repeat'],
  ], 'Hai sobat Kiko, Kiko perlu Melompat melewati tebing, lalu Maju dan mengulang langkah Maju itu 3 kali. 🏔️'),
  defineMission(4, 'Pulau 4: Rawa Rintangan', '🐊', 'Atur urutan lompatan, suara, dan langkah berulang untuk melewati jebakan rawa.', 'Jebakan Rawa', 'river', [
    ['jump', 'sound', 'move', 'repeat'],
  ], 'Hai sobat Kiko, lewati jebakan dengan Melompat, bunyikan Suara Pop, lalu Maju dan ulangi langkah Maju itu 3 kali! 🐊'),
  defineMission(5, 'Pulau 5: Goa Misteri', '🦇', 'Bunyikan kode, lompat, lalu ulangi lompatan untuk membuka goa.', 'Kode Goa', 'cave', [
    ['sound', 'jump', 'repeat'],
  ], 'Hai sobat Kiko, bunyikan Suara Pop sebagai kode, lalu Melompat dan ulangi lompatan itu 3 kali agar pintu goa terbuka! 🦇'),
  defineMission(6, 'Pulau 6: Benteng Kiko', '🏰', 'Tuntaskan algoritma master dengan langkah, lompatan, dan dua perulangan.', 'Algoritma Master Benteng', 'castle', [
    ['move', 'jump', 'repeat', 'sound', 'repeat'],
  ], 'Hai sobat Kiko, susun Maju, lalu Melompat dengan Ulangi 3 Kali, bunyikan Suara Pop, dan akhiri dengan Ulangi 3 Kali untuk mengulang suara! 🏰'),
];

const WORLD_DEFINITIONS = [
  {
    title: 'Dunia Ikon & Suara',
    classes: [1, 2],
    missions: gradesOneTwo,
  },
  {
    title: 'Dunia Blok & Logika',
    classes: [3, 4],
    missions: gradesThreeFour,
  },
  {
    title: 'Dunia Algoritma & Game',
    classes: [5, 6],
    missions: gradesFiveSix,
  },
];

export function normalizeStudentClass(targetClass) {
  const parsedClass = Number.parseInt(String(targetClass ?? '').replace(/\D/g, ''), 10);
  return Number.isInteger(parsedClass) && parsedClass >= 1 && parsedClass <= 6 ? parsedClass : 3;
}

export function getCurriculumWorld(targetClass) {
  const studentClass = normalizeStudentClass(targetClass);
  return WORLD_DEFINITIONS.find((world) => world.classes.includes(studentClass));
}

export function getCurriculumMission(targetClass, islandNumber) {
  const island = Number(islandNumber);
  return getCurriculumWorld(targetClass)?.missions.find((mission) => mission.island_number === island) ?? null;
}
