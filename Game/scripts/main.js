import {Runner,runner,engine,Vector, Body} from "./Components/Physics/PhysicsConfig.js";
import GameObject from "./GameObject.js";
import Canvas from "./other/Canvas.js";
import Scene from "./Scene.js";
import Rigidbody from "./Components/Physics/Rigidbody.js";
import Player from "./GameObjects/Player.js";
import {GrassTile} from './GameObjects/Tile.js';
Canvas.init();
// run the physics engine
Runner.run(runner, engine);

/** DEBUGGING */
const scene=new Scene();
scene.run();

const player=new Player();

GrassTile.create('mid',Vector.create(400,360));
GrassTile.create('top-left',Vector.create(300,300));
GrassTile.create('top',Vector.create(360,300));