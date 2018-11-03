
import { Color, Vector3 } from "three";
var randomColor = require('randomcolor'); 

import LightBulb from "./LightBulb";
import Wizard from "src/main/Wizard";
import Updateable from "./Updateable";


export const makeLight = (scene :THREE.Scene, wizard :Wizard, id :number) => {

    let color :Color = new Color(randomColor());

    const rx = Math.random();
    const ry = Math.random();
    const rz = Math.random();
    
    let bulb :LightBulb = new LightBulb(color, id, (dt :number) => {
      let time :number = Date.now() * 0.0005;
      
      return new Vector3(
        Math.sin( time * rx *0.5),
        Math.cos( time * ry *0.5),
        Math.sin( time * rz *0.5)
      )
    });

    wizard.addUpdateable(bulb);
    scene.add(bulb.getLight());
  
}

export class LightHandler implements Updateable{
  
  private wizard :Wizard;
  private scene :THREE.Scene;

  private bulbs :Map<number, LightBulb>;

  constructor(wizard :Wizard, scene :THREE.Scene, foresight :number){
    this.wizard = wizard;
    this.scene = scene;
  }

  public update(dt: number) :void {
    //get minimal index, remove bulbs with smaller index
  }

}