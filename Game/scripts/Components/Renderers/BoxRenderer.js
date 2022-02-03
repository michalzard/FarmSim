import Transform from "../Transform.js";
import ShapeRenderer from "./ShapeRenderer.js";

export default class BoxRenderer extends ShapeRenderer{
    constructor(){
        super();
    }
    render(ctx){
        if(this.enabled){
        ctx.save();
        ctx.strokeStyle=this.color;    
        //Set the origin to the center of the rectangle
        ctx.translate(this.transform.position.x,this.transform.position.y);
        //rotate 
        ctx.rotate(this.transform.angle);
        //draw rect offset by half its size
        ctx.strokeRect(-this.transform.size.x/2,-this.transform.size.y/2,this.transform.size.x,this.transform.size.y);
        
        ctx.restore();
        }else return;
    }
}