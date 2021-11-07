/**
 * Everything related to sprites,spritesheets and image maninpulation
 */

export class Sprite{
    constructor(src,width,height){
        this.width=width;
        this.height=height;
        this.element=new Image(this.width,this.height);
        this.element.src=src;
        /**
         * for image cutout
         */
        this.angle=0;
        this.dest={
            x:0,
            y:0,
            w:width,
            h:height,
        }
    }
    draw(ctx,position){
        //translate is used for centering of the image
        ctx.save();
        //Set the origin to the center of the rectangle
        ctx.translate(position.x,position.y );
        //rotate 
        ctx.rotate(this.angle);
        ctx.drawImage(this.element,this.dest.x,this.dest.y,this.dest.w,this.dest.h,-this.width/2,-this.height/2,this.width,this.height);
        ctx.restore();
    }
}

export class SpriteSheet{
    constructor(){
        this.sprites=[];

    }
}