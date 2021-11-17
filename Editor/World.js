const Vector=Matter.Vector;
import Canvas from "../Game/scripts/Canvas.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Renderer from "../Game/scripts/Renderer.js";

export default class WorldEditor{
    
    static availableSprites=[];

    static grid={
        size:40,//40x40
        row:Math.ceil(Canvas.width/40),
        col:Math.ceil(Canvas.height/40),
    };
    
    static translateToGrid(position){
        return Vector.create(Math.ceil(position.x/this.grid.size)*this.grid.size,Math.ceil(position.y/this.grid.size)*this.grid.size);
    }
    /**
     *  initializes spritesheets so textures can be used
     * @param {*} sprite can pass single sprite or array of sprites  
     */
    static addSprites(sprite,category){
        if(Array.isArray(sprite))
        this.availableSprites.push({textures:[...sprite]});
        else this.availableSprites.push({textures:[sprite],category});
    }

}

console.log(WorldEditor.availableSprites);