import { Scene, PerspectiveCamera } from 'three';
import * as THREE from 'three';

export abstract class Game {
  protected mainScene: Scene;
  protected mainCamera: PerspectiveCamera;

  private clock: THREE.Clock;

  constructor(protected onDead: () => void) {
    this.clock =  new THREE.Clock(true);
    this.mainScene = new THREE.Scene();
    this.mainCamera =  new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.setup();
    this.gameUpdate()
  }

  abstract setup(): void;
  abstract update(deltaTime: number): void;

  private gameUpdate() {
    const delta :number = this.clock.getDelta();
    this.update(delta);
    requestAnimationFrame(() => this.gameUpdate());
  }
}