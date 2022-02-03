const Vector=Matter.Vector;

import Component from "./Components/Component.js";
import Transform from "./Components/Transform.js";

/**
 * BASE GAMEOBJECT THAT WILL HOLD ALL THE NECCESSARY PROPERTIES
 */
let gameObjectID=1;
export default class GameObject{
    constructor(label){
        this.label=label;
        this.id=gameObjectID;
        this.parent=null;
        this.active=true;
        this.destroyed=false;
        this.transform=new Transform();
        this.transform.gameObject=this;
        this.components=[];
        this.start();        
        GameObject.gameObjects.push(this);
    }
    setActive(bool){this.active=bool;}
    //all the gameobjects ever created are stored here for easy access;
    static gameObjects=[];

    static FindById(id){
        if(typeof id === 'number'){
        return GameObject.gameObjects.find(go=>{return go.id === id});
        }
    }
    //init
    start(){
    gameObjectID++; // increase global go id
    this.startComponents();
    }
    //updates every frame
    update(){
        this.updateComponents();

    }
    destroy(){
        //removes GameObject
        const index=this.id-1;
        //destroy all components that were attached to this gameobject
        for(let i=0;i<this.components.length;i++){
            const component=this.components[i];
            component.destroy();
        }
        GameObject.gameObjects.splice(index,1);
    }
    //components
    addComponent(component){
    if(component instanceof Component){
    component.gameObject=this;
    if(!component.started)component.start(); //inits component
    this.components.push(component);
    }else return;   
    }
    removeComponent(index){
    if(typeof index ==='number'){ 
    this.components.splice(index,1);
    }else return;
    }
    /**Returns array of components that are of specific type */
    getComponentsWithType(type){
    if(type){
    const result=[];
    for(let i=0;i<this.components.length;i++){
        const component=this.components[i];
        if(component instanceof type) result.push(component);
    }
    return result;
    } else return;
    }
    getComponentWithIndex(index){
    //returns component in specific array index
    if(typeof index === 'number') return this.components[index];
    }
    //runs every frame to update every component
    updateComponents(){
    for(let i=0;i<this.components.length;i++){
        const components=this.components[i];
        if(typeof components.update === 'function')components.update();
        else return;
    }
    }

    //runs start method to initialize values
    startComponents(){
    for(let i=0;i<this.components.length;i++){
        const components=this.components[i];
        if(typeof components.start === 'function' && !components.started)components.start();
    }
    }

}
