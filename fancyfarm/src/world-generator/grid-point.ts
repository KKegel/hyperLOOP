import { Direction } from './direction';

export class GridPoint {
  constructor(public x: number, public y: number, public z: number) {}

  get north() {
    return new GridPoint(this.x, this.y + 1, this.z)
  }
  get south() {
    return new GridPoint(this.x, this.y - 1, this.z)
  }
  get west() {
    return new GridPoint(this.x + 1, this.y, this.z)
  }
  get east() {
    return new GridPoint(this.x - 1, this.y, this.z)
  }
  get above() {
    return new GridPoint(this.x, this.y, this.z + 1)
  }
  get under() {
    return new GridPoint(this.x, this.y, this.z - 1)
  }

  getNeighborByDirection(direction: Direction) {
    switch(direction) {
      case Direction.NORTH:
        return this.north;
      case Direction.SOUTH:
        return this.south;
      case Direction.WEST:
        return this.east;
      case Direction.EAST:
        return this.west;
      case Direction.UP:
        return this.above;
      case Direction.DOWN:
        return this.under;
    }
  }

  moveNorth() {
    this.y =+ 1;
  }
  moveSouth() {
    this.y =- 1;
  }
  moveWest() {
    this.x =+ 1;
  }
  moveEast() {
    this.x =- 1;
  }
  moveUp() {
    this.z =+ 1;
  }
  moveDown() {
    this.z =- 1;
  }

  toArray(): [number, number, number] {
    return  [this.x, this.y, this.z];
  }

  eq(point: GridPoint) {
    return point.x === this.x &&
      point.y === this.y &&
      point.z === this.z;
  }
}

