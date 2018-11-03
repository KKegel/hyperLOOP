
import { Color, Vector3 } from "three";
import * as THREE from "three";

import Animator from './Animator';
import Updateable from "./Updateable";


class LightBulb implements Updateable{

  private sphere : THREE.SphereBufferGeometry;
  private light :THREE.PointLight;
  private id :number;

  private animator :Animator;

  constructor(color :Color, id :number, animator :Animator){
   
    this.animator = animator;
    this.id = id;

    this.light = new THREE.PointLight(color, 10, 10);
    this.sphere = new THREE.SphereBufferGeometry( 0.3, 64, 9 );
    this.light.add( new THREE.Mesh( this.sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );
  }

  public getLight() :THREE.PointLight {
    return this.light;
  }

  public getId() :number {
    return this.id;
  }

  public update(dt :number){
    let v3 :Vector3 = this.animator(dt);
    // console.log(v3);
    this.light.position.x = v3.x;
    this.light.position.y = v3.y;
    this.light.position.z = v3.z;
  }

}

export default LightBulb;