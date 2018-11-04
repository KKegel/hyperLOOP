
import { Color, Vector3 } from "three";
import * as THREE from "three";

import Animator from './Animator';
import Updateable from "./Updateable";


class LightBulb implements Updateable{

  private sphere : THREE.SphereBufferGeometry;
  private light :THREE.PointLight;
  private mesh :THREE.Mesh;
  private id :number;

  private animator :Animator;

  constructor(color :Color, id :number, animator :Animator){
   
    this.animator = animator;
    this.id = id;

    this.light = new THREE.PointLight(color, 6, 12);
    this.sphere = new THREE.SphereBufferGeometry( 0.7, 64, 9 );
    this.mesh = new THREE.Mesh( this.sphere, new THREE.MeshBasicMaterial( { color: color } ) );
    this.light.add( this.mesh  );
  }

  public getLight() :THREE.PointLight {
    return this.light;
  }

  public getGeometry() :THREE.SphereBufferGeometry {
    return this.sphere;
  }

  public getMesh() :THREE.Mesh{
    return this.mesh;
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