const Vector=Matter.Vector;

import { GameObject } from "./GameObject.js";
import SpriteSheet from "./SpritesheetHandler.js";


export class Tile extends GameObject{
    constructor(label,textureElement,textureOptions){
        super(label);
        this.type='Tile';
        this.texture=new SpriteSheet(textureElement); //spritesheet will be used here
        this.texture.frameOffset=textureOptions.offset  ? textureOptions.offset : Vector.create(0,0);
        this.texture.frameSize=textureOptions.frameSize  ? textureOptions.frameSize : Vector.create(32,32);
        this.texture.parent=this;
        this.desiredLayer='background';
    }
    draw(ctx){
        if(this.texture){
            //testing
            this.texture.updatePositionWithParent(this.transform.position);
            this.texture.transform.size=this.transform.size;
            this.texture.draw(ctx);
        }
    }
}
//TODO:refactoris
export class TilePattern extends Tile{
    constructor(label,texture,position,size,tileCutOutSize){
        super(label,texture,position);
        this.size=size || Vector.create(100,100);
        this.patternCutoutSize=tileCutOutSize || Vector.create(16,16);
        this.patternDirection="repeat";
    }
    draw(ctx){
        ctx.save();
        ctx.fillStyle=ctx.createPattern(this.textureFromCanvas(this.texture,this.patternCutoutSize),this.patternDirection);
        ctx.rect(this.transform.position.x,this.transform.position.y,this.size.x,this.size.y);
        ctx.fill();
        ctx.restore();
    }
    textureFromCanvas(texture,desiredSize){
        const tempCanvas=document.createElement("canvas");
        const tCtx=tempCanvas.getContext('2d');
        tempCanvas.width=texture.size.x;tempCanvas.height=texture.size.y;
        tCtx.drawImage(texture.img,0,0,desiredSize.x,desiredSize.y,0,0,texture.size.x,texture.size.y);
        return tempCanvas;
    }
}

// grass leafs, rocks, ores etc.

export class Foliage extends Tile{
    constructor(label,textureElement,textureOptions){
        super(label,textureElement,textureOptions);
        this.colliders=[];
    }
}