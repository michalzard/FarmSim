import {
  engine
} from "./Components/Physics/PhysicsConfig.js";
import GameObject from "./GameObject.js";
import Canvas from "./other/Canvas.js";
window.onload = Canvas.init(); //inits canvas after whole page loads
const ctx = Canvas.ctx;
const Vector = Matter.Vector;

export default class Scene {
  constructor() {
    this.label = 'Main Scene';

    /**
     * CAMERA
     * LIST OF OBJECTS
     *  LOAD SCENE ? SAVE SCENE
     */
    Scene.scenes.push(this);
  }
  static scenes = [];

  //called once scene initialization
  run() {
    const gameObjects = GameObject.gameObjects;
    for (let i = 0; i < gameObjects.length; i++) {
      const go = gameObjects[i];
      if (go.active) go.start();
    }
    //triggers animation frame so they start updating every frame after this function call
    this.update();
    this.render();
  }
  //called every frame
  update() {
    const gameObjects = GameObject.gameObjects;
    for (let i = 0; i < gameObjects.length; i++) {
      const go = gameObjects[i];
      if (go.active) go.update();
    }
    window.requestAnimationFrame(Scene.scenes[0].update);
  }
  //render out specific layers
  render() {
    ctx.save();
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.imageSmoothingEnabled = false; //turned off antialiasing
    const gameObjects = GameObject.gameObjects;
    for (let i = gameObjects.length - 1; i >= 0; i--) {
      const go = gameObjects[i];
      if (go.active) {
        for (let j = 0; j < go.components.length; j++) {
          const components = go.components[j];
          if (typeof components.render === 'function') components.render(ctx);
        }
      } else return;
    }
    ctx.restore();
    window.requestAnimationFrame(Scene.scenes[0].render);
  }
  //save scene object in localstorage
  saveScene() {

  }
  //check in localstorage for scene object
  loadScene() {

  }
}
