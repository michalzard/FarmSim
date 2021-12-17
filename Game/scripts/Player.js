import {RectangleCollider} from "./PhysicsObjects.js";
import Canvas, { Mouse } from "./Canvas.js";
import Renderer from "./Renderer.js";
import SpriteSheet from "./SpritesheetHandler.js";
import { Inventory,Item } from "./Inventory.js";
import { GameObject } from "./GameObject.js";

const ctx=Canvas.ctx;
const Body=Matter.Body,
Vector=Matter.Vector;

export default class Player extends GameObject{
    
    constructor(world,position){
        super();
        this.input={
        up:false,
        down:false,
        left:false,
        right:false,
        }
        this.maxSpeed=5;
        this.transform.size=new Vector.create(50,70)
        this.initPosition=position;
        this.collider=new RectangleCollider(world,this.initPosition,this.transform.size,false);
        //this.texture=new SpriteSheet("./assets/testsheet.jpg",this.size);
        this.inventory=new Inventory(32)
        for(let i=0;i<115;i++)
        this.inventory.addItem(new Item(77))
        Body.setInertia(this.collider,Infinity);
        Renderer.addToLayer(this,"entities");
        //listeners
        window.addEventListener("keydown",(e)=>{this.handleKeyDown(e)});
        window.addEventListener("keyup",(e)=>{this.handleKeyUp(e)});
    }
    draw(){
    this.updatePosition();
    this.collider.draw(ctx);   
    }
 
    updatePosition(){
    if(this.collider.body){
    Body.setVelocity(this.collider.body,{x:0,y:0});
    if(this.input.up) Body.setVelocity(this.collider.body,{x:this.collider.body.velocity.x,y:-this.maxSpeed});
    if(this.input.left) Body.setVelocity(this.collider.body,{x:-this.maxSpeed,y:this.collider.body.velocity.y});
    if(this.input.down) Body.setVelocity(this.collider.body,{x:this.collider.body.velocity.x,y:this.maxSpeed});
    if(this.input.right) Body.setVelocity(this.collider.body,{x:this.maxSpeed,y:this.collider.body.velocity.y});
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
    static init(world){
        return new Player(world,Vector.create(500,500));
    }
}

