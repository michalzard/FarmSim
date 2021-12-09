import SpriteSheet, { Textures } from "./SpritesheetHandler.js";
import Canvas from "./Canvas.js";
import Renderer from "./Renderer.js";
import { GameObject } from "./GameObject.js";


const Vector=Matter.Vector;


class PlayerInvetoryUI extends GameObject{
    constructor(){
        super();
        this.background=new SpriteSheet(Textures.invui);
        this.slots=new SpriteSheet(Textures.inv);    
    }
    draw(ctx){
       this.background.position=Vector.create(Canvas.width/2,Canvas.height/2);
       this.background.frameSize=Vector.create(80,48);
       this.background.scale=Vector.create(25,15);
       this.background.draw(ctx);
        const player=Renderer.getLayer('entities')[0];
        let x=0,y=0;
       
        if(player){
              //frame 
              for(let i=0;i<8;i++){
                for(let j=0;j<4;j++){
                    const offset=40;
                    this.slots.position=Vector.create(Canvas.width/2 - 400 + 100*i + offset,Canvas.height/2 - 180 + 100*j + offset);
                    this.slots.size=Vector.create(offset*2,offset*2);
                    this.slots.draw(ctx);
                }
            }
            for(let i=0;i<player.inventory.items.length;i++){
                const item=player.inventory.items[i];
                
                if (x % 8 == 0 && x != 0) {
                    x = 0;
                    y++;
                }
                x++;
                //texture of the item
                item.texture.position=Vector.create(Canvas.width/2 - 500 + item.texture.size.x +100*x,Canvas.height/2 - 180+item.texture.size.y+100*y);
                item.texture.draw(ctx);                
                //quantity
                ctx.fillStyle='white';
                ctx.font='15px Arial';
                ctx.fillText(item.quantity,Canvas.width/2 - 435 + 100*x,Canvas.height/2 - 105+100*y);              
                
            }
        }
    }    
}

export const playerUI=new PlayerInvetoryUI();
//TODO:finish player invetory ui,display individual slots with texture
// add character profile screen on the left from inventory itself

//TODO: Create base UserInterface class that will handle grouping of ui elements,etc.
