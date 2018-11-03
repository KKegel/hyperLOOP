import { GridPoint } from './grid-point';
import { Direction, directionOpposite } from './direction';
import { getRandomIndex } from './random-index';
import { Block } from './block';
import { GeneratorStrategy } from './generator-strategy';
import { TubeRenderer } from './tube-render-strategy';



export class World {

  private queueCounter: number = 0;
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
    // this.queue = new Array(this.queueSize)
    //   .fill(null)
    //   .map((val, idx) => new Block(
    //     idx,
    //     new GridPoint(0, idx, 0),
    //     Direction.NORTH
    //   ));
    // this.pendingBlockPosition.y = this.queueSize;
    // this.queueCounter = this.queueSize - 1;

    this.queue = [new Block(this.queueCounter, new GridPoint(0, 0, 0), Direction.NORTH)];
    this.pendingBlockPosition = new GridPoint(0, 1, 0);

    for(let i=this.queueSize-1; i > 0 ; i--)
      this.appendNewBlock();

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
    console.log(lastBlock, 'lastBlock')

    const isBlocked = this.checkIfBlocked(this.pendingBlockPosition.getNeighborByDirection(direction));
    const strategyProbability = this.generateStrategy(direction, this.pendingBlockPosition, this.queue);
    const isOppositeOfLastBlock = directionOpposite(lastBlock.direction) === direction;

    return strategyProbability * (isOppositeOfLastBlock ? 0.0 : 1.0) * (isBlocked ? 0.0 : 1.0);
  }

  private appendNewBlock() {
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
    this.queueCounter++;
    const newBlock = new Block(
      this.queueCounter,
      this.pendingBlockPosition,
      calculatedDirection
    );
    this.queue.push(newBlock);

    this.pendingBlockPosition = this.pendingBlockPosition.getNeighborByDirection(calculatedDirection);
  }

  public generateNewBlock() {
    this.queue.shift();
    this.appendNewBlock();
  }

  getMinimalBlockKey() {
    return this.queue[0].key;
  }

  getBlock(index: number) {
    return this.queue[index];
  }

  getBlockByKey(key :number){
    for(let i :number = 0; i < this.queue.length; i++){
      if(this.queue[i].key === key){
        return this.queue[i];
      }
    }
  }
}