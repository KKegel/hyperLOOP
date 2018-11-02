
import * as THREE from 'three';


class CustomCurve extends THREE.Curve<THREE.Vector3> {

  private scale :number;

  constructor(scale :number){
    super();
    this.scale = ( scale === undefined ) ? 1 : scale;
  }

  getPoint(t :number) :THREE.Vector3 {
    
    var tx = t * 3 - 1.5;
    var ty = t;//Math.sin( 2 * Math.PI * t );
    var tz = 0;
  
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }

}


export const tube = () : THREE.Mesh => {

  var path :CustomCurve = new CustomCurve( 10 );
  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry( path, 80, 2, 4, false );
  var material :THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial( { color: 0xaaccff, morphNormals: false } );
  
  return new THREE.Mesh( geometry, material );

}