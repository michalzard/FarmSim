import {RectangleCollider} from "./PhysicsObjects.js";
import Canvas from "./Canvas.js";
import Renderer from "../Renderer.js";
// import SpriteSheet from "./SpritesheetHandler.js";
import { Inventory } from "./Inventory.js";
import GameObject from "../GameObject.js";
import { engine } from "../main.js";

const ctx=Canvas.ctx;
const Body=Matter.Body,
Vector=Matter.Vector;

export default class Player extends GameObject{
    
    constructor(position){
        super();
        this.input={
        up:false,
        down:false,
        left:false,
        right:false,
        }
        this.maxSpeed=5;
        this.initPosition=position;
        this.texture=new SpriteSheet("./assets/testsheet.jpg",this.size);
        // this.transform.size=Vector.create(50,20);
        // console.log(this.transform)
        this.rigidbody.addCollider(new RectangleCollider(position,this.transform.size,false));
        this.inventory=new Inventory(32);
 
        Body.setInertia(this.rigidbody.colliderArray[0].body,Infinity);
       // Renderer.addToLayer(this,"entities");
        //listeners
        window.addEventListener("keydown",(e)=>{this.handleKeyDown(e)});
        window.addEventListener("keyup",(e)=>{this.handleKeyUp(e)});
    }
    draw(){
    this.updatePosition();

    //collider debug
    for(let i=0;i<this.rigidbody.colliderArray.length;i++){
        const rb=this.rigidbody.colliderArray[i];
        rb.draw(ctx);
    }
    }
 
    updatePosition(){
    const mainCollider=this.rigidbody.colliderArray[0];
    if(mainCollider.body){
    Body.setVelocity(mainCollider.body,Vector.create(0,0));
    if(this.input.up) Body.setVelocity(mainCollider.body,{x:mainCollider.body.velocity.x,y:-this.maxSpeed});
    if(this.input.left) Body.setVelocity(mainCollider.body,{x:-this.maxSpeed,y:mainCollider.body.velocity.y});
    if(this.input.down) Body.setVelocity(mainCollider.body,{x:mainCollider.body.velocity.x,y:this.maxSpeed});
    if(this.input.right) Body.setVelocity(mainCollider.body,{x:this.maxSpeed,y:mainCollider.body.velocity.y});
    }}
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
    static init(){
        // return new Player(Vector.create(600,600));
    }
}
