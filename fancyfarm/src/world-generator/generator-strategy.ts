import { Direction } from './direction';
import { GridPoint } from './grid-point';
import { Block } from './block';

export interface GeneratorStrategy {

  (direction: Direction, pendingBlockPos: GridPoint, lastBlock: Block): number;
}

export const SimpleStrategy: GeneratorStrategy = (direction: Direction, pendingBlockPos: GridPoint, lastBlock: Block) => {
  return 1.0;
}