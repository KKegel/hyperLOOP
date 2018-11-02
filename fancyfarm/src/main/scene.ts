import * as THREE  from 'three';



const build = ()  => {
  const scene :THREE.Scene = new THREE.Scene();
  const camera :THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  const renderer :THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometry :THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material :THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube :THREE.Mesh = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  const onDocumentKeyDown = (event) => {
    const key = event.key;
    if (key == "w" || key == "ArrowUp") {
      cube.rotation.x -= xSpeed;
    } else if (key == "s" || key == "ArrowDown") {
      cube.rotation.x += xSpeed;
    } else if (key == "a" || key == "ArrowLeft") {
      cube.rotation.y -= ySpeed;
    } else if (key == "d" || key == "ArrowRight") {
      cube.rotation.y += ySpeed;
    } else if (key == "Escape") {
      isPlay = !isPlay;
    }
  };

  document.addEventListener("keydown", onDocumentKeyDown, false);

  // pause/play
  let isPlay = true;

  // rotation speed
  const xSpeed = 0.5;
  const ySpeed = 0.5;

  const animate = () => {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
  };

  animate();

  

}


export default build;