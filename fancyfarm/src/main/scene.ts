
import * as THREE from 'three';

import { Tube, CustomCurve } from 'src/scene/tube';
import CameraKeyActionHandler from './actions/CameraKeyActionHandler';
import { render } from 'react-dom';
import Wizard from './Wizard';
import { makeLights } from 'src/scene/lights';

declare function require(string): string;
const audioFile_Rise = require('./sounds/alarms/Rise.mp3');
const audioFile_Pong = require('./sounds/pong.mp3');


const PLAY_AUDIO = false;



const build = () => {
  
  let scene :THREE.Scene = new THREE.Scene();
  let camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
  let cameraKeyActionHandler :CameraKeyActionHandler = new CameraKeyActionHandler(camera);
  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  let clock :THREE.Clock = new THREE.Clock(true);
  
  let stage :THREE.Group = new THREE.Group();

  //let light : THREE.DirectionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
  //let light2 :THREE.AmbientLight = new THREE.AmbientLight(0xFFFFFF, 1);

  //light.position.set(1, 1, 1).normalize();
  //scene.add(light);
  //scene.add(light2);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let path: CustomCurve = new CustomCurve(10);
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

  document.addEventListener("keydown", cameraKeyActionHandler.onDocumentKeyDown, false);

  makeLights(scene, wizard, 100);

  function playAudio() {

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    if(PLAY_AUDIO) {
       // create an AudioListener and add it to the camera
      var listener = new THREE.AudioListener();
      camera.add( listener );

      // create a global audio source
      var sound = new THREE.Audio( listener );

      // load a sound and set it as the Audio object's buffer
      var audioLoader = new THREE.AudioLoader();

      audioLoader.load( audioFile_Rise, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
      }, null, null);

      // TODO play when intersecting with something
      var sound2 = new THREE.PositionalAudio( listener );
      audioLoader.load( audioFile_Pong, function ( buffer ) {
        sound2.setBuffer( buffer );
        sound.setVolume( 0.5 );
        sound2.setRefDistance( 20 );
        // sound2.play();

      }, null, null );
    }
    //cube.add( sound2 );
  };
  playAudio();    

const animate = () => { // updated once per frame
    const z = 0.1;
    let delta :number = clock.getDelta(); // needs to be called regularly, f.e. here
    
    cameraKeyActionHandler.update(delta);
    //light.position.set(camera.position.x, camera.position.y, camera.position.z).normalize();
    wizard.update(delta);
    
    stage.position.z = stage.position.z + z;
    stage.lookAt(stage.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}


export default build;