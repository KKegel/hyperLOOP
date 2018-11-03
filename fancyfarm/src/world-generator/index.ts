import { SimpleTubeRenderer } from './tube-render-strategy';
import { World } from './world';
import { SimpleGeneratorStrategy, BranchSensitiveGeneratorStrategyFactory } from './generator-strategy';

export { World } ;
export { SimpleTubeRenderer };

export const world = new World(
  BranchSensitiveGeneratorStrategyFactory(10),
  SimpleTubeRenderer,
  100
);

/*
//Just For debugging....
for(let i=0; i < 97 ; i++) {
  world.generateNewBlock();
}
*/