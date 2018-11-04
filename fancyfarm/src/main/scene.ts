
import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';
import Wizard from './Wizard';
import * as FirstPersonControls from './FirstPersonControls';
import { LightHandler } from 'src/scene/lights';
import * as OBJLoaderInjector from './OBJLoader';
import { OBJLoader, Euler } from 'three';
import { world } from 'src/world-generator-pro';

FirstPersonControls(THREE);
OBJLoaderInjector(THREE);

declare function require(string): string;
const audioFile_Rise = require('./sounds/8-bit Detective.wav');
//const audioFile_Pong = require('./sounds/pong.mp3');
const objFile_paperplane = require('../geometry/paperplane.obj');
const mtlFile_paperplane = require('../geometry/paperplane.mtl');

const PLAY_AUDIO = false;//true;
const DEBUG_CONTROLS = true;

type DeadCallback = () => void;


class hyperLOOP {

  private THREE;
  
  constructor(deadCallback :DeadCallback){
  
  let dead :boolean = false;
  let scene :THREE.Scene = new THREE.Scene();
  let camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
  this.THREE = THREE;
  const controls = new this.THREE.FirstPersonControls(camera);
  
    controls.movementSpeed = 5;
    controls.lookSpeed = DEBUG_CONTROLS ? 0.3 : 0.2;
    controls.autoForward = !DEBUG_CONTROLS;
    //controls.lookVertical = true;
    
  
  //  let plane :THREE.Group = null;
  // Load plane model
  const loader = new this.THREE.OBJLoader() as OBJLoader;
  // loader.setMaterials(new THREE.MaterialCreator(mtlFile_paperplane));
  /*loader.load(
    objFile_paperplane,
    group => {
      plane = group;
      plane.scale.setX(0.3);
      plane.scale.setY(0.3);
      plane.scale.setZ(0.3);
      scene.add(plane)
    },
    // called when loading is in progresses
    xhr => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    error => console.log( 'An error happened')
  );*/

  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true});
  let clock :THREE.Clock = new THREE.Clock(true);
  
  let stage :THREE.Group = new THREE.Group();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let path: CustomCurve = new CustomCurve(20);
  let tube :THREE.Mesh = Tube(path);

  tube.matrixAutoUpdate = true;
  let tubegeometry = tube.geometry;

  //let wireframe :THREE.WireframeGeometry = new THREE.WireframeGeometry(tubegeometry);
  //let wirelines :THREE.LineSegments = new THREE.LineSegments(wireframe);

  let wizard :Wizard = new Wizard();
  wizard.addUpdateable(world.createUpdateHandler(camera));

  stage.add(new THREE.AmbientLight(0xffffff, 0.5))

  //let light :THREE.DirectionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
  //scene.add(light);

  stage.add(tube);
  //stage.add(wirelines)

  stage.position.x = camera.position.x;
  stage.position.y = camera.position.y;
  stage.position.z = camera.position.z;

  camera.position.x = world.getVec(0.05).multiplyScalar(20).z
  camera.position.y = world.getVec(0.05).multiplyScalar(20).y;
  camera.position.z = -world.getVec(0.05).multiplyScalar(20).x;



  scene.add(stage);

  let lightHandler :LightHandler = new LightHandler(wizard, scene, 12);
  wizard.addUpdateable(lightHandler);

  (() => {
    if(PLAY_AUDIO) {
     
      var listener = new THREE.AudioListener();
      camera.add( listener );
      var sound = new THREE.Audio( listener );
      var audioLoader = new THREE.AudioLoader();

      audioLoader.load( audioFile_Rise, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
      }, null, null);

      /*var sound2 = new THREE.PositionalAudio( listener );
      audioLoader.load( audioFile_Pong, function ( buffer ) {
        sound2.setBuffer( buffer );
        sound.setVolume( 0.5 );
        sound2.setRefDistance( 20 );

      }, null, null );*/
    }
    //cube.add( sound2 );
  })(); 

  
  let skip :number = 0;

 
  let oldhead = world.queue[0].key;

  const animate = () => {

    skip = (skip+1)%20;
   
    let delta :number = clock.getDelta();

    
    //stage.remove(wirelines);
    if(world.queue[0].key !== oldhead){
      stage.remove(tube);
      oldhead = world.queue[0].key;
      let path: CustomCurve = new CustomCurve(20);
    tube = Tube(path);
    let tubegeometry = tube.geometry;
    //let wireframe :THREE.WireframeGeometry = new THREE.WireframeGeometry(tubegeometry);
    //wirelines  = new THREE.LineSegments(wireframe,new THREE.MeshLambertMaterial( { color: 0x000000 } ));
    stage.add(tube);
    }
    
    //stage.add(wirelines);

    

    controls.movementSpeed += delta*0.2;
    controls.lookSpeed += delta*0.02;
    
    world.setK(world.k + delta*1.1);

    controls.update(delta);
    //light.position.setX(camera.position.x);
    //light.position.setY(camera.position.y);
    //light.position.setZ(camera.position.z);
    /*if(plane !== null){
      plane.position.x = camera.position.x;
      plane.position.y = camera.position.y;
      plane.position.z = camera.position.z;
    }*/
    
    wizard.update(delta);
    

    
    stage.lookAt(stage.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
/*
    if(skip === 0 && !dead){
      const point = camera.position;
      const mesh = tube;
      const raycaster = new THREE.Raycaster()
      raycaster.set(point, new THREE.Vector3(1,1,1))
      const intersects = raycaster.intersectObject(mesh)
      if( intersects.length %2 !== 1) { // Points is in objet
        dead = true;
        console.log('camera outside of tube');
        deadCallback();
      }
    }
  */
  };

  animate();
}
}


export default hyperLOOP;