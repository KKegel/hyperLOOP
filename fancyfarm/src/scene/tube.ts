
import * as THREE from 'three';


class CustomCurve extends THREE.Curve<THREE.Vector3> {

  private scale :number;

  constructor(scale :number){
    super();
    this.scale = ( scale === undefined ) ? 1 : scale;
  }

  getPoint(t :number) :THREE.Vector3 {
    var tx = t * 3 - 1.5;
    var ty = Math.sin( 2 * Math.PI * t );
    var tz = 0;
  
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }

}


export const tube = () : THREE.Mesh => {

  var path :CustomCurve = new CustomCurve( 10 );
  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry( path, 20, 2, 8, false );
  var material :THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  
  return new THREE.Mesh( geometry, material );

}