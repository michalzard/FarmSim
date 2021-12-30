const Vector=Matter.Vector;

export default class TextureLoader{
    static Cache=[];
    //gets path of texture
    //saves texture name,path and image as object
    static CacheTexture(textureName,texturePath,options){

    if(textureName==null && texturePath==null) return;
    const img=new Image();img.src=texturePath;
    const isAlreadyInCache=this.Cache[textureName];
    if(isAlreadyInCache) return;
    else this.Cache[textureName.toLowerCase()]={img,label:textureName,cutout:options ? options : {frameSize:Vector.create(32,32),offset:Vector.create(0,0)}};
    }
    static LoadTexture(textureName){
    if(!textureName) return;
    return this.Cache[textureName.toLowerCase()];     
    }
}

const grassTileSet='../Game/assets/grassyTileset.png';
const invTileSet='../Game/assets/inventory.png';
//inv ui
TextureLoader.CacheTexture('inv',invTileSet);

//grass tile set for main town
const frameSize=Vector.create(32,32);
TextureLoader.CacheTexture('grassTopLeft',grassTileSet,{frameSize,offset:Vector.create(0,0)});
TextureLoader.CacheTexture('grassTopCenter',grassTileSet,{frameSize,offset:Vector.create(32,0)});
TextureLoader.CacheTexture('grassTopRight',grassTileSet,{frameSize,offset:Vector.create(64,0)});
TextureLoader.CacheTexture('grassMidLeft',grassTileSet,{frameSize,offset:Vector.create(0,32)});
TextureLoader.CacheTexture('grassMidCenter',grassTileSet,{frameSize,offset:Vector.create(32,32)});
TextureLoader.CacheTexture('grassMidRight',grassTileSet,{frameSize,offset:Vector.create(64,32)});
TextureLoader.CacheTexture('grassBotLeft',grassTileSet,{frameSize,offset:Vector.create(0,64)});
TextureLoader.CacheTexture('grassBotCenter',grassTileSet,{frameSize,offset:Vector.create(32,64)});
TextureLoader.CacheTexture('grassBotRight',grassTileSet,{frameSize,offset:Vector.create(96,96)});
TextureLoader.CacheTexture('water',grassTileSet,{frameSize,offset:Vector.create(128,96)});

TextureLoader.CacheTexture('dirt',grassTileSet,{frameSize,offset:Vector.create(160,96)});
TextureLoader.CacheTexture('dirtTopLeft',grassTileSet,{frameSize,offset:Vector.create(160,0)});
TextureLoader.CacheTexture('dirtTopCenter',grassTileSet,{frameSize,offset:Vector.create(192,0)});
TextureLoader.CacheTexture('dirtTopRight',grassTileSet,{frameSize,offset:Vector.create(224,0)});
TextureLoader.CacheTexture('dirtMidLeft',grassTileSet,{frameSize,offset:Vector.create(160,32)});
TextureLoader.CacheTexture('dirtMidCenter',grassTileSet,{frameSize,offset:Vector.create(192,32)});
TextureLoader.CacheTexture('dirtMidRight',grassTileSet,{frameSize,offset:Vector.create(224,32)});
TextureLoader.CacheTexture('dirtBotLeft',grassTileSet,{frameSize,offset:Vector.create(160,64)});
TextureLoader.CacheTexture('dirtBotCenter',grassTileSet,{frameSize,offset:Vector.create(192,64)});
TextureLoader.CacheTexture('dirtBotRight',grassTileSet,{frameSize,offset:Vector.create(224,64)});

console.log(TextureLoader.Cache);

//TODO:custom sizes for tiles,rn its simply not putting down tiles larger by parameter definition