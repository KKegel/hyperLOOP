
import * as THREE from 'three';
import { type } from 'os';
import { world } from 'src/world-generator-pro';
import { Vector3 } from 'three';


export class CustomCurve extends THREE.Curve<THREE.Vector3> {

  private scale :number;
  private spec :TubeSpec;

  constructor(){
    super();
    // this.scale = ( scale === undefined ) ? 1 : scale;
  }

  update(spec :TubeSpec){
    this.spec = spec;
  }

  getPoint(t :number) :THREE.Vector3 { 
    return this.spec.getVec(t);
  }

}

export interface TubeSpec {
  getVec(t: number): Vector3;
}

export const Tube = (path :CustomCurve) : THREE.Mesh => {

  path.update(world);

  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry(path, 100, 4, 64, false);

 // var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
  var material :THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( { color: 0x888888 } );
  material.side = THREE.DoubleSide;
  
  return new THREE.Mesh( geometry, material );

}