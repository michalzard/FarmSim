import TextureLoader from "./TextureLoader.js";
import SpriteSheet from "./SpritesheetHandler.js";

export class Inventory {
  constructor(slotAmount) {
    this.items = [];
    this.maxSlots = slotAmount || 20;
    this.currency={
      gold:0,
    };
  }
  addItem(item) {
    if (this.items.length < this.maxSlots && item instanceof Item) {
      //is stackable
      if (item.quantityMax > 1) {
        let itemAlreadyInInventory = false;

        for (let i = 0; i < this.items.length; i++) {
          const inventoryItem = this.items[i];
          //if quantity is less than maximum quantity add it but if it would go over then
          if (inventoryItem.label === item.label && inventoryItem.quantity < item.quantityMax) {
            inventoryItem.quantity += item.quantity;
            itemAlreadyInInventory = true;
          }
        }
        if (!itemAlreadyInInventory) {
          this.items.push(item);
          //remove from world
        }
      } else {
        this.items.push(item);
        //remove from world
      }
    }
  }
  removeItem(itemIndex) {
    if (this.items[itemIndex]) {
      const selectedItem = this.items[itemIndex];
      selectedItem.quantity--;
      //put item somewhere else or make some interaction
    } else console.log(`Item wasnt found in index ${itemIndex}`);
  }
}


export class Item {
  constructor(id) {
    this.label = "Testing Item";
    this.texture = new SpriteSheet(TextureLoader.LoadTexture('inv').imgObject);
    this.id = id || 0;
    this.rarity = 'legendary';
    this.quantity = 1;
    this.quantityMax = 10;
    this.desiredLayer = 'env';
    this.currency={
      gold:0,
    };
  }
}
