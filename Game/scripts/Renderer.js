import WorldEditor from "../../Editor/World.js";
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
console.log(Renderer.layers);
//added ui elements
Renderer.addToLayer(WorldEditor,'ui')
