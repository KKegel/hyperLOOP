import { SimpleTubeRenderer } from './tube-render-strategy';
import { World } from './world';
import { SimpleGeneratorStrategy } from './generator-strategy';

export { World } ;
export { SimpleTubeRenderer };

export const world = new World(SimpleGeneratorStrategy, SimpleTubeRenderer, 100);
for(let i=0; i < 97 ; i++) {
  world.generateNewBlock();
}

// console.log(world.getQueue());
// for(let i=0; i < 5; i++ ) {
//   world.generateNewBlock();
//   console.log(world.getQueue());
// }