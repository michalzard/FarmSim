const Vector=Matter.Vector;
import {Tile} from "../Game/scripts/Tile.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Canvas from "../Game/scripts/Canvas.js";

export default class WorldEditor{
    
    static availableTiles=[];
   
    static themeColors={
        blue:"#7289da",
        lightgray:"#99aab5",
        gray:"#313639",
        darkgray:"#2c2f33",
        black:"#23272a"
    }

    static translateToGrid(position){
        return Vector.create(Math.ceil(position.x/this.grid.size)*this.grid.size,Math.ceil(position.y/this.grid.size)*this.grid.size);
    }
    static filterInput=document.createElement('input');
    
    /**
     *  initializes spritesheets so textures can be used
     * @param {*} sprite can pass single sprite or array of sprites  
     * @param {*} category tag
     */
    static addTiles(tile,category){
        this.availableTiles.push({tile,category});
    }
    static draw(ctx){
        ctx.save();
        ctx.fillStyle=this.themeColors.black;
        ctx.fillRect(Canvas.width-430,Canvas.height-430,400,420);
        for(let j=0;j<6;j++){
        for(let i=0;i<6;i++){
            ctx.fillStyle=this.themeColors.gray;    
            const position=Vector.create((Canvas.width-430)+25+60*i,(Canvas.height-430)+50+60*j);
            ctx.fillRect(position.x,position.y,50,50);
        }}

        let x=0,y=0;
        //36 available visible slots,everything else hidden
        for(let i=0;i<this.availableTiles.length;i++){
          
            if(x%6==0 && x!=0){x=0;y++;}

            const avTiles=this.availableTiles[i];

            const position=Vector.create((Canvas.width-430)+50+60*x,(Canvas.height-430)+75+60*y);
            x++;

            avTiles.tile.texture.position=position;
            avTiles.tile.texture.draw(ctx);
        }
        ctx.restore();
    }
    static init(){
        //TODO
        this.filterInput.style=`position:absolute;width:200px; right:${Canvas.width/2}px;top:430px;`
        document.body.append(this.filterInput);
    }
}
WorldEditor.init();

//debug only
const grass=new SpriteSheet("../Game/assets/grassdirt.png");
const inv=new SpriteSheet("../Game/assets/inventory.png");
const t=new Tile("Grass",grass);
const t2=new Tile("inv",inv);
for(let i=0;i<33;i++)
WorldEditor.addTiles(t,"grass");
WorldEditor.addTiles(t2,"inventory");
