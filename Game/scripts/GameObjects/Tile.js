import BoxCollider from "../Components/Physics/Colliders/BoxCollider.js";
import { Bodies, Body, Vector } from "../Components/Physics/PhysicsConfig.js";
import Rigidbody from "../Components/Physics/Rigidbody.js";
import SpriteRenderer from "../Components/Renderers/SpritesheetRenderer.js";
import GameObject from "../GameObject.js";

export class GrassTile extends GameObject {
    constructor(){
        super("Grass Tile");
        this.direction='none';
    }
    start(){
        super.start();
        const texture=new Image();
        texture.src='./assets/grassyTileset.png';
        this.addComponent(new SpriteRenderer(texture));
        this.transform.position=Vector.create(200,200);//inital position
        this.getComponentWithIndex(0).frameSize=Vector.create(32,32);              
    }
    setDirection(direction){
    if(direction && typeof direction === 'string') this.direction=direction;
    }
    static create(direction,position){
        const tile=new GrassTile();
        tile.setDirection(direction);
        switch(tile.direction){
            case "top-left" : 
            const rb=new Rigidbody(Vector.create(350,350));
            rb.getColliderByIndex(0).setStatic(true);
            rb.getColliderByIndex(0).size=Vector.create(60,10);
            rb.getColliderByIndex(0).offset=Vector.create(0,-25);
            rb.addCollider(new BoxCollider());
            rb.getColliderByIndex(1).setStatic(true);
            rb.getColliderByIndex(1).size=Vector.create(10,50);
            rb.getColliderByIndex(1).offset=Vector.create(-25,5);
            tile.addComponent(rb);
            break;
            case "top" : tile.getComponentWithIndex(0).frameOffset=Vector.create(32,0); break;
            case "top-right" :tile.getComponentWithIndex(0).frameOffset=Vector.create(64,0); break;
            case "mid-left" : tile.getComponentWithIndex(0).frameOffset=Vector.create(0,32); break;
            case "mid" : tile.getComponentWithIndex(0).frameOffset=Vector.create(32,32); break;
            case "mid-right" : tile.getComponentWithIndex(0).frameOffset=Vector.create(64,32); break;
            case "bot-left" : tile.getComponentWithIndex(0).frameOffset=Vector.create(0,64); break;
            case "bot" : tile.getComponentWithIndex(0).frameOffset=Vector.create(32,64); break;
            case "bot-right" : tile.getComponentWithIndex(0).frameOffset=Vector.create(64,64); break;
            default : break;
        }
        return tile;
    }
}