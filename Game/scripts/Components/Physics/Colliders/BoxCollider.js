import Collider from "./Collider.js";
import { Bodies, Vector } from "../PhysicsConfig.js";
import BoxRenderer from "../../Renderers/BoxRenderer.js";

export default class BoxCollider extends Collider{
    constructor(){
        super();
        this.label='Box Collider';
        this.size=Vector.create(60,20);
        this.offset=Vector.create(0,0);
        this.body=Bodies.rectangle(0,0,this.size.x,this.size.y,{isStatic:false});
        this.hitboxRenderer=new BoxRenderer();
    }
    start(){
        super.start();
        const offsetedPos=Vector.create(this.body.position.x+this.offset.x,this.body.position.y+this.offset.y);
        this.setPosition(offsetedPos);
    }
}


