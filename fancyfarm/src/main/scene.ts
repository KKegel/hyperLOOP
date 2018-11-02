import * as THREE  from 'three';
import { render } from 'react-dom';
import { Vector3 } from 'three';


let scene :THREE.Scene;
let camera : THREE.PerspectiveCamera;
let renderer :THREE.WebGLRenderer

let clock;
let delta;
let time;

let cube :THREE.Mesh;

const build = ()  => { // called from react component
  init();
  animate();
}

const init = () => { // use for initialization
  scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometry :THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material :THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  clock = new THREE.Clock(true);

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

let z = 0.05;
let resetTime = 1.5;
let passed = 0;
const animate = () => { // updated once per frame
  delta = clock.getDelta(); // needs to be called regularly, f.e. here
  passed += delta;

  if (passed > resetTime ) {
      z = z * -1;
    passed = 0;
  }
  cube.position.z =  cube.position.z + z;
  cube.lookAt(cube.position);
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const onDocumentKeyDown = (event) => { // camera rotation
   // rotation anngle in degrees
   const xSpeed = 45 * Math.PI / 180;  
   const ySpeed = 45 * Math.PI / 180;
 
  const key = event.key;
  
  if (key == "w" || key == "ArrowUp") {
    camera.rotation.x -= xSpeed * delta; // Rotates 1 radian per second
  } else if (key == "s" || key == "ArrowDown") {
    camera.rotation.x += xSpeed * delta;
  } else if (key == "a" || key == "ArrowLeft") {
    camera.rotation.y -= ySpeed * delta;
  } else if (key == "d" || key == "ArrowRight") {
    camera.rotation.y += ySpeed * delta;
  } else if (key == "Escape") {
    // isPlay = !isPlay;
  } else if (key == "+") {
    camera.fov  -= 10;
  } else if (key == "-") {
    camera.fov += 10;
  }

  camera.updateProjectionMatrix();
};

export default build;