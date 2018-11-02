
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
    
    var tx = t * 3 - 1.5;
	  var ty = Math.sin( 2 * Math.PI * t );
	  var tz = 0;
  
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }

}

interface TubeSpec {

  getX(t :number) :number;
  getY(t :number) :number;
  getZ(t :number) :number;

}

export const tube = (path :CustomCurve) : THREE.Mesh => {

  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry(path, 20, 2, 8, false);
  var material :THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial( { color: 0xaaccff } );
  
  return new THREE.Mesh( geometry, material );

}