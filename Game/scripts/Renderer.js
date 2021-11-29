import WorldEditor from "../../Editor/World.js";
import Canvas from "./Canvas.js";
window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;


export default class Renderer{
    static layers={
        background:[],
        foreground:[],
        env:[],
        buildings:[],
        entities:[],
        ui:[],
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
        if(Renderer.layers.ui.length>0){
            for(let i=0;i<Renderer.layers.ui.length;i++){
                const objectLayer=Renderer.layers.ui;
                if(objectLayer[i].opened) objectLayer[i].draw(ctx);
        }}
        window.requestAnimationFrame(Renderer.render);
    }
    static getLayer(layerName){
        
        const layers=Object.entries(Renderer.layers)
        for(let i=0;i<layers.length;i++){
        if(typeof layerName === "string" && layers[i].includes(layerName.toLowerCase())){
        const foundLayer=layers[i];
        if(foundLayer) return foundLayer[1];
    }
    }}
    static addToLayer(entity,layerName){
    const layer=this.getLayer(layerName);
    if(layer)layer.push(entity);
    }

    static removeFromLayer(entity,layerName){
        const layer=this.getLayer(layerName);
        //lookup entity,if found remove
        const foundEntity=layer.indexOf(entity);
        if(foundEntity>=0)layer.splice(foundEntity,1);
    }
}
//added ui elements
Renderer.addToLayer(WorldEditor,'ui')
