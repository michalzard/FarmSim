const Vector=Matter.Vector;
import {Tile} from "../Game/scripts/Tile.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Canvas, { Mouse } from "../Game/scripts/Canvas.js";

export default class WorldEditor{
    
    static availableTiles=[];
    static maxSlots=36;
    static slots={
        init:()=>{
            for(let j=0;j<6;j++){
                for(let i=0;i<6;i++){
                    const position=Vector.create((Canvas.width-430)+25+60*i,(Canvas.height/2)+50+60*j);
                    this.slots.positions.push(position);
                }
            }
        },
        positions:[],
        lastSelectedTile:null ,
    }
    static currentPage=1;
    static themeColors={
        blue:"#7289da",
        lightgray:"#99aab5",
        gray:"#313639",
        darkgray:"#2c2f33",
        black:"#23272a"
    }
    static keybinds={
        open:'F1',
        changePageUp:'ArrowUp',
        changePageDown:'ArrowDown',
        
    };
    static opened=true;
    static input=document.createElement('input');
    /**
     *  initializes spritesheets so textures can be used
     * @param {*} sprite can pass single sprite or array of sprites  
     * @param {*} category tag
     */
    static addTiles(tile,category){
        this.availableTiles.push({tile,category});
    }

    static draw(ctx){
        //input
        this.input.style=`position:absolute;left:${(Canvas.width-430)}px;top:${(Canvas.height/2)}px;width:393px;height:30px;
        background-color:${this.themeColors.darkgray};border:1px solid ${this.themeColors.darkgray};text-align:center;color:white;`;
        this.input.placeholder="Search for specific tile";
        
        ctx.save();
        ctx.fillStyle=this.themeColors.black;
        ctx.strokeStyle=this.themeColors.blue;
        ctx.fillRect(Canvas.width-430,Canvas.height/2,400,420);      
        ctx.fillStyle=this.themeColors.gray;    
        //display slots
            for(let i=0;i<this.slots.positions.length;i++){
                const position=this.slots.positions[i];
                ctx.fillRect(position.x,position.y,50,50);
                //display border around slot to indicate which slot is about to be clicked
                if(Mouse.checkBoxCollision(position,Vector.create(50,50)) ){
                ctx.strokeRect(position.x,position.y,50,50);
                }
            }

        
        let x=0,y=0;
        //36 available visible slots,everything else hidden    
        for(let i=0+(this.currentPage-1)*this.maxSlots;i<this.maxSlots*this.currentPage;i++){

            const avTiles=this.availableTiles[i];
            
            if(x%6==0 && x!=0){x=0;y++;}
            const position=Vector.create((Canvas.width-430)+50+60*x,(Canvas.height/2)+75+60*y);
            const p=Vector.create(position.x-25,position.y-25);
            if(Mouse.checkBoxCollision(p,Vector.create(50,50)) && Mouse.button.left ){
                this.slots.lastSelectedTile=avTiles; // selects the tile
                ctx.strokeStyle="red";
                ctx.strokeRect(p.x,p.y,50,50);

            }

            x++;
            if(avTiles!==undefined){
            avTiles.tile.texture.position=position;
            avTiles.tile.texture.draw(ctx);
            }
        }
        this.displayGhostTile(ctx);
                //page count text
                ctx.fillStyle='white';
                ctx.font="14px Arial";
                ctx.fillText(`Pages ${this.currentPage} / ${this.maxPageCount()}`,Canvas.width-110,(Canvas.height/2)+50);
        
        ctx.restore();
    }
    /**
     * shows currently "equipped" tile for editing
     */
    static displayGhostTile(ctx){
        //shows current selection of tile
        if(this.slots.lastSelectedTile){
            const offset=40;
            ctx.save();
            ctx.globalAlpha=0.4;
            this.slots.lastSelectedTile.tile.texture.position=Vector.create(Mouse.position.x+offset,Mouse.position.y+offset/2);
            this.slots.lastSelectedTile.tile.texture.draw(ctx);
            ctx.restore();
        }
    }
    static translateToGrid(position){
        return Vector.create(Math.ceil(position.x/this.grid.size)*this.grid.size,Math.ceil(position.y/this.grid.size)*this.grid.size);
    }
    static handleOpen(e){
        if(e.key===this.keybinds.open) {
            this.input.style="display:none";
            this.opened=!this.opened;
        }
    }
    static maxPageCount(){
    return Math.ceil(this.availableTiles.length/this.maxSlots);
    }
    static changeCurrentPage(e){
        if(e.key===this.keybinds.changePageUp && this.currentPage>1){
            this.currentPage--;
        }else if(e.key===this.keybinds.changePageDown && this.currentPage<this.maxPageCount()){
            this.currentPage++;
        }else return;
    }
   
}
document.body.append(WorldEditor.input);
//
setTimeout(()=>{WorldEditor.slots.init();},100);

document.addEventListener('keydown',(e)=>{WorldEditor.handleOpen(e);WorldEditor.changeCurrentPage(e); });





//debug only
const grass=new SpriteSheet("../Game/assets/grassdirt.png");
const inv=new SpriteSheet("../Game/assets/inventory.png");
const t=new Tile("Grass",grass);
const t2=new Tile("inv",inv);
for(let i=0;i<25;i++)
WorldEditor.addTiles(t,"grass");
for(let i=0;i<25;i++)
WorldEditor.addTiles(t2,"inventory");
