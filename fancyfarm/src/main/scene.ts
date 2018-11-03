

import * as THREE from 'three';
import { Tube, CustomCurve } from 'src/scene/tube';
import Wizard from './Wizard';
import { makeLights } from 'src/scene/lights';
import * as FirstPersonControls from './FirstPersonControls';

FirstPersonControls(THREE);




const build = () => {
  
  let scene :THREE.Scene = new THREE.Scene();
  let camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
  this.THREE = THREE;
  const controls = new this.THREE.FirstPersonControls(camera);

    controls.movementSpeed = 10;
    controls.lookSpeed = 0.1;
    //controls.lookVertical = true;
 
  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  let clock :THREE.Clock = new THREE.Clock(true);
  
  let stage :THREE.Group = new THREE.Group();

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

  //document.addEventListener("keydown", cameraKeyActionHandler.onDocumentKeyDown, false);

  makeLights(scene, wizard, 100);

  let count :number = 0;
    
  const animate = () => { // updated once per frame
    const z = 0.05;
    let delta :number = clock.getDelta(); // needs to be called regularly, f.e. here
    count = (count+1)%100;
    //cameraKeyActionHandler.update(delta);

   controls
    
    //stage.applyMatrix(transformation)//camera.getWorldDirection
    //light.position.set(camera.position.x, camera.position.y, camera.position.z).normalize();
    wizard.update(delta);
    //controls.update( clock.getDelta() );
    controls.update(delta);
    
    //stage.position.z = stage.position.z + z;
    stage.lookAt(stage.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}


export default build;