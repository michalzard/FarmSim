import Canvas from "./Canvas.js";
window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;

/** temporary solution */
export default class Renderer{
    static layers={
        env:[],
        buildings:[],
        entities:[],
        debug:[],
    };
    static render(){
        ctx.clearRect(0,0,Canvas.width,Canvas.height);
        for(let i=0;i<Renderer.layers.entities.length;i++){
            const objectLayer=Renderer.layers.entities;
            objectLayer[i].draw();
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
