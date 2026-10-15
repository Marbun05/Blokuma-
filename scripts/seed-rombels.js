import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to manually load .env file in Node ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const val = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  });
}

const patSupabase = process.env.PAT_SUPABASE || process.env.SUPABASE_ACCESS_TOKEN || '';
const projectRef = 'sjmnjoiqrtgxhknbnjyd';
const queryEndpoint = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;

async function runSqlQuery(sqlQuery) {
  const response = await fetch(queryEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${patSupabase}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sqlQuery }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Management API error [${response.status}]: ${errText}`);
  }

  return await response.json();
}

// Data Awal Rombel Kelas Valid & Aktif untuk Role Guru
const INITIAL_ROMBELS = [
  { name: 'Kelas 1A - Algoritma Dasar', join_code: 'BLK-1A' },
  { name: 'Kelas 2A - Pemrograman Visual', join_code: 'BLK-2A' },
  { name: 'Kelas 3A - Logika Koding Cilik', join_code: 'BLK-3A' },
  { name: 'Kelas 4A - SD Negeri 01', join_code: 'BLK-4A' },
  { name: 'Kelas 4B - SD Negeri 01', join_code: 'BLK-4B' },
  { name: 'Kelas 5A - Koding Lanjutan', join_code: 'BLK-5A' },
  { name: 'Kelas 6A - Robotik & Logic', join_code: 'BLK-6A' },
];

async function seedRombelDatabase() {
  console.log('====================================================');
  console.log('🚀 SEEDER DATABASE: Memulai Seeding Rombel Kelas...');
  console.log('====================================================');

  try {
    // 1. Perbarui/Pastikan RLS Policies pada tabel classrooms, classroom_students, dan profiles
    console.log('🔓 Menyesuaikan RLS Policy pada tabel database Supabase...');
    const setupRlsSql = `
      -- Enable RLS and setup permissive policies for app operations
      ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.classroom_students ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow public select classrooms" ON public.classrooms;
      CREATE POLICY "Allow public select classrooms" ON public.classrooms FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow all insert classrooms" ON public.classrooms;
      CREATE POLICY "Allow all insert classrooms" ON public.classrooms FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow all update classrooms" ON public.classrooms;
      CREATE POLICY "Allow all update classrooms" ON public.classrooms FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Allow all delete classrooms" ON public.classrooms;
      CREATE POLICY "Allow all delete classrooms" ON public.classrooms FOR DELETE USING (true);

      DROP POLICY IF EXISTS "Allow public select classroom_students" ON public.classroom_students;
      CREATE POLICY "Allow public select classroom_students" ON public.classroom_students FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow all insert classroom_students" ON public.classroom_students;
      CREATE POLICY "Allow all insert classroom_students" ON public.classroom_students FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow all update classroom_students" ON public.classroom_students;
      CREATE POLICY "Allow all update classroom_students" ON public.classroom_students FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Allow all delete classroom_students" ON public.classroom_students;
      CREATE POLICY "Allow all delete classroom_students" ON public.classroom_students FOR DELETE USING (true);

      DROP POLICY IF EXISTS "Allow public select profiles" ON public.profiles;
      CREATE POLICY "Allow public select profiles" ON public.profiles FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow all insert profiles" ON public.profiles;
      CREATE POLICY "Allow all insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow all update profiles" ON public.profiles;
      CREATE POLICY "Allow all update profiles" ON public.profiles FOR UPDATE USING (true);
    `;

    await runSqlQuery(setupRlsSql);
    console.log('✅ Kebijakan RLS database berhasil diperbarui!');

    // 2. Dapatkan ID profil pengajar / teacher
    const getTeachersSql = `SELECT id, full_name, role FROM public.profiles WHERE role = 'teacher';`;
    let teachers = await runSqlQuery(getTeachersSql);

    let teacherIds = (teachers || []).map((t) => t.id);

    if (teacherIds.length === 0) {
      // Ambil sembarang profil yang ada di profiles
      const getAnySql = `SELECT id, full_name FROM public.profiles LIMIT 1;`;
      const anyProfiles = await runSqlQuery(getAnySql);

      if (anyProfiles && anyProfiles.length > 0) {
        teacherIds = [anyProfiles[0].id];
      }
    }

    // Jika profiles masih kosong, buat dummy profile pengajar
    if (teacherIds.length === 0) {
      console.log('💡 Menyiapkan profil pengajar default di database...');
      const dummyId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      const createDummySql = `
        INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud)
        VALUES (
          '${dummyId}',
          '00000000-0000-0000-0000-000000000000',
          'guru@blokuma.com',
          '$2a$10$abcdefghijklmnopqrstuvwxyz123456',
          NOW(),
          '{"provider":"email","providers":["email"]}',
          '{"full_name":"Ibu Guru Ani, S.Pd.","role":"teacher"}',
          NOW(),
          NOW(),
          'authenticated',
          'authenticated'
        )
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO public.profiles (id, role, full_name, nickname, avatar_url, created_at, updated_at)
        VALUES (
          '${dummyId}',
          'teacher',
          'Ibu Guru Ani, S.Pd.',
          'Bu Ani',
          '👩‍🏫',
          NOW(),
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET role = 'teacher';
      `;
      await runSqlQuery(createDummySql);
      teacherIds = [dummyId];
      console.log(`✅ Profil pengajar default dibuat dengan ID: ${dummyId}`);
    }

    // 3. Seed data Rombel Kelas ke tabel public.classrooms
    let addedCount = 0;
    for (const teacherId of teacherIds) {
      for (const rombel of INITIAL_ROMBELS) {
        const insertRombelSql = `
          INSERT INTO public.classrooms (teacher_id, name, join_code, created_at)
          VALUES ('${teacherId}', '${rombel.name.replace(/'/g, "''")}', '${rombel.join_code}', NOW())
          ON CONFLICT (join_code) DO NOTHING
          RETURNING id, name, join_code;
        `;
        const res = await runSqlQuery(insertRombelSql);
        if (res && res.length > 0) {
          console.log(`✅ Rombel berhasil dibuat: [${res[0].join_code}] "${res[0].name}"`);
          addedCount++;
        } else {
          console.log(`ℹ️ Rombel sudah tersedia: [${rombel.join_code}] "${rombel.name}"`);
        }
      }
    }

    console.log('====================================================');
    console.log(`🎉 STATUS: Database Seeding Selesai! (${addedCount} Rombel Baru Ditambahkan)`);
    console.log('====================================================');
  } catch (err) {
    console.error('❌ Terjadi kesalahan saat menjalankan seeder:', err.message);
    process.exit(1);
  }
}

seedRombelDatabase();