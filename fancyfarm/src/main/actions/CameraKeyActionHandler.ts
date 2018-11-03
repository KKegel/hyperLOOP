

class CameraKeyActionHandler {

  private camera :THREE.PerspectiveCamera;
  private delta :number;

  constructor(camera :THREE.PerspectiveCamera){
    this.camera = camera;
  }

  update(delta :number){
    this.delta = delta;
  }

  onDocumentKeyDown = (event) => { // camera rotation
    // rotation anngle in degrees
    const xSpeed = 90 * Math.PI / 180;
    const ySpeed = 90 * Math.PI / 180;
  
    const key = event.key;
  
    if (key == "w" || key == "ArrowUp") {
      this.camera.rotation.x -= xSpeed * this.delta; // Rotates 1 radian per second
    } else if (key == "s" || key == "ArrowDown") {
      this.camera.rotation.x += xSpeed * this.delta;
    } else if (key == "a" || key == "ArrowLeft") {
      this.camera.rotation.y -= ySpeed * this.delta;
    } else if (key == "d" || key == "ArrowRight") {
      this.camera.rotation.y += ySpeed * this.delta;
    } else if (key == "Escape") {
      // isPlay = !isPlay;
    } else if (key == "+") {
      this.camera.fov -= 10;
    } else if (key == "-") {
      this.camera.fov += 10;
    }
  
    this.camera.updateProjectionMatrix();

  }

}

export default CameraKeyActionHandler;