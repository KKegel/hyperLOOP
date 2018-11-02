import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';


let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer

let clock;
let delta: number;
let light: THREE.DirectionalLight;
let time;
let tube :THREE.Mesh;

let stage :THREE.Group;

let cube: THREE.Mesh;

const build = () => { // called from react component
  init();
  animate();
}

const init = () => { // use for initialization
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  light = new THREE.DirectionalLight(0xFFeeee, 1);
  light.position.set(1, 1, 1).normalize();

  stage = new THREE.Group();
/*
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  */

  light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(1, 1, 1).normalize();

  var light2 = new THREE.AmbientLight(0xFFFFFF, 1);

  scene.add(light);
  scene.add(light2);


  var path: CustomCurve = new CustomCurve(10);
  tube = Tube(path);
  tube.matrixAutoUpdate = true;

  var tubegeometry = tube.geometry;

  var wireframe = new THREE.WireframeGeometry(tubegeometry);

  var wirelines = new THREE.LineSegments(wireframe);

  stage.add(tube);
  stage.add(wirelines)

  stage.position.x = camera.position.x;
  stage.position.y = camera.position.y;
  stage.position.z = camera.position.z;



  //stage.rotateY(90);


  scene.add(stage);

  camera.position.z = 5;

  clock = new THREE.Clock(true);

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

let z = 0.05;
let resetTime = 1.5;
let passed = 0;

const animate = () => { // updated once per frame
  delta = clock.getDelta(); // needs to be called regularly, f.e. here
  light.position.set(camera.position.x, camera.position.y, camera.position.z).normalize();
  passed += delta;

  if (passed > resetTime) {
    //z = z * -1;
    passed = 0;
  }
  stage.position.z = stage.position.z + z;
  stage.lookAt(stage.position);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
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
    camera.fov -= 10;
  } else if (key == "-") {
    camera.fov += 10;
  }

  camera.updateProjectionMatrix();
};

export default build;