import GameObject from "../GameObject.js";
import MovementController from "../Components/Controllers/MovementController.js";
import SpriteRenderer from "../Components/Renderers/SpritesheetRenderer.js";
import Rigidbody from "../Components/Physics/Rigidbody.js";
import { Body, Vector } from "../Components/Physics/PhysicsConfig.js";
const img=new Image();img.src='./assets/ores.png';


export default class Player extends GameObject{
    constructor(){
        super();
    }
    start(){
        this.label='Player';
        this.addComponent(new SpriteRenderer(img));
        this.getComponentWithIndex(0).frameSize=Vector.create(16,16);
        this.addComponent(new MovementController());
        this.addComponent(new Rigidbody());    
        const rb=this.getComponentWithIndex(2);
        if(rb){
            const firstCollider=rb.getColliderByIndex(0);
            console.log(firstCollider);
            firstCollider.size=Vector.create(50,15);
            firstCollider.offset=Vector.create(0,15);
        }
    }
    
}