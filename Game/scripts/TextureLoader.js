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
    size:preferredSize ? preferredSize : Vector.create(60,60),
    cutout:{
        frameSize:options ? options.frameSize : Vector.create(32,32),
        offset:options ? options.offset : Vector.create(0,0),
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

//ores and stuff
const oreSize=new Vector.create(30,30);
TextureLoader.CacheTexture('rock_1',oreTileSet,{frameSize: frameSize16,offset:Vector.create(0,0)},oreSize);
TextureLoader.CacheTexture('rock_2',oreTileSet,{frameSize: frameSize16,offset:Vector.create(16,0)},oreSize);
TextureLoader.CacheTexture('rock_3',oreTileSet,{frameSize: frameSize16,offset:Vector.create(32,0)},oreSize);
TextureLoader.CacheTexture('rock_4',oreTileSet,{frameSize: frameSize16,offset:Vector.create(48,0)},oreSize);
TextureLoader.CacheTexture('rock_4',oreTileSet,{frameSize: frameSize16,offset:Vector.create(66,0)},oreSize);