

import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';
import Wizard from './Wizard';
import * as FirstPersonControls from './FirstPersonControls';
import { LightHandler } from 'src/scene/lights';
FirstPersonControls(THREE);

declare function require(string): string;
const audioFile_Rise = require('./sounds/alarms/Rise.mp3');
const audioFile_Pong = require('./sounds/pong.mp3');

const PLAY_AUDIO = false;
const DEBUG_CONTROLS = false;


const build = () => {
  
  let scene :THREE.Scene = new THREE.Scene();
  let camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
  this.THREE = THREE;
  const controls = new this.THREE.FirstPersonControls(camera);
  
    controls.movementSpeed = 5;
    controls.lookSpeed = 0.1//DEBUG_CONTROLS ? 0.3 : 0.2;
    controls.autoForward = true;//!DEBUG_CONTROLS;
    //controls.lookVertical = true;
    
    const loader = new THREE.ObjectLoader();

  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true});
  let clock :THREE.Clock = new THREE.Clock(true);
  
  let stage :THREE.Group = new THREE.Group();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let path: CustomCurve = new CustomCurve(20);
  let tube :THREE.Mesh = Tube(path);

  tube.matrixAutoUpdate = true;
  let tubegeometry = tube.geometry;

  let wireframe :THREE.WireframeGeometry = new THREE.WireframeGeometry(tubegeometry);
  let wirelines :THREE.LineSegments = new THREE.LineSegments(wireframe);

  let wizard :Wizard = new Wizard();

  stage.add(tube);
  stage.add(wirelines)

  stage.position.x = camera.position.x;
  stage.position.y = camera.position.y;
  stage.position.z = camera.position.z;

  camera.position.z = 5;

  scene.add(stage);

  let lightHandler :LightHandler = new LightHandler(wizard, scene, 15);
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

      var sound2 = new THREE.PositionalAudio( listener );
      audioLoader.load( audioFile_Pong, function ( buffer ) {
        sound2.setBuffer( buffer );
        sound.setVolume( 0.5 );
        sound2.setRefDistance( 20 );

      }, null, null );
    }
    //cube.add( sound2 );
  })();  

  const animate = () => {
   
    let delta :number = clock.getDelta();

    wizard.update(delta);
    controls.update(delta);
    
    stage.lookAt(stage.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}


export default build;