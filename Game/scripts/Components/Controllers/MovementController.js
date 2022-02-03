import Component from "../Component.js";
import Rigidbody from "../Physics/Rigidbody.js";
import { Body,Vector } from "../Physics/PhysicsConfig.js";

export default class MovementController extends Component{
    constructor(){
        super();
        this.label='Movement Controller';
        this.input={
            up:false,
            down:false,
            left:false,
            right:false,
        }
        this.maxSpeed=10;
    }
    update(){
        if(this.gameObject){
            const rb=this.gameObject.getComponentsWithType(Rigidbody);
            const rigidbody=rb[0];
            if(rigidbody){
                for(let i=0;i<rigidbody.colliders.length;i++){
                    const collider=rigidbody.colliders[i];
                    if(collider){
                    collider.setVelocity(Vector.create(0,0)); 
                    if(this.input.up) collider.setVelocity({x:collider.body.velocity.x,y:-this.maxSpeed});
                    if(this.input.left) collider.setVelocity({x:-this.maxSpeed,y:collider.body.velocity.y});
                    if(this.input.down) collider.setVelocity({x:collider.body.velocity.x,y:this.maxSpeed});
                    if(this.input.right) collider.setVelocity({x:this.maxSpeed,y:collider.body.velocity.y});
                    // console.log(collider.body.velocity);
                    }
                }
            }
        }else return;
    }
    onKeyDown(e){
        if(e.key==="w"){this.input.up=true;}
        if(e.key==="s"){this.input.down=true;}
        if(e.key==="a"){this.input.left=true;}
        if(e.key==="d"){this.input.right=true;}
    }
    onKeyUp(e){
        if(e.key==="w"){this.input.up=false;}
        if(e.key==="s"){this.input.down=false;}
        if(e.key==="a"){this.input.left=false;}
        if(e.key==="d"){this.input.right=false;}
    }
    loadEventListeners(){
        window.addEventListener('keydown',(e)=>this.onKeyDown(e));
        window.addEventListener('keyup',(e)=>this.onKeyUp(e));
    }
}