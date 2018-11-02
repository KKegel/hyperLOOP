import * as THREE  from 'three';
import { tube, CustomCurve } from 'src/scene/tube';


let scene :THREE.Scene;
let camera : THREE.PerspectiveCamera;
let renderer :THREE.WebGLRenderer

let clock;
let delta;
let light :THREE.DirectionalLight;

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

  light = new THREE.DirectionalLight( 0xFFeeee, 1 );
  light.position.set( 1,1,1).normalize();

  var light2 = new THREE.AmbientLight( 0xFFFFFF, 1 );

  scene.add(light);
  scene.add(light2);


  var path :CustomCurve = new CustomCurve( 10 );
  let t :THREE.Mesh = tube(path);
  t.matrixAutoUpdate = true;

var geometry = t.geometry;

var wireframe = new THREE.WireframeGeometry( geometry );

var line = new THREE.LineSegments( wireframe );


  t.position.x = camera.position.x;
  t.position.y = camera.position.y;
  t.position.z = camera.position.z;

  t.rotateY(90);
  line.rotateY(90);

  scene.add(t);
  scene.add(line);

  camera.position.z = 5;

  clock = new THREE.Clock(true);

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

const animate = () => { // updated once per frame
  delta = clock.getDelta(); // needs to be called regularly, f.e. here
  light.position.set( camera.position.x, camera.position.y, camera.position.z).normalize();

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const onDocumentKeyDown = (event) => { // camera rotation
   // rotation anngle in degrees
   const xSpeed = 90 * Math.PI / 180;  
   const ySpeed = 90 * Math.PI / 180;
 
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