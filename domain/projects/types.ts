import { BlockASTNode } from '../../engine/blocks/ast/ast-node';

export interface ProjectEntity {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: 'Game' | 'Animation' | 'Story' | 'Music' | 'Science';
  blocks: BlockASTNode[];
  isPublic: boolean;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}
