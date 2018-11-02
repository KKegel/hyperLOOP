import * as THREE  from 'three';


let camera : THREE.PerspectiveCamera = null;
let clock = null;
let delta;

const init = () => {
  
}

const build = ()  => {
  const scene :THREE.Scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  const renderer :THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  
  const geometry :THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material :THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube :THREE.Mesh = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  // pause/play
  let isPlay = true;

  clock = new THREE.Clock(true);

  // rotation anngle in degrees
  const xSpeed = 45 * Math.PI / 180;  
  const ySpeed = 45 * Math.PI / 180;

  const onDocumentKeyDown = (event) => {
  
    const key = event.key;
    console.log(delta);
    
    if (key == "w" || key == "ArrowUp") {
      camera.rotation.x -= xSpeed * delta; // Rotates 1 radian per second
    } else if (key == "s" || key == "ArrowDown") {
      camera.rotation.x += xSpeed * delta;
    } else if (key == "a" || key == "ArrowLeft") {
      camera.rotation.y -= ySpeed * delta;
    } else if (key == "d" || key == "ArrowRight") {
      camera.rotation.y += ySpeed * delta;
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
    delta = clock.getDelta(); // needs to be called regularly

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };

  animate();

  

}


export default build;