const Vector=Matter.Vector;
import {Tile} from "../Game/scripts/Objects.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Canvas, { Mouse } from "../Game/scripts/Canvas.js";
import Renderer from "../Game/scripts/Renderer.js";

export default class WorldEditor {

  static availableTiles = [];
  static defaultAvailableTiles = [];
  static maxSlots = 36;
  static slots = {
    lastSelectedTileIndex: -1, //default to -1 since there's tile usually at 0th index position
  };
  static currentPage = 1;
  static themeColors = {
    blue: "#7289da",
    lightgray: "#99aab5",
    gray: "#313639",
    darkgray: "#2c2f33",
    black: "#23272a"
  };
  static keybinds = {
    open: 'F1',
    changePageUp: 'ArrowUp',
    changePageDown: 'ArrowDown',
    undo : 'z',
    redo: 'y',
  };
  
  static history = {
    actions:[],
    lastAction:null,
    actionLimit:30,
    addAction:(type,tile)=>{
    //TODO : Debug this shit cuz its bugging adding and removing somehow
    if(this.history.actions.length<this.history.actionLimit) this.history.actions.push({type,tile});
    else {this.history.actions.shift();this.history.actions.push({type,tile});}
  
    },
    undo:(e)=>{
      // CTRL + Z
      if(e.ctrlKey && e.key===this.keybinds.undo){
      //undoes last action,returns tile back to world,gets rid of recorder action from array
      for(let i=0;i<this.history.actions.length;i++){
        const actions=this.history.actions[i]
        console.log(actions)
        if(actions.type==='remove') {
        const lastRemovedTile=this.history.actions[i].tile
        if(lastRemovedTile) Renderer.addToLayer(lastRemovedTile,lastRemovedTile.desiredLayer);}
        else return;
      
      }
      console.log(this.history.actions);

      }
    },
    redo:(e)=>{
      // CTRL + Y
      if(e.ctrlKey &&  e.key===this.keybinds.redo){
      
      }
    },
  };

  static opened = true;
  static input = document.createElement('input');
  /**
   *  initializes spritesheets so textures can be used
   * @param {*} sprite can pass single sprite or array of sprites  
   * @param {*} category tag
   */
  static addTiles(tile, category) {
    this.availableTiles.push({tile,category});
    this.defaultAvailableTiles.push({tile,category});
  }

  static draw(ctx) {
    const filteredTiles = this.availableTiles.filter(tile => {
      if (tile.category.includes(this.input.value)) return tile;
    });
    // if there's something in input 
    if (this.input.value.length > 0) this.availableTiles = filteredTiles;
    else this.availableTiles = this.defaultAvailableTiles;
    //input
    this.input.style = `position:absolute;left:${(Canvas.width-430)}px;top:${(Canvas.height/2)}px;width:393px;height:30px;
        background-color:${this.themeColors.darkgray};border:1px solid ${this.themeColors.darkgray};text-align:center;color:white;`;
    this.input.placeholder = "Search for specific tile";

    ctx.save();
    //background and slots
    ctx.fillStyle = this.themeColors.black;
    ctx.fillRect(Canvas.width - 430, Canvas.height / 2, 400, 420);
    ctx.fillStyle = this.themeColors.gray;
    //display slots
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 6; i++) {
        const position = Vector.create((Canvas.width - 430) + 25 + 60 * i, (Canvas.height / 2) + 50 + 60 * j);
        ctx.fillRect(position.x, position.y, 50, 50);
        //display border around slot to indicate which slot is about to be clicked
        if (Mouse.checkBoxCollision(position, Vector.create(50, 50)) && Mouse.button.left) {
          ctx.strokeStyle = "red";
          ctx.strokeRect(position.x, position.y, 50, 50);
          this.slots.lastSelectedTileIndex = i + j * 6;
        }
      }
    }


    //36 available visible slots,everything else hidden    
    let x = 0,
      y = 0;
    for (let i = 0 + (this.currentPage - 1) * this.maxSlots; i < this.maxSlots * this.currentPage; i++) {

      const avTiles = this.availableTiles[i];

      if (x % 6 == 0 && x != 0) {
        x = 0;
        y++;
      }
      const position = Vector.create((Canvas.width - 430) + 50 + 60 * x, (Canvas.height / 2) + 75 + 60 * y);

      x++;
      if (avTiles !== undefined) {
        avTiles.tile.texture.position = position;
        avTiles.tile.texture.draw(ctx);
      }
    }
    //shows currently selected tile
    this.displayGhostTile(ctx);
    
    //that mouse box check is so that you dont create tile when inside of editor window because it places tile behind editor into world
    //if tile needed in that area just move your camera so that it isnt overlaping with window
    //add
    if(Mouse.button.left && !Mouse.checkBoxCollision(Vector.create(Canvas.width-430,Canvas.height/2),Vector.create(400,420)))this.addTileToWorld();
    //remove
    if(Mouse.button.right)this.removeTileFromWorld();
    //page count text
    ctx.fillStyle = 'white';
    ctx.font = "14px Arial";
    ctx.fillText(`Pages ${this.currentPage} / ${this.maxPageCount()}`, Canvas.width - 110, (Canvas.height / 2) + 50);

    ctx.restore();
  }
  /**
   * shows currently "equipped" tile for editing
   */
  static displayGhostTile(ctx) {
    //shows current selection of tile
    if (this.slots.lastSelectedTileIndex >= 0) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      const currentTile = this.availableTiles[this.slots.lastSelectedTileIndex];
      if(currentTile){
      currentTile.tile.texture.position = Mouse.position;
      currentTile.tile.texture.draw(ctx);
      }
      ctx.restore();
    }
  }
  /** position of said tile is needed,gridSize should be put in place depending on tile*/
  static translateToGrid(position,gridSize) {
    return Vector.create(Math.round(position.x / gridSize.x) * gridSize.x, Math.round(position.y / gridSize.y) * gridSize.y);
  }
  static handleOpen(e) {
    if (e.key === this.keybinds.open) {
      this.input.style = "display:none";
      this.opened = !this.opened;
    }
  }
  static maxPageCount() {
    return Math.ceil(this.availableTiles.length / this.maxSlots);
  }
  static changeCurrentPage(e) {
    if (e.key === this.keybinds.changePageUp && this.currentPage > 1) {
      this.currentPage--;
    } else if (e.key === this.keybinds.changePageDown && this.currentPage < this.maxPageCount()) {
      this.currentPage++;
    } else return;
  }

  //ADD,REMOVE FROM LAYER
  static addTileToWorld() {
    //check if there's tile object in assigned tile 
    if (this.slots.lastSelectedTileIndex >= 0 && this.availableTiles[this.slots.lastSelectedTileIndex]!==undefined) {
    const copy = this.availableTiles[this.slots.lastSelectedTileIndex].tile;
    const worldTile = new Tile(copy.label, copy.texture, Mouse.position);
    worldTile.position = this.translateToGrid(Mouse.position,worldTile.size);
    let desiredLayerName=null;
    let isLastTileUnderMouse=false;
    if(this.availableTiles[this.slots.lastSelectedTileIndex].tile) {
    desiredLayerName=this.availableTiles[this.slots.lastSelectedTileIndex].tile.desiredLayer;
    }
    for(let i=0;i<Renderer.getLayer(desiredLayerName).length;i++){
    const toCheck=Renderer.getLayer(desiredLayerName)[i];
    const offsettedPosition=Vector.create(toCheck.position.x-toCheck.size.x/2,toCheck.position.y-toCheck.size.y/2);
    isLastTileUnderMouse=Mouse.checkBoxCollision(offsettedPosition,toCheck.size);  
    }
    
    if(worldTile && !isLastTileUnderMouse){
    Renderer.addToLayer(worldTile, worldTile.desiredLayer); 
    this.history.addAction('add',worldTile);
    }
    }
    else return;
  }
  static removeTileFromWorld(){
    let desiredLayerName=null;
    if(this.availableTiles[this.slots.lastSelectedTileIndex]!==undefined) {
    desiredLayerName=this.availableTiles[this.slots.lastSelectedTileIndex].tile.desiredLayer;
    }
    if(desiredLayerName){
      for(let i=0;i<Renderer.getLayer(desiredLayerName).length;i++){
        const tileToCheck=Renderer.getLayer(desiredLayerName)[i];
        const offsettedPosition=Vector.create(tileToCheck.position.x-tileToCheck.size.x/2,tileToCheck.position.y-tileToCheck.size.y/2); 
          if(tileToCheck!==undefined && Mouse.checkBoxCollision(offsettedPosition,tileToCheck.size)) {
            Renderer.removeFromLayer(tileToCheck,tileToCheck.desiredLayer);
            this.history.addAction('remove',tileToCheck);
          }
    }
  }else return;
}

}
document.body.append(WorldEditor.input);

document.addEventListener('keydown', (e) => {
  WorldEditor.handleOpen(e);
  WorldEditor.changeCurrentPage(e);
  WorldEditor.history.undo(e);
  WorldEditor.history.redo(e);
});

/**
 * TODO: FIGURE OUT HOW TO NOT DUPLICATE TILES WHEN YOU PLACE THEM
 * WorldEditor.placeTileToWolrd
 */


//debug only
const grass = new SpriteSheet("../Game/assets/grassdirt.png");
const inv = new SpriteSheet("../Game/assets/inventory.png");
const t = new Tile("Grass", grass);
const t2 = new Tile("inv", inv);

WorldEditor.addTiles(t, "grass");
WorldEditor.addTiles(t2, "inventory");
