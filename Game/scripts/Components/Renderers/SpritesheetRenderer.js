import Component from "../Component.js";
import Transform from "../Transform.js";
import GameObject from "../../GameObject.js";
const Vector=Matter.Vector;
export default class SpriteRenderer extends Component{
    constructor(ImageElement){
        super();
        this.label="Sprite Atlas";
        this.transform=new Transform();
        this.img=ImageElement || null;
        this.frameSize=Vector.create(32,32); //cut out
        this.frameOffset=Vector.create(0,0);//adds aditional offset to origin of cut out
        this.startingFrame=0;//offset to start on specific frame
        this.currentFrame=this.startingFrame;//currently displayed frame
        //cols,rows
        this.frameColumns=1;
        this.frameRows=1;
        //inital setup for sprite looping
        this.loopTimestep=100;
        this.loop(this.loopTimestep);
        this.desiredLayer='background';
        }
        render(ctx){
            if(this.img){
            ctx.save();
            //update rows and columns
            const col=this.currentFrame % this.frameColumns;
            const row=Math.floor(this.currentFrame/this.frameColumns);
            //Set the origin to the center of the rectangle
            ctx.translate(this.transform.position.x ,this.transform.position.y);
            //rotate 
            ctx.rotate(this.transform.angle);
            ctx.scale(this.transform.scale.x,this.transform.scale.y);
            //draw rect offset by half its size
            ctx.drawImage(this.img,col * this.frameSize.x+this.frameOffset.x,row * this.frameSize.y + this.frameOffset.y,this.frameSize.x,this.frameSize.y,-this.transform.size.x/2,-this.transform.size.y/2,this.transform.size.x,this.transform.size.y);
            ctx.restore();
            }
        }
        //gets called every frame
        //since texture need to be "on top" of GameObject,copy its transform
        update(){
        if(this.gameObject && this.gameObject instanceof GameObject) this.transform=this.gameObject.transform;
        }
        //init 
        start(){
            this.loop();
        }
        loop(timestep){
        setInterval(()=>{
        this.currentFrame++;
        const lastFrame=this.frameColumns*this.frameRows - 1;
        if(this.currentFrame > lastFrame){
        this.currentFrame=this.startingFrame;
        }
        },timestep);
        }
}