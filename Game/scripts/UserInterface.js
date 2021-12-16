import SpriteSheet, {
  Textures
} from "./SpritesheetHandler.js";
import Canvas from "./Canvas.js";
import Renderer from "./Renderer.js";
import {
  GameObject
} from "./GameObject.js";


const Vector = Matter.Vector;


class PlayerInvetoryUI extends GameObject {
  constructor() {
    super();
    this.label = 'InventoryUI';
    // this.active=false;
    this.invBack = new SpriteSheet(Textures.inv);
    this.invBack.parent = this;
    //
    this.heroBack = new SpriteSheet(Textures.inv);
    this.heroBack.parent = this;
    //
    this.slots = new SpriteSheet(Textures.inv);
    this.slots.parent = this;
    //
    this.goldTxt = new SpriteSheet(Textures.inv);
    this.goldTxt.parent = this;
    window.addEventListener('keydown', (e) => { if (e.key === "b") { this.setActive(!this.active) }});
  }
  draw(ctx) {
    const originPosition = Vector.create(Canvas.width / 2 + 300, Canvas.height / 2);
    this.transform.position = originPosition;
    this.invBack.updatePositionWithParent(originPosition); // updates all positions of children
    this.invBack.frameOffset = Vector.create(0, 16);
    this.invBack.frameSize = Vector.create(80, 49);
    this.invBack.transform.scale = Vector.create(24, 15);
    this.invBack.draw(ctx);
    //character 
    this.heroBack.updatePositionWithParent(originPosition, Vector.create(-730, 0));
    this.heroBack.frameSize = Vector.create(80, 64);
    this.heroBack.frameOffset = Vector.create(0, 65);
    this.heroBack.transform.scale = new Vector.create(12, 15);
    this.heroBack.draw(ctx);

    const player = Renderer.getLayer('entities')[0];
    let x = 0,
      y = 0;

    if (player) {
      //frame 
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 4; j++) {
          const offset = 40;
          // this.slots.transform.position=Vector.create(originPosition.x- 400 + 100*i + offset,Canvas.height/2 - 180 + 100*j + offset);
          this.slots.updatePositionWithParent(originPosition, Vector.create(-400 + 100 * i + offset, -180 + 100 * j + offset));

          this.slots.transform.size = Vector.create(offset * 2, offset * 2);
          this.slots.draw(ctx);
        }
      }
      for (let i = 0; i < player.inventory.items.length; i++) {
        const item = player.inventory.items[i];

        if (x % 8 == 0 && x != 0) {
          x = 0;
          y++;
        }
        x++;
        //texture of the item
        item.texture.parent = this;
        item.texture.updatePositionWithParent(originPosition, Vector.create(-500 + item.texture.transform.size.x + 100 * x, -180 + item.texture.transform.size.y + 100 * y))
        item.texture.draw(ctx);
        //quantity
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '15px Roboto';
        const textWidth = Math.floor(ctx.measureText(item.quantity).width)/2;
        ctx.fillText(item.quantity, originPosition.x - textWidth - 430 + 100 * x, Canvas.height / 2 - 105 + 100 * y);
        ctx.restore();
      }
      ctx.save();
      ctx.fillStyle='white';
      ctx.font= '20px Roboto';
      const textWidthGold = Math.floor(ctx.measureText(player.inventory.currency.gold).width)/2;
      ctx.fillText(player.inventory.currency.gold,originPosition.x-textWidthGold+320,originPosition.y+235);
      ctx.restore();
    }
    //gold
    this.goldTxt.draw(ctx);
    this.goldTxt.updatePositionWithParent(originPosition,Vector.create(360,225));
    this.goldTxt.frameSize=Vector.create(18,16);
    this.goldTxt.frameOffset=Vector.create(48,0);
   
  }
}

export const playerUI = new PlayerInvetoryUI();
