const Vector=Matter.Vector;
import Canvas from "../Game/scripts/Canvas.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Renderer from "../Game/scripts/Renderer.js";

export default class WorldEditor{
    
    static sprites=[];

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
    static loadSprites(sprite,category){
        if(Array.isArray(sprite))
        this.sprites.push({textures:[...sprite],category});
        else this.sprites.push({textures:[sprite],category});
    }
    /**
     * adds tile to renderer to display said tile
     * @param {*} tile spritesheet instance with specific cutout dimension
     */
    static addTile(tile){
        if(tile instanceof SpriteSheet){
        tile.position=this.translateToGrid(tile.position);
        Renderer.addToLayer(tile,"background");
        }else return;
    }

}


const grassSheet=new SpriteSheet("../Game/assets/grassdirt.png",Vector.create(40,40));
const dirtSheet=new SpriteSheet("../Game/assets/grassdirt.png",Vector.create(40,40));
grassSheet.position=Vector.create(50,50);
WorldEditor.loadSprites([grassSheet,dirtSheet],'grass');
WorldEditor.loadSprites(dirtSheet,'dirt');

WorldEditor.addTile(grassSheet);

//TODO:create tile object that holds its own position,texture and all of that
//so that it can be pushed into renderer so i can create worlds quickly trough editor
