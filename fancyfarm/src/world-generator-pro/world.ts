import { Vector3, Vector4, Quaternion, Euler } from 'three';
import { TubeSpec } from 'src/scene/tube';
import * as THREE from 'three';
import Updateable from 'src/scene/Updateable';

class PathElement {
  constructor(
    public position: Vector3,
    public key: number
  ) {}
}

class WorldUpdateHandler implements Updateable{

  constructor(private readonly world: World, private readonly player: {position: Vector3}) {}

  update(dt) {
    // console.log(this.player.position)
    if(this.world.checkUpdateStatus(this.player.position)) {
      this.world.update();
    }
  }
}

export class World implements TubeSpec {
  public queue: PathElement[] = [];

  private nextKey = 0;
  private lastPathSegment: Vector3;
  private maxOffset: number;
  private len_square: number;

  /**
   * 
   * @param len maximal length of an world segment
   * @param phi maximal angle compared to the sequential segment vectors
   */
  constructor(
    private readonly len: number,
    private readonly k: number,
    private readonly queueSize: number
  ) {
    this.maxOffset = k * len;
    this.len_square = len * len;
    this.lastPathSegment = new Vector3(this.len, 0, 0);
    this.initWorld();    
  }

  private initWorld() {
    this.queue = [new PathElement(new Vector3(0,0,0), this.nextKey)]
    this.nextKey++;
    for(let i=0; i < this.queueSize; i++) {
      this.pushNextElement();
    }
  }

  private calcRandomSegment() {
    let newSegment = this.lastPathSegment = this.lastPathSegment.clone().add(new Vector3(
      Math.random() * this.maxOffset,
      Math.random() * this.maxOffset,
      Math.random() * this.maxOffset
    ))

    if(newSegment.length() === 0) {
      newSegment = this.calcRandomSegment()
    } else {
      this.lastPathSegment = newSegment
        .normalize()
        .multiplyScalar(this.len);
      return this.lastPathSegment;
    }
  }

  private pushNextElement() {
    this.queue.push(
      new PathElement(
        this.queue[this.queue.length-1].position
          .clone()
          .add(this.calcRandomSegment()),
          this.nextKey
      )
    )
    this.nextKey++;
  }

  createUpdateHandler(player: {position: Vector3}) {
    return new WorldUpdateHandler(this, player);
  }

  update() {
    this.pushNextElement();
    this.queue.shift();
    console.log('new')
  }

  checkUpdateStatus({x,y,z}: Vector3): boolean {
    const s = 1/20;

    const fpos = this.queue[this.queue.length-1].position.clone();
    console.log(fpos);
    const dist = fpos.sub(new Vector3(s*x,s*y,-s*z)).lengthSq();
    console.log(dist)
    return dist < 100;
  }

  getVec(t_: number) {
    const ts = t_ * (this.queueSize - 1);
    const tFloor = Math.floor(ts); 
    const tCeil = Math.ceil(ts); 

    const t = ts - tFloor;

    const lowerVec = this.queue[tFloor].position.clone().multiplyScalar(1-t);
    const higherVec = this.queue[tCeil].position.clone().multiplyScalar(t);

    return lowerVec.add(higherVec);
  }

  getBlockById(id :number){
    for(let i = 0; i < this.queue.length; i++){
      if(this.queue[i].key === id){
        return this.queue[i];
      }
    }
  }


}