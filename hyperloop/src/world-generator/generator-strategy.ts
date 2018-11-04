import { Direction } from './direction';
import { GridPoint } from './grid-point';
import { Block } from './block';

export interface GeneratorStrategy {
  (direction: Direction, pendingBlockPos: GridPoint, queue: Block[]): number;
}

export const SimpleGeneratorStrategy: GeneratorStrategy = (direction: Direction, pendingBlockPos: GridPoint, queue: Block[]) => {
  return 1.0;
}

/**
 * 
 * @param branchingFactor "0" - no branching; "100" - straight and branch generation with equal probability
 */
export function BranchSensitiveGeneratorStrategyFactory(branchingFactor: number): GeneratorStrategy {
  return (direction: Direction, pendingBlockPos: GridPoint, queue: Block[]) => {
      return direction === queue[queue.length-1].direction ?
        100 :
        branchingFactor
  }
}