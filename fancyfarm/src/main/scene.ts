import * as WHS from 'whs/build/whs' // Import WHS without typings because type definitions are currently to bad
import * as THREE from 'three';


const build = ()  => {

  // Create World
  const world = new WHS.App([
    new WHS.ElementModule(document.getElementById('WHSAPP')),
    new WHS.SceneModule(),
    new WHS.CameraModule({
      position: new THREE.Vector3(0, 0, 20)
    }),
    new WHS.RenderingModule({
      bgColor: 0x162129,
      renderer: {
        antialias: true
      }
    }),
    new WHS.OrbitControlsModule(),
    new WHS.ResizeModule()
  ]);

  // Add lights
  new WHS.AmbientLight({
    color: 0xAA9999,
    intensity: 0.4,
  }).addTo(world);
  new WHS.DirectionalLight({
    color: 0x9999BB,
    intensity: 0.8,
    position: [5,5,5]
  }).addTo(world);

  // Create box component
  const box = new WHS.Box({ 
    geometry: {
      height: 3,
      width: 3,
      depth: 3,
    },
    material: new THREE.MeshLambertMaterial({
      color: 0xDD0000
    }),
    position: [0,0,0]
  });
  // And add the box to world
  box.addTo(world); 

  // Define a simple animation loop
  new WHS.Loop(() => {
    box.rotation.y += 0.005;
    box.rotation.x += 0.002;
  }).start(world);

  // Launch the rocket!!!
  world.start()
}

export default build;