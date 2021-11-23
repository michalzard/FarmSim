const Vector=Matter.Vector;


export class Tile{
    constructor(label,texture,position){
        this.size=Vector.create(40,40);
        this.texture=texture;
        this.texture.position= position || this.texture.position;
        this.label=label;
    }
    draw(ctx){
        if(this.texture)this.texture.draw(ctx);
    }
}
export class TilePattern extends Tile{
    constructor(size,tileCutOutSize){
        super(this.label,this.texture,this.position);
        this.size=size || Vector.create(100,100);
        this.patternCutoutSize=tileCutOutSize || Vector.create(16,16);
        this.patternDirection="repeat";
    }
    draw(ctx){
        ctx.save();
        ctx.fillStyle=ctx.createPattern(this.textureFromCanvas(this.texture,this.patternCutoutSize),this.patternDirection);
        ctx.rect(this.position.x,this.position.y,this.size.x,this.size.y);
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