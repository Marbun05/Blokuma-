import { GradeLevel } from '../users/types';
import { BlockASTNode } from '../../engine/blocks/ast/ast-node';

export interface LessonEntity {
  id: string;
  worldId: number;
  title: string;
  grade: GradeLevel;
  story: string;
  concept: string;
  targetGoal: string;
  starterBlocks: BlockASTNode[];
  hints: string[];
}
