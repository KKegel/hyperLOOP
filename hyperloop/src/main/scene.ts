
import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';
import Wizard from './Wizard';
import * as FirstPersonControls from './FirstPersonControls';
import { LightHandler } from 'src/scene/lights';
import * as OBJLoaderInjector from './OBJLoader';
import { OBJLoader, Euler, PerspectiveCamera, Vector3, Scene, Mesh, Group, Renderer, Vector2 } from 'three';
import { world } from 'src/world-generator-pro';
import { Game } from './game';

FirstPersonControls(THREE);
OBJLoaderInjector(THREE);

// Import static assets
declare function require(string): string;
const audioFile_submerged = require('./sounds/Edward_Shallow_-_03_-_Submerged.mp3');
const audioFile_Rise = require('./sounds/8-bit Detective.wav');
const audioFile_Pong = require('./sounds/blob.mp3');
const objFile_paperplane = require('../geometry/paperplane.obj');
const mtlFile_paperplane = require('../geometry/paperplane.mtl');

// Globals
const PLAY_AUDIO = true;//true;
const DEBUG_CONTROLS = false;//true;


// ---------------------------------------


class HyperLOOP extends Game {

  private THREE;
  private timeText;
  private time = 0;
  private skip: number = 0;

  private updateClockTime: number = 1;
  private passed: number = 0;
  private oldHead: number;
  private tube: Mesh;
  private stage: Group;
  private controls: any;
  private wizard: Wizard;
  private renderer: Renderer;
  private dead: boolean;
  private lightHandler: LightHandler;
  private mouse: Vector2;

  constructor() {
    super(() => location.reload()) //Reload page on dead event
  }
    
  setup() {
    this.addTimer(); // Init timer

    this.dead = false;

    // Positioning camera
    this.mainCamera.lookAt(new Vector3(-1,0,0)); // Adjust camera rotation
    this.setPlayerOffset();

    // Extern THREE modules:
    this.THREE = THREE;
    // Controls
    this.controls = new this.THREE.FirstPersonControls(this.mainCamera);
    this.controls.movementSpeed = 10;
    this.controls.lookSpeed = DEBUG_CONTROLS ? 0.3 : 0.2;
    this.controls.autoForward = !DEBUG_CONTROLS;
    // Load plane model
    const loader = new this.THREE.OBJLoader() as OBJLoader;

    // Configure renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Initial tube render
    this.tube = Tube(new CustomCurve());
    this.tube.matrixAutoUpdate = true;
    const tubeGeometry = this.tube.geometry;
    
    // Create stage
    this.stage = new THREE.Group();
    this.stage.add(new THREE.AmbientLight(0xffffff, 0.5))
    this.stage.add(this.tube);
    this.mainScene.add(this.stage);

    // Init Wizard
    this.wizard = new Wizard();
    this.lightHandler = new LightHandler(this.wizard, this.mainScene, 14)
    this.wizard.addUpdateable(this.lightHandler);
    this.wizard.addUpdateable(world.createUpdateHandler(this.mainCamera));


    // Do some audio stuff
    (() => {
      if(PLAY_AUDIO) {
      
        const listener = new THREE.AudioListener();
        this.mainCamera.add( listener );
        const sound = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();
        
        audioLoader.load( audioFile_submerged, ( buffer ) => {
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume( 0.5 );
          sound.play();
        }, null, null);


        let sound2 = new THREE.Audio(listener);
        audioLoader.load( audioFile_Pong, ( buffer ) => {
          sound2.setBuffer( buffer );
          sound2.setLoop( false );
          sound2.setVolume( 10 );
          sound2.play()
          this.lightHandler.addSound(sound2);
        }, null, null);
      }
    })(); 

    
    this.skip = 0;

    this.oldHead = world.queue[0].key;

    // Mouse movement
    this.mouse = new THREE.Vector2(); //, INTERSECTED;
    const onDocumentMouseMove = ( event ) => {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  }

  update(deltaTime: number) {
    console.log(deltaTime);
     
    this.skip = 0;//(skip+1)%5;

    this.passed += deltaTime;
    if (this.passed > this.updateClockTime ) {
      this.updateTimer();
      this.passed = 0;
    }
    
    // Update Tube
    if(world.queue[0].key !== this.oldHead){
      this.stage.remove(this.tube);
      this.oldHead = world.queue[0].key;
      let path: CustomCurve = new CustomCurve();
      this.tube = Tube(path);
      let tubegeometry = this.tube.geometry;
      this.stage.add(this.tube);
    }

    this.controls.movementSpeed += deltaTime*0.2;
    this.controls.lookSpeed += deltaTime*0.02;
    
    world.setK(world.k + deltaTime*10);

    this.controls.update(deltaTime);
    this.wizard.update(deltaTime);
    

    this.stage.lookAt(this.stage.position);
    
    this.renderer.render(this.mainScene, this.mainCamera);

    if(this.skip === 0 && !this.dead){
      const point = this.mainCamera.position;
      const raycaster = new THREE.Raycaster()
      raycaster.set(point, this.mainCamera.position.clone().normalize())
      console.log(this.tube)
      const intersects = raycaster.intersectObject(this.tube)
      if( intersects.length %2 == 0) { // Points is in objet
        this.dead = true;
        console.log('camera outside of tube');
        this.onDead();
      }

      // check mouse over light bulb
      // const lightRaycaster = new THREE.Raycaster();
      // lightRaycaster.setFromCamera( this.mouse, this.mainCamera );

      // let arr :Array<THREE.Mesh> = new Array();
      // let map = this.lightHandler.getBulbs();
      // let i = 0;

      // map.forEach((bulb, key) => {
      //   arr[i] = bulb.getMesh();
      //   i++;
      // });
  
      // var bulbsIntersects = lightRaycaster.intersectObjects( arr );

      // if ( bulbsIntersects.length > 0 ) {
        
      //     if ( INTERSECTED != intersects[ 0 ].object ) {
      //     if ( INTERSECTED ) 
      //     INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      //     INTERSECTED = intersects[ 0 ].object;
      //     //INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      //     INTERSECTED
      //     //INTERSECTED.material.emissive.setHex( 0xffffff );
      //   }
      // } else {
      //   if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      //   INTERSECTED = null;
      // }

    }
  }


  //
  // ─── PRIVATE METHODS ────────────────────────────────────────────────────────────
  //

  private addTimer() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );
    this.timeText = document.createElement( 'h1' );
    this.timeText.style.position = 'absolute';
    this.timeText.style.marginTop = '1px';
    this.timeText.style.width = '100%';
    this.timeText.style.textAlign = 'center';
    this.timeText.style.fontSize = "60px";
    this.timeText.style.color = "white";
    this.timeText.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    this.timeText.style.fontFamily = "Space Mono, monospace";
    this.timeText.style.zIndex = 10;
    this.timeText.innerHTML = '0';    
    container.appendChild( this.timeText );
    
  }

  private updateTimer() {
    this.time++;
    this.timeText.innerHTML = this.time.toString();
  }

  private setPlayerOffset() {
    this.mainCamera.position.x = world.getVec(0.05).x
    this.mainCamera.position.y = world.getVec(0.05).y;
    this.mainCamera.position.z = world.getVec(0.05).z;
  }

}

export default HyperLOOP;