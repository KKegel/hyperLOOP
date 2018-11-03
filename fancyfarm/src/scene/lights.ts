
import { Color, Vector3 } from "three";
var randomColor = require('randomcolor'); 

import LightBulb from "./LightBulb";
import Wizard from "src/main/Wizard";


export const makeLights = (scene :THREE.Scene, wizard :Wizard, n :number) :void => {

  for(let i :number = 0; i < n; i++){

    let color :Color = new Color(randomColor());

    const rx = Math.random();
    const ry = Math.random();
    const rz = Math.random();
    
    let bulb :LightBulb = new LightBulb(color, (dt :number) => {
      let time :number = Date.now() * 0.0005;
      
      return new Vector3(
        Math.sin( time * rx *0.5) * 30,
        Math.cos( time * ry *0.5) * 40,
        Math.sin( time * rz *0.5) * 30
      )
    });

    wizard.addUpdateable(bulb);
    scene.add(bulb.getLight());
  }

}