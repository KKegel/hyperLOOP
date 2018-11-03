import { TubeSpec } from 'src/scene/tube';
import { Block } from './block';
import { type } from 'os';


export interface TubeRenderer {
  new(queue: Block[]): TubeSpec;
}

export class SimpleTubeRenderer implements TubeSpec {
  private queueSize: number;

  constructor(private queue: Block[]) {
    this.queueSize = queue.length;
  }

  getVec(t_: number) {
    const offset = this.queue[0].position.scalarMult(-1);

    const ts = t_ * (this.queueSize - 1);
    const tFloor = Math.floor(ts); 
    const tCeil = Math.ceil(ts); 

    console.log(tCeil, tFloor, this.queue);

    const t = ts - tFloor;

    const lowerVec = this.queue[tFloor].position.scalarMult(1-t);
    const higherVec = this.queue[tCeil].position.scalarMult(t);

    return lowerVec.add(higherVec).add(offset);
  }

  // getX(t: number) {
  //   return this.queue[t].position.x;
  // }

  // getY(t: number) {
  //   return this.queue[t].position.y;
  // }

  // getZ(t: number) {
  //   return this.queue[t].position.z;
  // }
}