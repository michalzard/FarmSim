const Vector = Matter.Vector;
import Renderer from "../Game/scripts/Renderer.js";
import {Tile} from "../Game/scripts/Objects.js";
import SpriteSheet from "../Game/scripts/SpritesheetHandler.js";
import Canvas, { Mouse } from "../Game/scripts/Canvas.js";
import { GameObject } from "../Game/scripts/GameObject.js";
import TextureLoader from "../Game/scripts/TextureLoader.js";

class WorldEditor extends GameObject {
  constructor() {
    super();
    this.availableTiles = [];
    this.defaultAvailableTiles = [];
    this.maxSlots = 36;
    this.label = "World Editor";
    this.active=false;
    this.slots = {
      lastSelectedTileIndex: -1, //default to -1 since there's tile usually at 0th index position
    };
    this.currentPage = 1;
    this.themeColors = {
      blue: "#7289da",
      lightgray: "#99aab5",
      gray: "#313639",
      darkgray: "#2c2f33",
      black: "#23272a"
    };
    this.keybinds = {
      open: 'F1',
      changePageUp: 'ArrowUp',
      changePageDown: 'ArrowDown',
      undo: 'z',
      redo: 'y',
    };
    this.input = document.createElement('input');
    this.history = {
      actions: [],
      undoneActions: [],
      actionLimit: 30,
      addAction: (type, tile) => {
        //TODO : Debug this shit cuz its bugging adding and removing somehow
        if (this.history.actions.length < this.history.actionLimit) this.history.actions.push({ type, tile });
        else { this.history.actions.shift(); this.history.actions.push({ type, tile }); }
      },
      handleUndoAndRedo: (e) => { this.history.undo(e); this.history.redo(e); },
      undo: (e) => {
        // CTRL + Z
        if (e.ctrlKey && e.key === this.keybinds.undo) {
          //undoes last action,returns tiles back to world    
          for (let i = this.history.actions.length - 1; i > 0; i--) {
            const actions = this.history.actions[i]
            if (actions.type === 'remove') {
              const lastRemovedTile = this.history.actions[i].tile;
              if (lastRemovedTile) {

                if (this.history.undoneActions.length < this.history.actionLimit) this.history.undoneActions.push(actions);
                else { this.history.undoneActions.shift(); this.history.undoneActions.push(actions); }

                Renderer.addToLayer(lastRemovedTile, lastRemovedTile.desiredLayer);
              }
              else return;
            }
          }
        }
      },
      redo: (e) => {
        // CTRL + Y
        if (e.ctrlKey && e.key === this.keybinds.redo) {
          //redos last undo,removes undone tiles from world    
          for (let i = 0; i < this.history.undoneActions.length; i++) {
            const undoes = this.history.undoneActions[i];
            const undoneTiles = undoes.tile;

            if (undoneTiles) Renderer.removeFromLayer(undoneTiles, undoneTiles.desiredLayer);
          }
        }
      },
    };

  }
  /**
   *  initializes spritesheets so textures can be used
   * @param {*} textureArray can pass array of sprites
   * @param {*} category tag
   */
  addTileTypes(textureArray, category, layer) {
    if (Array.isArray(textureArray)) {
      for (let i = 0; i < textureArray.length; i++) {
        const texture = textureArray[i];
        texture.desiredLayer=layer;
        this.availableTiles.push({ texture, category });
        this.defaultAvailableTiles.push({ texture, category });
      }
    } else return;
  }

  /**
   * shows currently "equipped" tile for editing
   */
  displayGhostTile(ctx) {
    //shows current selection of tile
    if (this.slots.lastSelectedTileIndex >= 0) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      const currentTile = this.availableTiles[this.slots.lastSelectedTileIndex];
      if (currentTile) {
        currentTile.texture.sprite.frameSize = currentTile.texture.frameSize;
        currentTile.texture.sprite.frameOffset = currentTile.texture.offset;
        currentTile.texture.sprite.transform.size = currentTile.texture.size;
        currentTile.texture.sprite.transform.position = Mouse.position;
        currentTile.texture.sprite.draw(ctx);
      }
      ctx.restore();
    }
  }
  /** position of said tile is needed,gridSize should be put in place depending on tile*/
  translateToGrid(position, gridSize) {
    return Vector.create(Math.round(position.x / gridSize.x) * gridSize.x, Math.round(position.y / gridSize.y) * gridSize.y);
  }
  handleOpen(e) {
    if (e.key === this.keybinds.open) {
      this.input.style = "display:none";
      this.setActive(!this.active);
    }
  }
  maxPageCount() {
    return Math.ceil(this.availableTiles.length / this.maxSlots);
  }
  changeCurrentPage(e) {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else if (e.key === this.keybinds.changePageDown && this.currentPage < this.maxPageCount()) {
      this.currentPage++;
    } else return;
  }

  //ADD,REMOVE FROM LAYER
  addTileToWorld() {
    //check if there's tile object in assigned tile 
    if (this.slots.lastSelectedTileIndex >= 0 && this.availableTiles[this.slots.lastSelectedTileIndex] !== undefined) {
      const copy = this.availableTiles[this.slots.lastSelectedTileIndex];
      const worldTile = new Tile(copy.texture.label, copy.texture.sprite.img, Mouse.position);
      worldTile.desiredLayer=copy.texture.desiredLayer;
      //texture data
      worldTile.texture.frameSize = copy.texture.frameSize;
      worldTile.texture.frameOffset = copy.texture.offset;
      worldTile.transform.size = copy.texture.size;
      //position that checks with camera position
      const offsettedPosition = Vector.create(Mouse.position.x - Renderer.camera.transform.position.x, Mouse.position.y - Renderer.camera.transform.position.y);
      worldTile.transform.position = this.translateToGrid(offsettedPosition, worldTile.transform.size);
      worldTile.texture.transform.position = this.translateToGrid(offsettedPosition, worldTile.transform.size);

      let desiredLayerName = null;
      if (this.availableTiles[this.slots.lastSelectedTileIndex].texture) {
        desiredLayerName = this.availableTiles[this.slots.lastSelectedTileIndex].texture.desiredLayer;
      }
      let posHasTile = false;
      for (let i = 0; i < Renderer.getLayer(desiredLayerName).length; i++) {
        const toCheck = Renderer.getLayer(desiredLayerName)[i];

       if(toCheck.transform.position.x == worldTile.transform.position.x && toCheck.transform.position.y == worldTile.transform.position.y ){
        posHasTile=true;
        break;
       }
      }

      if (worldTile && !posHasTile) {
        Renderer.addToLayer(worldTile, worldTile.desiredLayer);
        this.history.addAction('add', worldTile);
      }
    }
    else return;
  }
  removeTileFromWorld() {
    let desiredLayerName = null;
    if (this.availableTiles[this.slots.lastSelectedTileIndex] !== undefined) {
      desiredLayerName = this.availableTiles[this.slots.lastSelectedTileIndex].texture.desiredLayer;
    }
    if (desiredLayerName) {
      for (let i = 0; i < Renderer.getLayer(desiredLayerName).length; i++) {
        const tileToCheck = Renderer.getLayer(desiredLayerName)[i];
        const relativeX = tileToCheck.transform.position.x - tileToCheck.transform.size.x / 2 + Renderer.camera.transform.position.x;
        const relativeY = tileToCheck.transform.position.y - tileToCheck.transform.size.y / 2 + Renderer.camera.transform.position.y;
        const offsettedPosition = Vector.create(relativeX, relativeY);
        // const offsettedPosition=Vector.create(tileToCheck.transform.position.x-tileToCheck.transform.size.x/2,tileToCheck.transform.position.y-tileToCheck.transform.size.y/2); 
        if (tileToCheck !== undefined && Mouse.checkBoxCollision(offsettedPosition, tileToCheck.transform.size)) {
          Renderer.removeFromLayer(tileToCheck, tileToCheck.desiredLayer);
          this.history.addAction('remove', tileToCheck);
        }
      }
    } else return;
  }


  draw(ctx) {
    const filteredTiles = this.availableTiles.filter(tile => {
      if (tile.category.includes(this.input.value)) return tile;
    });
    // if there's something in input 
    if (this.input.value.length > 0) this.availableTiles = filteredTiles;
    else this.availableTiles = this.defaultAvailableTiles;
    //input
    this.input.style = `position:absolute;left:${(Canvas.width - 430)}px;top:${(Canvas.height / 2)}px;width:393px;height:30px;background-color:${this.themeColors.darkgray};border:1px solid ${this.themeColors.darkgray};text-align:center;color:white;`;
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
          this.slots.lastSelectedTileIndex = i + j * 6 + (this.currentPage - 1) * this.maxSlots;
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
        avTiles.texture.sprite.transform.position = position;
        avTiles.texture.sprite.frameSize = avTiles.texture.frameSize;
        avTiles.texture.sprite.frameOffset = avTiles.texture.offset;
        avTiles.texture.sprite.transform.size = Vector.create(40, 40); // preview size
        avTiles.texture.sprite.draw(ctx);
      }
    }
    //shows currently selected tile
    this.displayGhostTile(ctx);
    //that mouse box check is so that you dont create tile when inside of editor window because it places tile behind editor into world
    //if tile needed in that area just move your camera so that it isnt overlaping with window
    //add
    if (Mouse.button.left && !Mouse.checkBoxCollision(Vector.create(Canvas.width - 430, Canvas.height / 2), Vector.create(400, 420)))
      this.addTileToWorld();

    //remove
    if (Mouse.button.right) this.removeTileFromWorld();
    //page count text
    ctx.fillStyle = 'white';
    ctx.font = "14px Arial";
    ctx.fillText(`Pages ${this.currentPage} / ${this.maxPageCount()}`, Canvas.width - 110, (Canvas.height / 2) + 50);

    ctx.restore();
  }

  saveWorld(e) {
    if (e.ctrlKey && e.key === "s") {
      const allLayers = Object.entries(Renderer.layers).filter(el => {
        return el[0] !== 'entities' && el[0] !== 'ui'
      });
      const jsonData = [];
      for (let i = 0; i < allLayers.length; i++) {
        const layerName = allLayers[i][0];
        const layerArray = allLayers[i][1];
        //filtered out texture object containing animation info which is not needed when saving info about world
        const ommitedArray = layerArray.map(el => {
          const { transform, label, texture } = el; const { frameOffset, frameSize } = texture;
          return { label, transform, frameOffset, frameSize };
        });
        jsonData.push({ layer: layerName, data: ommitedArray });
      }
      const mapName = 'map_name';
      localStorage.setItem(mapName, JSON.stringify(jsonData));
      console.log(`${mapName} World Saved`);
    }
  }
  loadWorld(worldName) {

    const mapData = localStorage.getItem(worldName);
    if (mapData) {
      const worldData = JSON.parse(mapData);
      for (let i = 0; i < worldData.length; i++) {
        const map = worldData[i];
        for (let j = 0; j < map.data.length; j++) {
          const mData = map.data[j];//tiles and other objects
          //using to lowercase so that it can correctly lookup needed texture
          const mDataLabel=mData.label.toLowerCase();
          //set object to load into world
          const texture=TextureLoader.LoadTexture(mDataLabel);
          const tile=new Tile(texture.label,texture.img,{offset:texture.frameOffset,frameSize:texture.frameSize});
          tile.transform.position=mData.transform.position;
          tile.transform.size=texture.size;
          tile.texture.frameSize=texture.cutout.frameSize;
          tile.texture.frameOffset=texture.cutout.offset;
          tile.texture.parent=tile;
        
          Renderer.addToLayer(tile,map.layer);
        } 
    }
  } else return;

}
}
export const worldEdit = new WorldEditor();
worldEdit.input.style = "display:none";//hide it by default
document.body.append(worldEdit.input);

document.addEventListener('keydown', (e) => {
  worldEdit.handleOpen(e);
  worldEdit.changeCurrentPage(e);
  worldEdit.history.handleUndoAndRedo(e);
  worldEdit.saveWorld(e);
});
//load texture data into format
function getTextureObject(textureName ) {
  if (typeof textureName !== "string") return;
  else return {
    label: TextureLoader.LoadTexture(textureName).label,
    sprite: new SpriteSheet(TextureLoader.LoadTexture(textureName).img),
    frameSize: TextureLoader.LoadTexture(textureName).cutout.frameSize,
    size: TextureLoader.LoadTexture(textureName).size,
    offset: TextureLoader.LoadTexture(textureName).cutout.offset,
  }
}


worldEdit.addTileTypes([
  getTextureObject('water'),
  getTextureObject('grassTopLeft'),
  getTextureObject('grassTopCenter'),
  getTextureObject('grassTopRight'),
  getTextureObject('grassMidLeft'),
  getTextureObject('grassMidCenter'),
  getTextureObject('grassMidRight'),
  getTextureObject('grassBotLeft'),
  getTextureObject('grassBotCenter'),
  getTextureObject('grassBotRight'),
  getTextureObject('grassBotCornerLeft'),
  getTextureObject('grassBotCornerRight'),
], 'grass','background');

worldEdit.addTileTypes([
  getTextureObject('dirt'),
  getTextureObject('dirtTopLeft'),
  getTextureObject('dirtTopCenter'),
  getTextureObject('dirtTopRight'),
  getTextureObject('dirtMidLeft'),
  getTextureObject('dirtMidCenter'),
  getTextureObject('dirtMidRight'),
  getTextureObject('dirtBotLeft'),
  getTextureObject('dirtBotCenter'),
  getTextureObject('dirtBotRight'),
], 'dirt','background');

worldEdit.addTileTypes([
  getTextureObject('copper_ore'),
  getTextureObject('coal_ore'),
  getTextureObject('iron_ore'),
  getTextureObject('gold_ore'),
  getTextureObject('diamond_ore'),
  getTextureObject('amethyst_ore'),
  getTextureObject('emerald_ore'),
], 'ores','foreground');

worldEdit.addTileTypes([
  getTextureObject('copper_raw'),
  getTextureObject('coal_raw'),
  getTextureObject('iron_raw'),
  getTextureObject('gold_raw'),
  getTextureObject('diamond'),
  getTextureObject('amethyst'),
  getTextureObject('emerald'),
], 'raw','foreground');

worldEdit.addTileTypes([
  getTextureObject('copper_ingot'),
  getTextureObject('iron_ingot'),
  getTextureObject('gold_ingot'),
], 'ingot','foreground');

worldEdit.addTileTypes([
  getTextureObject('wooden_bridge'),
  getTextureObject('wooden_bridge_broken'),
],'bridge','env');


worldEdit.addTileTypes([
  getTextureObject('rock_1'),
  getTextureObject('rock_2'),
  getTextureObject('rock_3'),
  getTextureObject('rock_4'),

  getTextureObject('grass_leafs_1'),
  getTextureObject('grass_leafs_2'),
  getTextureObject('grass_leafs_3'),
  getTextureObject('grass_leafs_4'),
  getTextureObject('grass_leafs_5'),
  getTextureObject('grass_plant_1'),
  getTextureObject('grass_plant_2'),
  getTextureObject('grass_plant_3'),

  getTextureObject('pink_flower'),
  getTextureObject('lightblue_flower'),
  getTextureObject('pink_doubleflower'),
  getTextureObject('purple_flower'),
  getTextureObject('purpleyellow_flower'),
  getTextureObject('yellowred_flower'),
  getTextureObject('double_orange_mushroom'),
  getTextureObject('orange_mushroom'),
  getTextureObject('orange_mushroom_2'),
  getTextureObject('triple_brown_mushroom'),
  getTextureObject('brown_mushroom'),
  getTextureObject('double_brown_mushroom'),
  getTextureObject('reel'),
  getTextureObject('reel_small'),
  getTextureObject('thorns'),
  getTextureObject('big_bush'),

], 'foliage','foreground');


setTimeout(() => { worldEdit.loadWorld('map_name'); }, 30);
