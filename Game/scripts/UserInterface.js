import SpriteSheet, { Textures } from "./SpritesheetHandler.js";
import Canvas from "./Canvas.js";

const Vector=Matter.Vector;

class UserInterface{
    static opened=true;
}

export class PlayerInvetoryUI extends UserInterface{
    static background=new SpriteSheet('./assets/inventoryUI.png');
    static opened=true;

    static draw(ctx){
       this.background.position=Vector.create(Canvas.width/2,Canvas.height/2);
       this.background.frameSize=Vector.create(80,48);
       this.background.scale=Vector.create(25,15);
       this.background.draw(ctx);
       
    }
}
//TODO:finish player invetory ui,display individual slots with texture
// add character profile screen on the left from inventory itself

//TODO: Create base UserInterface class that will handle grouping of ui elements,etc.