
import * as THREE from 'three';
import { type } from 'os';


export class CustomCurve extends THREE.Curve<THREE.Vector3> {

  private scale :number;
  private spec :TubeSpec;

  constructor(scale :number){
    super();
    this.scale = ( scale === undefined ) ? 1 : scale;
  }

  update(spec :TubeSpec){
    this.spec = spec;
  }

  getPoint(t :number) :THREE.Vector3 {
    
    var tx = 0;
	  var ty = 0;
	  var tz = -5*t;
  
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }

}

export interface TubeSpec {

  getX(t :number) :number;
  getY(t :number) :number;
  getZ(t :number) :number;

}

export const Tube = (path :CustomCurve) : THREE.Mesh => {

  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry(path, 100, 8, 16, false);

  var material :THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial( { color: 0xaaccff } );
  material.side = THREE.DoubleSide;
  
  return new THREE.Mesh( geometry, material );

}