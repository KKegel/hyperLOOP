
import { Color, Vector3 } from "three";
var randomColor = require('randomcolor'); 

import LightBulb from "./LightBulb";
import Wizard from "src/main/Wizard";
import Updateable from "./Updateable";

import { world } from '../world-generator-pro';


export const makeLight = (id :number) :LightBulb => {

    let color :Color = new Color(randomColor());

    //console.log(id);
    let position = world.getBlockById(id).position;
    //console.log(position);

    const x = position.x;
    const y = position.y;
    const z = position.z;

    const rx = Math.random();
    const ry = Math.random();
    const rz = Math.random();
    
    let bulb :LightBulb = new LightBulb(color, id, (dt :number) => {
      let time :number = Date.now() * 0.003;
      
      return new Vector3(
        z + Math.sin( time * ry) *0.1,
        y + Math.cos( time * rx) *0.1,
        -x + Math.sin( time *rz) *0.1
      ).multiplyScalar( 20 );
    });

   return bulb;
  
}

export class LightHandler implements Updateable{
  
  private wizard :Wizard;
  private scene :THREE.Scene;

  private bulbs :Map<number, LightBulb>;
  private foresight :number;

  private sound: THREE.Audio;

  constructor(wizard :Wizard, scene :THREE.Scene, foresight :number){
    this.sound = null;
    this.wizard = wizard;
    this.scene = scene;
    this.foresight = foresight;

    this.bulbs = new Map();
  }

  public addSound(sound :THREE.Audio){
    this.sound = sound;
  }

  public update(dt: number) :void {

    //console.log("+++ update +++");

    let keys :Array<number> = new Array(this.foresight);

    for(let i: number = 0; i < this.foresight; i++){
      keys[i] = world.queue[i].key;
    }

    //console.log("foresight", this.foresight);
    //console.log(keys);

    this.bulbs.forEach((bulb, key) => {
      if(!keys.some(n => n === key)){
        
        this.scene.remove(bulb.getLight());
        this.wizard.removeUpdateable(bulb);
        this.bulbs.delete(key);
      }
    });

    keys.forEach(key => {
      if(!this.bulbs.has(key)){
        //throw new Error();
        let bulb :LightBulb = makeLight(key);
        if(this.sound !== null){
          this.sound.play();
        }
        this.bulbs.set(key, bulb);
        this.wizard.addUpdateable(bulb);
        this.scene.add(bulb.getLight());
      }
    });

  }

  getBulbs() :Map<number, LightBulb>{
    return this.bulbs;
  }

}