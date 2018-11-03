export enum Direction {
  UP,
  DOWN,
  SOUTH,
  NORTH,
  WEST,
  EAST,
}
export function directionOpposite(direction: Direction) {
  switch(direction) {
    case Direction.NORTH:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.NORTH;
    case Direction.WEST:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.WEST;
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
  }
}