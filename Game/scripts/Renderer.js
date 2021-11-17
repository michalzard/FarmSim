import Canvas from "./Canvas.js";
window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;

/** temporary solution */
export default class Renderer{
    static layers={
        background:[],
        foreground:[],
        env:[],
        buildings:[],
        entities:[],
        UI:[],
    };
    static render(){
        ctx.clearRect(0,0,Canvas.width,Canvas.height);
        if(Renderer.layers.background.length>0){
        for(let i=0;i<Renderer.layers.background.length;i++){
            const objectLayer=Renderer.layers.background;
            objectLayer[i].draw(ctx);
        }}

        if(Renderer.layers.foreground.length>0){
        for(let i=0;i<Renderer.layers.foreground.length;i++){
            const objectLayer=Renderer.layers.foreground;
            objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.env.length>0){
        for(let i=0;i<Renderer.layers.env.length;i++){
            const objectLayer=Renderer.layers.env;
            objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.buildings.length>0){
        for(let i=0;i<Renderer.layers.buildings.length;i++){
            const objectLayer=Renderer.layers.buildings;
            objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.entities.length>0){
        for(let i=0;i<Renderer.layers.entities.length;i++){
            const objectLayer=Renderer.layers.entities;
            objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.UI.length>0){
            for(let i=0;i<Renderer.layers.entities.length;i++){
                const objectLayer=Renderer.layers.UI;
                objectLayer[i].draw(ctx);
        }}
        window.requestAnimationFrame(Renderer.render);
    }
    static addToLayer(entity,layerName){
    const layers=Object.entries(Renderer.layers)
    for(let i=0;i<layers.length;i++){
    if(layers[i].includes(layerName.toLowerCase())){
    const foundLayer=layers[i];
    const layerArray=foundLayer[1];
    if(layerArray)layerArray.push(entity);
    }
    }
    }
}


import SpriteSheet from "./SpritesheetHandler.js";
import WorldEditor from "../../Editor/World.js";
const Vector=Matter.Vector;

class Tile{
    constructor(texture,position){
        this.position=position || Vector.create(0,0);
        this.size=Vector.create(40,40);
        this.texture=texture;
    }
    draw(ctx){
        if(this.position.x !== this.texture.position.x || this.position.y !== this.texture.position.y)
        this.texture.position=this.position;
        else return;
        if(this.texture)this.texture.draw(ctx);
    }
}
class TilePattern{
    constructor(texture,position,size,tileCutOutSize){
        this.position=position || Vector.create(0,0);
        this.texture=texture;
        this.size=size || Vector.create(100,100);
        this.patternCutoutSize=tileCutOutSize || Vector.create(16,16);
        this.patternDirection="repeat";
    }
    draw(ctx){
        ctx.save();
        ctx.fillStyle=ctx.createPattern(this.textureFromCanvas(this.texture,this.patternCutoutSize),this.patternDirection);
        ctx.rect(this.position.x,this.position.y,this.size.x,this.size.y);
        ctx.fill();
        ctx.restore();
    }
    textureFromCanvas(texture,desiredSize){
        const tempCanvas=document.createElement("canvas");
        const tCtx=tempCanvas.getContext('2d');
        tempCanvas.width=texture.size.x;tempCanvas.height=texture.size.y;
        tCtx.drawImage(texture.img,0,0,desiredSize.x,desiredSize.y,0,0,texture.size.x,texture.size.y);
        return tempCanvas;
    }
}


//FOR DEBUGGING
const grassSheet=new SpriteSheet("../Game/assets/grassdirt.png");
const grassPattern=new TilePattern(grassSheet,Vector.create(0,0),Vector.create(1000,1000),Vector.create(16,16));
WorldEditor.addSprites(grassPattern,"grass");
Renderer.addToLayer(grassPattern,"background");