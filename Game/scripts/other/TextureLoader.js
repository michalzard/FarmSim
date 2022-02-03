const Vector=Matter.Vector;

export default class TextureLoader{
    static Cache=[];
    //gets path of texture
    //saves texture name,path and image as object
    static CacheTexture(textureName,texturePath,options,preferredSize){
    if(textureName==null && texturePath==null) return;
    const img=new Image();img.src=texturePath;
    const isAlreadyInCache=this.Cache[textureName];
    if(isAlreadyInCache) return;
    else this.Cache[textureName.toLowerCase()]={img,label:textureName,
    size:preferredSize ? preferredSize : Vector.create(70,70),
    cutout:{
        frameSize:options ? options.frameSize ? options.frameSize : Vector.create(32,32) : null,
        offset:options ? options.offset ? options.offset : Vector.create(0,0) : null,
    }
    }
    }
    static LoadTexture(textureName){
    if(!textureName) return;
    return this.Cache[textureName.toLowerCase()];     
    }
}

const grassTileSet='../Game/assets/grassyTileset.png';
const invTileSet='../Game/assets/inventory.png';
const oreTileSet='../Game/assets/ores.png';
const foliageSet='../Game/assets/foliage.png';
//inv ui
TextureLoader.CacheTexture('inv',invTileSet);

//grass tile set for main town
const frameSize32=Vector.create(32,32);
const frameSize16=Vector.create(16,16);
//grass tileset
TextureLoader.CacheTexture('grassTopLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(0,0)});
TextureLoader.CacheTexture('grassTopCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(32,0)});
TextureLoader.CacheTexture('grassTopRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(64,0)});
TextureLoader.CacheTexture('grassMidLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(0,32)});
TextureLoader.CacheTexture('grassMidCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(32,32)});
TextureLoader.CacheTexture('grassMidRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(64,32)});
TextureLoader.CacheTexture('grassBotLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(0,64)});
TextureLoader.CacheTexture('grassBotCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(32,64)});
TextureLoader.CacheTexture('grassBotRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(96,96)});
TextureLoader.CacheTexture('grassBotCornerLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(64,64)});
TextureLoader.CacheTexture('grassBotCornerRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(96,64)});
//dirt tileset
TextureLoader.CacheTexture('water',grassTileSet,{frameSize: frameSize32,offset:Vector.create(128,96)});
TextureLoader.CacheTexture('dirt',grassTileSet,{frameSize: frameSize32,offset:Vector.create(160,96)});
TextureLoader.CacheTexture('dirtTopLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(160,0)});
TextureLoader.CacheTexture('dirtTopCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(192,0)});
TextureLoader.CacheTexture('dirtTopRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(224,0)});
TextureLoader.CacheTexture('dirtMidLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(160,32)});
TextureLoader.CacheTexture('dirtMidCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(192,32)});
TextureLoader.CacheTexture('dirtMidRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(224,32)});
TextureLoader.CacheTexture('dirtBotLeft',grassTileSet,{frameSize: frameSize32,offset:Vector.create(160,64)});
TextureLoader.CacheTexture('dirtBotCenter',grassTileSet,{frameSize: frameSize32,offset:Vector.create(192,64)});
TextureLoader.CacheTexture('dirtBotRight',grassTileSet,{frameSize: frameSize32,offset:Vector.create(224,64)});

const oreSize=Vector.create(40,40);
//rocks
TextureLoader.CacheTexture('rock_1',oreTileSet,{frameSize: frameSize16,offset:Vector.create(0,0)},oreSize);
TextureLoader.CacheTexture('rock_2',oreTileSet,{frameSize: frameSize16,offset:Vector.create(16,0)},oreSize);
TextureLoader.CacheTexture('rock_3',oreTileSet,{frameSize: frameSize16,offset:Vector.create(32,0)},oreSize);
TextureLoader.CacheTexture('rock_4',oreTileSet,{frameSize: frameSize16,offset:Vector.create(48,0)},oreSize);
TextureLoader.CacheTexture('rock_4',oreTileSet,{frameSize: frameSize16,offset:Vector.create(64,0)},oreSize);
//ores
TextureLoader.CacheTexture('copper_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(0,48)},oreSize);
TextureLoader.CacheTexture('coal_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(16,48)},oreSize);
TextureLoader.CacheTexture('iron_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(32,48)},oreSize);
TextureLoader.CacheTexture('gold_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(48,48)},oreSize);
TextureLoader.CacheTexture('diamond_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(64,48)},oreSize);
TextureLoader.CacheTexture('amethyst_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(80,48)},oreSize);
TextureLoader.CacheTexture('emerald_ore',oreTileSet,{frameSize: frameSize16,offset:Vector.create(96,48)},oreSize);
//raw
TextureLoader.CacheTexture('copper_raw',oreTileSet,{frameSize: frameSize16,offset:Vector.create(0,64)},oreSize);
TextureLoader.CacheTexture('coal_raw',oreTileSet,{frameSize: frameSize16,offset:Vector.create(16,64)},oreSize);
TextureLoader.CacheTexture('iron_raw',oreTileSet,{frameSize: frameSize16,offset:Vector.create(32,64)},oreSize);
TextureLoader.CacheTexture('gold_raw',oreTileSet,{frameSize: frameSize16,offset:Vector.create(48,64)},oreSize);
TextureLoader.CacheTexture('diamond',oreTileSet,{frameSize: frameSize16,offset:Vector.create(64,64)},oreSize);
TextureLoader.CacheTexture('amethyst',oreTileSet,{frameSize: frameSize16,offset:Vector.create(80,64)},oreSize);
TextureLoader.CacheTexture('emerald',oreTileSet,{frameSize: frameSize16,offset:Vector.create(96,64)},oreSize);
//ingots
TextureLoader.CacheTexture('copper_ingot',oreTileSet,{frameSize: frameSize16,offset:Vector.create(0,80)},oreSize);
TextureLoader.CacheTexture('iron_ingot',oreTileSet,{frameSize: frameSize16,offset:Vector.create(32,80)},oreSize);
TextureLoader.CacheTexture('gold_ingot',oreTileSet,{frameSize: frameSize16,offset:Vector.create(48,80)},oreSize);

//bridge
TextureLoader.CacheTexture('wooden_bridge',grassTileSet,{frameSize: Vector.create(64+32,64),offset:Vector.create(0,128)},Vector.create(400,200));
TextureLoader.CacheTexture('wooden_bridge_broken',grassTileSet,{frameSize: Vector.create(64+32,64),offset:Vector.create(96,128)},Vector.create(400,200));

const foliageSize=Vector.create(40,40);
//grass_leafs
TextureLoader.CacheTexture('grass_leafs_1',foliageSet,{frameSize: frameSize16,offset:Vector.create(0,0)},foliageSize);
TextureLoader.CacheTexture('grass_leafs_2',foliageSet,{frameSize: frameSize16,offset:Vector.create(16,0)},foliageSize);
TextureLoader.CacheTexture('grass_leafs_3',foliageSet,{frameSize: frameSize16,offset:Vector.create(32,0)},foliageSize);
TextureLoader.CacheTexture('grass_leafs_4',foliageSet,{frameSize: frameSize16,offset:Vector.create(48,0)},foliageSize);
TextureLoader.CacheTexture('grass_leafs_5',foliageSet,{frameSize: frameSize16,offset:Vector.create(64,0)},foliageSize);
//grass_plants
TextureLoader.CacheTexture('grass_plant_1',foliageSet,{frameSize: frameSize16,offset:Vector.create(80,0)},foliageSize);
TextureLoader.CacheTexture('grass_plant_2',foliageSet,{frameSize: frameSize16,offset:Vector.create(96,0)},foliageSize);
TextureLoader.CacheTexture('grass_plant_3',foliageSet,{frameSize: frameSize16,offset:Vector.create(112,0)},foliageSize);
TextureLoader.CacheTexture('grass_plant_4',foliageSet,{frameSize: frameSize16,offset:Vector.create(128,0)},foliageSize);
//flowers
TextureLoader.CacheTexture('pink_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(0,16)},foliageSize);
TextureLoader.CacheTexture('lightblue_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(16,16)},foliageSize);
TextureLoader.CacheTexture('pink_doubleflower',foliageSet,{frameSize: frameSize16,offset:Vector.create(32,16)},foliageSize);
TextureLoader.CacheTexture('purple_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(48,16)},foliageSize);
TextureLoader.CacheTexture('purpleyellow_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(64,16)},foliageSize);
TextureLoader.CacheTexture('yellowred_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(96,16)},foliageSize);
TextureLoader.CacheTexture('redorange_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(112,16)},foliageSize);
TextureLoader.CacheTexture('blue_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(112,16)},foliageSize);

TextureLoader.CacheTexture('whiteredyellow_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(0,32)},foliageSize);
TextureLoader.CacheTexture('redorange_flower',foliageSet,{frameSize: frameSize16,offset:Vector.create(16,32)},foliageSize);
TextureLoader.CacheTexture('double_orange_mushroom',foliageSet,{frameSize: frameSize16,offset:Vector.create(32,32)},foliageSize);
TextureLoader.CacheTexture('orange_mushroom',foliageSet,{frameSize: frameSize16,offset:Vector.create(48,32)},foliageSize);
TextureLoader.CacheTexture('orange_mushroom_2',foliageSet,{frameSize: frameSize16,offset:Vector.create(64,32)},foliageSize);
TextureLoader.CacheTexture('triple_brown_mushroom',foliageSet,{frameSize: frameSize16,offset:Vector.create(80,32)},foliageSize);
TextureLoader.CacheTexture('brown_mushroom',foliageSet,{frameSize: frameSize16,offset:Vector.create(96,32)},foliageSize);
TextureLoader.CacheTexture('double_brown_mushroom',foliageSet,{frameSize: frameSize16,offset:Vector.create(112,32)},foliageSize);
TextureLoader.CacheTexture('reel',foliageSet,{frameSize: frameSize16,offset:Vector.create(0,48)},foliageSize);
TextureLoader.CacheTexture('reel_small',foliageSet,{frameSize: frameSize16,offset:Vector.create(16,48)},foliageSize);
TextureLoader.CacheTexture('thorns',foliageSet,{frameSize: frameSize16,offset:Vector.create(32,48)},foliageSize);
TextureLoader.CacheTexture('big_bush',foliageSet,{frameSize: frameSize16,offset:Vector.create(48,48)},foliageSize);

