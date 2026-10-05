import { ProjectEntity } from '../../domain/projects/types';

export const DEMO_PROJECT_DATA: ProjectEntity[] = [
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

export async function fetchUserProjects(): Promise<ProjectEntity[]> {
  return DEMO_PROJECT_DATA;
}
