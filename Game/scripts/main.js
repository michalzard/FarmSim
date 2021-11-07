import Renderer from "./Renderer.js";
import Player from "./Player.js";

// module aliases
let Engine = Matter.Engine,
    Vector = Matter.Vector,
    Runner = Matter.Runner;
// create an engine
let engine = Engine.create();
//disable global gravity
engine.world.gravity.y=0;
// create runner
let runner = Runner.create();
// run the engine
Runner.run(runner, engine);

Renderer.render();//requestAnimationFrame 
Player.init(engine.world);
