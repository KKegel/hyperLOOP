import * as THREE  from 'three';
<<<<<<< HEAD
import { tube, CustomCurve } from 'src/scene/tube';
=======
import { render } from 'react-dom';
>>>>>>> 723592fbbf6b3ab6f17e96a06c437eecd46c63c2


let scene :THREE.Scene;
let camera : THREE.PerspectiveCamera;
let renderer :THREE.WebGLRenderer

let clock;
let delta;

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

  var light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
  light.position.set( 1, 1, 1 ).normalize();

  var light2 = new THREE.AmbientLight( 0xFF0000, 0.5 );

  scene.add(light);
  scene.add(light2);


  var path :CustomCurve = new CustomCurve( 10 );
  let cube :THREE.Mesh = tube(path);

  scene.add(cube);

  camera.position.z = 5;

  clock = new THREE.Clock(true);

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

const animate = () => { // updated once per frame
  delta = clock.getDelta(); // needs to be called regularly, f.e. here

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