export type BlockCategory = 'motion' | 'control' | 'events' | 'looks' | 'sound' | 'variables';

export interface BlockASTNode {
  id: string;
  category: BlockCategory;
  type: string;
  label: string;
  value?: number | string | boolean;
  icon?: string;
  children?: BlockASTNode[];
}
