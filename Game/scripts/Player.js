import {RectangleCollider} from "./PhysicsObjects.js";
import { Sprite } from "./Sprite.js";
import Canvas from "./Canvas.js";
import Renderer from "./Renderer.js";

const ctx=Canvas.ctx;
const Body=Matter.Body,
Vector=Matter.Vector;

export default class Player{
    
    constructor(world,position){
        this.position=position || Vector.create(300,300);
        this.size=Vector.create(40,60);
        this.input={
        up:false,
        down:false,
        left:false,
        right:false,
        }
        this.maxSpeed=5;
        this.collider=new RectangleCollider(world,this.position,this.size,false);
        // this.texture=new Sprite("./assets/test.png",40,60);
        // this.texture.dest.x=210;this.texture.dest.y=160;
        Body.setInertia(this.collider,Infinity);
        Renderer.addToLayer(this,"entities");
        //listeners
        window.addEventListener("keydown",(e)=>{this.handleKeyDown(e)});
        window.addEventListener("keyup",(e)=>{this.handleKeyUp(e)});
    }
    draw(){
    this.updatePosition();
    this.collider.draw(ctx);
    if(this.texture)this.texture.draw(ctx,this.collider.body.position);
    }
    updatePosition(){
    Body.setVelocity(this.collider.body,{x:0,y:0});
    if(this.input.up) Body.setVelocity(this.collider.body,{x:this.collider.body.velocity.x,y:-this.maxSpeed});
    if(this.input.left) Body.setVelocity(this.collider.body,{x:-this.maxSpeed,y:this.collider.body.velocity.y});
    if(this.input.down) Body.setVelocity(this.collider.body,{x:this.collider.body.velocity.x,y:this.maxSpeed});
    if(this.input.right) Body.setVelocity(this.collider.body,{x:this.maxSpeed,y:this.collider.body.velocity.y});
    }
    handleKeyDown(e){
    if(e.key==="w"){this.input.up=true;}
    if(e.key==="s"){this.input.down=true;}
    if(e.key==="a"){this.input.left=true;}
    if(e.key==="d"){this.input.right=true;}
    }
    handleKeyUp(e){
    if(e.key==="w"){this.input.up=false;}
    if(e.key==="s"){this.input.down=false;}
    if(e.key==="a"){this.input.left=false;}
    if(e.key==="d"){this.input.right=false;}
    }
    //spawn player on specific spot
    static init(world){
        return new Player(world,Vector.create(500,500));
    }
}

