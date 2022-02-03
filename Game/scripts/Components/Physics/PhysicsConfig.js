// module aliases
export const Engine = Matter.Engine, Vector = Matter.Vector, Runner = Matter.Runner;
export const Bodies = Matter.Bodies, Body = Matter.Body, Composite = Matter.Composite;
// create an engine
export const engine = Engine.create();
//disable global gravity
engine.world.gravity.y=0;
// create runner
export const runner = Runner.create();


//TODO: made your custom Vector class