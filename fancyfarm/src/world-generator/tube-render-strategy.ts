import { TubeSpec } from 'src/scene/tube';
import { Block } from './block';
import { type } from 'os';


export interface TubeRenderer {
  new(queue: Block[]): TubeSpec;
}

export class SimpleTubeRenderer implements TubeSpec {
  constructor(private queue: Block[]) {}

  getX(t: number) {
    return this.queue[t].position.x;
  }

  getY(t: number) {
    return this.queue[t].position.y;
  }

  getZ(t: number) {
    return this.queue[t].position.z;
  }
}