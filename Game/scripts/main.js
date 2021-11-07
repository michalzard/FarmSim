import {CircleCollider, PolygonCollider, RectangleCollider} from "./PhysicsObjects.js";
import Canvas from "./Canvas.js";

window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;
// module aliases
let Engine = Matter.Engine,
    Runner = Matter.Runner;
// create an engine
let engine = Engine.create();
// create runner
let runner = Runner.create();
// run the engine
Runner.run(runner, engine);


const boxR1=new RectangleCollider(engine.world,Matter.Vector.create(375,200),Matter.Vector.create(80,80),false);
const boxR=new RectangleCollider(engine.world,Matter.Vector.create(400,300),Matter.Vector.create(80,80),false);
const boxS=new RectangleCollider(engine.world,Matter.Vector.create(500,700),Matter.Vector.create(1000,80),true);
const circle=new CircleCollider(engine.world,Matter.Vector.create(400,150),10); 

const boxes=[boxR1,boxR,boxS,circle];


function renderAll(){
    ctx.clearRect(0,0,Canvas.width,Canvas.height);
    for(let i=0;i<boxes.length;i++)
    boxes[i].draw(ctx);
    window.requestAnimationFrame(renderAll);
}
renderAll();
