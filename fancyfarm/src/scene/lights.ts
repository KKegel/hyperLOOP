import { Color, Vector3 } from "three";
import * as THREE from "three";

import Animator from './Animator';
import Updateable from "./Updateable";


class LightBulb implements Updateable{

  private sphere : THREE.SphereBufferGeometry;
  private light :THREE.PointLight;

  private animator :Animator;

  constructor(color :Color, animator :Animator){
   
    this.animator = animator;

    this.light = new THREE.PointLight(color, 2, 50);
    this.sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    this.light.add( new THREE.Mesh( this.sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );
  }

  public getLight() :THREE.PointLight {
    return this.light;
  }

  public update(dt :number){
    let v3 :Vector3 = this.animator(dt);
    this.light.position.x = v3.x;
    this.light.position.y = v3.y;
    this.light.position.z = v3.z;
  }

}

export default LightBulb;