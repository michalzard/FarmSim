/**
 * Everything related to sprites,spritesheets and image maninpulation
 */
const Vector=Matter.Vector;

import { GameObject } from "./GameObject.js";
import { worldEdit as WorldEditor } from "../../Editor/World.js";

export default class SpriteSheet extends GameObject{
    constructor(imageSrc){
    super();
    this.label="Sprite Atlas";
    this.img=new Image();
    this.img.src=imageSrc || null;
    this.frameSize=Vector.create(16,16); //cut out
    this.frameOffset=Vector.create(0,0);//adds aditional pixels to cut out
    this.angle=0;
    this.startingFrame=0;//offset to start on specific frame
    this.currentFrame=this.startingFrame;//currently displayed frame
    //cols,rows
    this.frameColumns=1;
    this.frameRows=1;
    //inital setup for sprite looping
    this.loopTimestep=100;
    this.loop(this.loopTimestep);
    
    }

    draw(ctx){
    if(this.img!==null){
    //update rows and columns
    const col=this.currentFrame % this.frameColumns;
    const row=Math.floor(this.currentFrame/this.frameColumns);
    ctx.save();
    //Set the origin to the center of the rectangle
    ctx.translate(this.transform.position.x ,this.transform.position.y);
    //rotate 
    ctx.rotate(this.transform.angle);
    ctx.scale(this.transform.scale.x,this.transform.scale.y);
    //draw rect offset by half its size
    ctx.drawImage(this.img,col * this.frameSize.x+this.frameOffset.x,
    row * this.frameSize.y + this.frameOffset.y,
    this.frameSize.x,this.frameSize.y,
    -this.transform.size.x/2,-this.transform.size.y/2
    ,this.transform.size.x,this.transform.size.y);
    ctx.restore();
    }
    }

    update(position,angle){
        this.transform.position=position;
        this.transform.angle=angle;
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

const TEXTURE_PATHS={
    Grass:"../Game/assets/grassdirt.png",
    Inv:"../Game/assets/inventory.png"
}
export const TEXTURE_DATA={
    inv:{
        texturePath:TEXTURE_PATHS.Inv,
    },
    grassclean:{
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(0,0),
    },
    grasstopleft : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(0,32),
    },
    grasstopmid : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(16,32),
    },
    grasstopright : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(32,32),
    },
    grassmidleft : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(0,48),
    },
    grassmidmid : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(16,48),
    },
    grassmidright : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(32,48),
    },
    grassbotleft : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(0,64),
    },
    grassbotmid : {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(16,64),
    },
    grassbotright: {
        texturePath:TEXTURE_PATHS.Grass,
        frameOffset:new Vector.create(32,64),
    },
}
