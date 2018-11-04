
import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';
import Wizard from './Wizard';
import * as FirstPersonControls from './FirstPersonControls';
import { LightHandler } from 'src/scene/lights';
import * as OBJLoaderInjector from './OBJLoader';
import { OBJLoader, Euler, PerspectiveCamera, Vector3 } from 'three';
import { world } from 'src/world-generator-pro';

FirstPersonControls(THREE);
OBJLoaderInjector(THREE);

declare function require(string): string;
const audioFile_Rise = require('./sounds/8-bit Detective.wav');
const audioFile_Pong = require('./sounds/blob.mp3');
const objFile_paperplane = require('../geometry/paperplane.obj');
const mtlFile_paperplane = require('../geometry/paperplane.mtl');

const PLAY_AUDIO = true;//true;
const DEBUG_CONTROLS = false;//true;

type DeadCallback = () => void;





function setPlayerOffset(camera: PerspectiveCamera) {
  camera.position.x = world.getVec(0.05).x
  camera.position.y = world.getVec(0.05).y;
  camera.position.z = world.getVec(0.05).z;
}





class hyperLOOP {

  private THREE;
  
  private timeText;
  private time = 0;
  private clock:THREE.Clock;

  addTimer() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );
    this.timeText = document.createElement( 'h1' );
    this.timeText.style.position = 'absolute';
    this.timeText.style.marginTop = '1px';
    this.timeText.style.width = '100%';
    this.timeText.style.textAlign = 'center';
    this.timeText.style.fontSize = "60px";
    this.timeText.style.color = "white";
    this.timeText.style.fontFamily = "Monospaced";
    this.timeText.innerHTML = '0';    
    container.appendChild( this.timeText );
    
  }

  updateTimer() {
    this.time++;
    this.timeText.innerHTML = this.time.toString();
  }
  constructor(deadCallback :DeadCallback){
  
  this.addTimer();
  let dead :boolean = false;
  let scene :THREE.Scene = new THREE.Scene();
  let camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
  camera.lookAt(new Vector3(-1,0,0));
  this.THREE = THREE;
  const controls = new this.THREE.FirstPersonControls(camera);
  
    controls.movementSpeed = 10;
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
  this.clock  = new THREE.Clock(true);
  
  let stage :THREE.Group = new THREE.Group();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let path: CustomCurve = new CustomCurve();
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

  setPlayerOffset(camera);

  scene.add(stage);

  let lightHandler :LightHandler = new LightHandler(wizard, scene, 14);
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


      let sound2 = new THREE.Audio(listener);
      audioLoader.load( audioFile_Pong, function( buffer ) {
        sound2.setBuffer( buffer );
        sound2.setLoop( false );
        sound2.setVolume( 10 );
        sound2.play()
        lightHandler.addSound(sound2);
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

  var mouse = new THREE.Vector2();//, INTERSECTED;

  const onDocumentMouseMove = ( event ) => {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  let updateClockTime = 1;
  let passed = 0;
  const animate = () => {
    
    skip = 0;//(skip+1)%5;
   
    let delta :number = this.clock.getDelta();
    passed += delta;
    if (passed > updateClockTime ) {
      this.updateTimer();
      passed = 0;
    }

    if(world.queue[0].key !== oldhead){
      stage.remove(tube);
      oldhead = world.queue[0].key;
      let path: CustomCurve = new CustomCurve();
    tube = Tube(path);
    let tubegeometry = tube.geometry;
    stage.add(tube);
    }

    controls.movementSpeed += delta*0.2;
    controls.lookSpeed += delta*0.02;
    
    world.setK(world.k + delta*10);

    controls.update(delta);
    wizard.update(delta);
    

    
    stage.lookAt(stage.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if(skip === 0 && !dead){
      const point = camera.position;
      const mesh = tube;
      const raycaster = new THREE.Raycaster()
      raycaster.set(point, camera.position.clone().normalize())
      const intersects = raycaster.intersectObject(mesh)
      if( intersects.length == 0) { // Points is in objet
        dead = true;
        console.log('camera outside of tube');
        deadCallback();
      }

      // check mouse over light bulb
      const lightRaycaster = new THREE.Raycaster();
      lightRaycaster.setFromCamera( mouse, camera );

      let arr :Array<THREE.Mesh> = new Array();
      let map = lightHandler.getBulbs();
      let i = 0;

      map.forEach((bulb, key) => {
        arr[i] = bulb.getMesh();
        i++;
      });
  
      var bulbsIntersects = lightRaycaster.intersectObjects( arr );

      if ( bulbsIntersects.length > 0 ) {
        
        /* if ( INTERSECTED != intersects[ 0 ].object ) {
          if ( INTERSECTED ) 
          INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
          INTERSECTED = intersects[ 0 ].object;
          //INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED
          //INTERSECTED.material.emissive.setHex( 0xffffff );
        }
      } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
      }*/

    }
  }

    

  
  };

  animate();
}

}




export default hyperLOOP;