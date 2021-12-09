/**
 * Everything related to sprites,spritesheets and image maninpulation
 */
const Vector=Matter.Vector;


export default class SpriteSheet{
    constructor(imageSrc){
    this.img=new Image();
    this.img.src=imageSrc || null;
    this.position=Vector.create(0,0);
    this.size=Vector.create(40,40); //size of the texture
    this.frameSize=Vector.create(16,16); //cut out
    this.frameOffset=Vector.create(0,0);//adds aditional pixels to cut out
    this.angle=0;
    this.startingFrame=0;//offset to start on specific frame
    this.currentFrame=this.startingFrame;//currently displayed frame
    //
    this.scale=Vector.create(1,1);
    //cols,rows
    this.frameColumns=1;
    this.frameRows=1;
    //inital setup for sprite looping
    this.loopTimestep=100;
    this.loop(this.loopTimestep);
    }

    draw(ctx){
    //update rows and columns
    const col=this.currentFrame % this.frameColumns;
    const row=Math.floor(this.currentFrame/this.frameColumns);
    ctx.save();
    //Set the origin to the center of the rectangle
    ctx.translate(this.position.x ,this.position.y);
    //rotate 
    ctx.rotate(this.angle);
    ctx.scale(this.scale.x,this.scale.y);
    //draw rect offset by half its size
    ctx.drawImage(this.img,col * this.frameSize.x+this.frameOffset.x,
    row * this.frameSize.y + this.frameOffset.y,
    this.frameSize.x,this.frameSize.y,
    -this.size.x/2,-this.size.y/2
    ,this.size.x,this.size.y);
    
    ctx.restore();
    
    }

    update(position,angle){
        this.position=position;
        this.angle=angle;
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



export const Textures={
    grass : "../Game/assets/grassdirt.png",
    inv : "../Game/assets/inventory.png",
    invui : '../Game/assets/inventoryUI.png',
}
