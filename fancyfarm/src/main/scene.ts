import * as THREE  from 'three';
import { tube } from 'src/scene/tube';


let camera : THREE.PerspectiveCamera = null;

const init = () => {
  
}

const build = ()  => {
  const scene :THREE.Scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  const renderer :THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
  light.position.set( 1, 1, 1 ).normalize();

//var helper = new THREE.DirectionalLightHelper( light, 5 );
var light2 = new THREE.AmbientLight( 0x404040, 1 ); // soft white light


scene.add(light);
scene.add(light2);
  /*const geometry :THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material :THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube :THREE.Mesh = new THREE.Mesh( geometry, material );*/
  //scene.add( cube );

  let cube :THREE.Mesh = tube();

  scene.add(cube);

  camera.position.z = 5;

  // pause/play
  let isPlay = true;

  // rotation speed
  const xSpeed = 0.05;
  const ySpeed = 0.05;
  const onDocumentKeyDown = (event) => {
  
    const key = event.key;

    if (key == "w" || key == "ArrowUp") {
      camera.rotation.x -= xSpeed;
    } else if (key == "s" || key == "ArrowDown") {
      camera.rotation.x += xSpeed;
    } else if (key == "a" || key == "ArrowLeft") {
      camera.rotation.y -= ySpeed;
    } else if (key == "d" || key == "ArrowRight") {
      camera.rotation.y += ySpeed;
    } else if (key == "Escape") {
      isPlay = !isPlay;
    } else if (key == "+") {
      camera.fov  -= 10;
    } else if (key == "-") {
      camera.fov += 10;
    }

    camera.updateProjectionMatrix();
  };

  document.addEventListener("keydown", onDocumentKeyDown, false);


  const animate = () => {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
  };

  animate();

  

}


export default build;