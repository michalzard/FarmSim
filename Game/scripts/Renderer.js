import Canvas from "./Canvas.js";
window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;

/** temporary solution */
export default class Renderer{
    static layers={
        background:[],
        env:[],
        buildings:[],
        entities:[],
    };
    static render(){
        ctx.clearRect(0,0,Canvas.width,Canvas.height);
        for(let i=0;i<Renderer.layers.background.length;i++){
            const objectLayer=Renderer.layers.background;
            objectLayer[i].draw(ctx);
        }
        for(let i=0;i<Renderer.layers.env.length;i++){
            const objectLayer=Renderer.layers.env;
            objectLayer[i].draw(ctx);
        }
        for(let i=0;i<Renderer.layers.buildings.length;i++){
            const objectLayer=Renderer.layers.buildings;
            objectLayer[i].draw(ctx);
        }
        for(let i=0;i<Renderer.layers.entities.length;i++){
            const objectLayer=Renderer.layers.entities;
            objectLayer[i].draw(ctx);
        }
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
