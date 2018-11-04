
import * as THREE from 'three';
import { type } from 'os';
import { world } from 'src/world-generator-pro';


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
    
    //console.log(t);

    // var x = 0;
	  // var y = 0;
    // var z = t*50;
    


    const {x,y,z} = this.spec.getVec(t);
  
    return new THREE.Vector3(z, y, -x).multiplyScalar( this.scale );
  }

}

export interface TubeSpec {

  // getX(t :number) :number;
  // getY(t :number) :number;
  // getZ(t :number) :number;

  getVec(t: number): {x: number, y: number, z: number};

}

export const Tube = (path :CustomCurve) : THREE.Mesh => {

  path.update(world);

  var geometry :THREE.TubeBufferGeometry = new THREE.TubeBufferGeometry(path, 100, 4, 64, false);

 // var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
  var material :THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( { color: 0x888888 } );
  material.side = THREE.DoubleSide;
  
  return new THREE.Mesh( geometry, material );

}