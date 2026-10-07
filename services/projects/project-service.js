import { supabaseClient } from '../../lib/supabase/client.js';

export const DEMO_PROJECT_DATA = [
  {
    id: 'proj-1',
    ownerId: 'user-kiko',
    title: 'Petualangan Luar Angkasa Kiko',
    description: 'Game aksi Kiko melintasi planet dan mengumpulkan koin bintang.',
    category: 'Game',
    blocks: [
      { id: 'b1', category: 'events', type: 'onStart', label: 'Saat Mulai' },
      { id: 'b2', category: 'motion', type: 'move', label: 'Maju 10 Langkah', value: 10 },
    ],
    isPublic: true,
    likesCount: 34,
    createdAt: '2026-10-01',
    updatedAt: '2026-10-05',
  },
];

export async function fetchUserProjects() {
  try {
    const { data, error } = await supabaseClient.from('projects').select('*');
    if (error || !data || data.length === 0) {
      return DEMO_PROJECT_DATA;
    }
    return data;
  } catch (err) {
    return DEMO_PROJECT_DATA;
  }
}

export async function createProjectInSupabase(project) {
  try {
    const { data, error } = await supabaseClient.from('projects').insert([project]).select();
    if (error) throw error;
    return data[0];
  } catch (err) {
    return { ...project, id: `proj-${Date.now()}` };
  }
}
