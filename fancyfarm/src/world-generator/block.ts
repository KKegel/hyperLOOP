import { GridPoint } from './grid-point';
import { Direction } from './direction';

export class Block {
  constructor(
    public position: GridPoint,
    public direction: Direction
  ) {}
}