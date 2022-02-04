import Component from "../Component.js";
import BoxRenderer from "../Renderers/BoxRenderer.js";
import {Body,Composite,Vector,engine} from './PhysicsConfig.js';
import BoxCollider from "./Colliders/BoxCollider.js";
import Collider from "./Colliders/Collider.js";
import Player from "../../GameObjects/Player.js";

//TODO:make rbs have id to easily determine which one needs to be selected

/** Wrapper for Matter.js Body */
export default class Rigidbody extends Component{
    constructor(originPoint){
    super();
    //TODO: set initial position differently
    this.label='Rigidbody';
    this.originPoint=originPoint;//initial position
    this.colliders=[];
    this.hitbox=new BoxRenderer();
    this.addCollider(new BoxCollider());
    Composite.add(engine.world,this.colliders[0]); // physical body added to physical world
    }
    //init,called once 
    start(){
        super.start();
        Body.setInertia(this.colliders[0],Infinity); //makes body not rotate   
    }
    update(){
       if(this.gameObject) {
           //offsets colliders
            for(let i=0;i<this.colliders.length;i++){
                const collider=this.colliders[i];
                if(!collider.started)collider.start();
            }
        
        const firstCollider=this.getColliderByIndex(0);
        if(firstCollider && this.gameObject instanceof Player)
        this.gameObject.transform.position=Vector.create(firstCollider.body.position.x-firstCollider.offset.x,firstCollider.body.position.y-firstCollider.offset.y);
        else this.gameObject.transform.position=this.originPoint;
    }
    }
    render(ctx){
        for(let i=0;i<this.colliders.length;i++){
            const collider=this.colliders[i];
            collider.hitboxRenderer.transform.position=collider.body.position;
            collider.hitboxRenderer.transform.size=collider.size;
            collider.hitboxRenderer.render(ctx);
        }
    }
    destroy(){
        //removes rigidbodies from phys world
        if(this.colliders) for(let i=0;i<this.colliders.length;i++){
            const rb=this.colliders[i];
            if(rb) Composite.remove(engine.world,rb);
        }
        
        if(this.gameObject){
        const index=this.gameObject.components.findIndex(comp=>{return comp.id === this.id});
        if(index!==-1)this.gameObject.removeComponent(index);
        }
    } 
    getColliderByIndex(index){
    if(typeof index === 'number') return this.colliders[index];
    }
    addCollider(collider){
        if(collider instanceof Collider) {
        this.colliders.push(collider);
        collider.setPosition(this.originPoint);    
        Composite.add(engine.world,collider.body);
        }else return;
    }
}



/**
 * Rigidbody
 * body(matter.js)
 * shape
 * useGravity
 * isStatic
 * isTrigger
 * isButton
 * updateTransform
 * onDestroyed
 * 
 */