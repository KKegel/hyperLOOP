import { GridPoint } from './grid-point';
import { Direction, directionOpposite } from './direction';
import { getRandomIndex } from './random-index';
import { Block } from './block';
import { GeneratorStrategy } from './generator-strategy';
import { TubeRenderer } from './tube-render-strategy';



export class World {

  private queueSize: number;
  private queue: Block[];
  private pendingBlockPosition = new GridPoint(0,0,0);

  public readonly renderer: InstanceType<TubeRenderer>;

  constructor(
    private readonly generateStrategy: GeneratorStrategy,
    private readonly tubeRenderStrategy: TubeRenderer,
    queueSize?: number
  ) {
    this.queueSize = queueSize || 10;
    this.initGenerating();
    this.renderer = new tubeRenderStrategy(this.queue);
  }

  private initGenerating() {
    this.queue = new Array(this.queueSize)
      .fill(null)
      .map((val, idx) => new Block(
        new GridPoint(0, idx, 0),
        Direction.NORTH
      ));
    this.pendingBlockPosition.y = this.queueSize;
  }

  private checkIfBlocked(point: GridPoint) {
    return this.queue.some( ({position}) => 
      position.north.eq(point) ||
      position.south.eq(point) ||
      position.west.eq(point) ||
      position.east.eq(point) ||
      position.above.eq(point) ||
      position.under.eq(point)
    )
  }

  private calculateProbabilityForDirection(direction: Direction) {
    const lastBlock = this.queue[this.queue.length - 1];

    const isBlocked = this.checkIfBlocked(this.pendingBlockPosition.getNeighborByDirection(direction));
    const strategyProbability = this.generateStrategy(direction, this.pendingBlockPosition, this.queue);
    const isOppositeOfLastBlock = directionOpposite(lastBlock.direction) === direction;

    return strategyProbability* (isOppositeOfLastBlock ? 0.0 : 1.0) * (isBlocked ? 0.0 : 1.0);
  }

  public generateNewBlock() {
    this.queue.shift();
    const probabilities = [
      this.calculateProbabilityForDirection(Direction.NORTH),
      this.calculateProbabilityForDirection(Direction.SOUTH),
      this.calculateProbabilityForDirection(Direction.WEST),
      this.calculateProbabilityForDirection(Direction.EAST),
      this.calculateProbabilityForDirection(Direction.UP),
      this.calculateProbabilityForDirection(Direction.DOWN),
    ];
    // console.log(probabilities)

    const randomIndex = getRandomIndex(probabilities)

    const dirArray = [
      Direction.NORTH,
      Direction.SOUTH,
      Direction.WEST,
      Direction.EAST,
      Direction.UP,
      Direction.DOWN
    ];

    const calculatedDirection = dirArray[randomIndex];
    
    const newBlock = new Block(
      this.pendingBlockPosition,
      calculatedDirection
    );
    this.queue.push(newBlock);

    this.pendingBlockPosition = this.pendingBlockPosition.getNeighborByDirection(calculatedDirection);
  }

  // getQueue() {
  //   return this.queue;
  // }

}