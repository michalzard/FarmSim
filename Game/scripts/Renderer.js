import {worldEdit as WorldEditor} from "../../Editor/World.js";
import Canvas from "./Canvas.js";
import { GameObject } from "./GameObject.js";
import { playerUI as PlayerInvetoryUI } from "./UserInterFace.js";
window.onload=Canvas.init();//inits canvas after whole page loads
const ctx=Canvas.ctx;
const Vector=Matter.Vector;

class Camera extends GameObject{
    constructor(){
        super();
        this.label='Player Camera';
        this.transform.position=Vector.create(Canvas.width/2,Canvas.height/2);
    }
    follow(targetsPosition){
    if(targetsPosition) {
        const relativeX=-targetsPosition.x + Canvas.width/2;
        const relativeY=-targetsPosition.y + Canvas.height/2;
        this.transform.position=Vector.create(relativeX,relativeY);
    }
    }
    zoom(zoomVector){
    this.transform.scale=Vector.create(zoomVector.x,zoomVector.y);
    }
}


export default class Renderer{
    static layers={
        background:[],
        foreground:[],
        env:[],
        buildings:[],
        entities:[],
        ui:[],
    };
    static camera=new Camera();
    static render(){
        ctx.clearRect(0,0,Canvas.width,Canvas.height);
        ctx.imageSmoothingEnabled=false; // Disabled antialiasing
        
        const player=Renderer.getLayer('entities')[0];
        if(player) Renderer.camera.follow(player.collider.body.position);
        
        ctx.save();
        ctx.translate(Renderer.camera.transform.position.x,Renderer.camera.transform.position.y);
        ctx.scale(Renderer.camera.transform.scale.x,Renderer.camera.transform.scale.y);
        //needs to be translated
        if(Renderer.layers.background.length>0){
        for(let i=0;i<Renderer.layers.background.length;i++){
            const objectLayer=Renderer.layers.background;
            if(objectLayer[i].active)objectLayer[i].draw(ctx);
        }}

        if(Renderer.layers.foreground.length>0){
        for(let i=0;i<Renderer.layers.foreground.length;i++){
            const objectLayer=Renderer.layers.foreground;
            if(objectLayer[i].active)objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.env.length>0){
        for(let i=0;i<Renderer.layers.env.length;i++){
            const objectLayer=Renderer.layers.env;
            if(objectLayer[i].active)objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.buildings.length>0){
        for(let i=0;i<Renderer.layers.buildings.length;i++){
            const objectLayer=Renderer.layers.buildings;
            if(objectLayer[i].active)objectLayer[i].draw(ctx);
        }}
        if(Renderer.layers.entities.length>0){
        for(let i=0;i<Renderer.layers.entities.length;i++){
            const objectLayer=Renderer.layers.entities;
            if(objectLayer[i].active)objectLayer[i].draw(ctx);
        }}
        
        ctx.restore();
        //

        if(Renderer.layers.ui.length>0){
            for(let i=0;i<Renderer.layers.ui.length;i++){
                const objectLayer=Renderer.layers.ui;
                if(objectLayer[i].active) objectLayer[i].draw(ctx); 
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

console.log(Renderer.camera);

//added ui elements
Renderer.addToLayer(WorldEditor,'ui');
Renderer.addToLayer(PlayerInvetoryUI,'ui');