const Vector=Matter.Vector;

/**
 * BASE GAMEOBJECT THAT WILL HOLD ALL THE NECCESSARY PROPERTIES
 */

export class GameObject{
    constructor(label){
        this.label=label ||'GameObject';
        this.tags='Tag';
        this.parent=null;
        this.active=true;
        this.transform={
            position:Vector.create(100,100),
            size:Vector.create(40,40),
            angle:0,
            scale:Vector.create(1,1),
        }
        GameObject.cache.push(this);
    }
    //all the gameobjects ever created are stored here for easy access;
    static cache=[];
    static Find(label){
    const results=[];
    for(let i=0;i<GameObject.cache.length;i++){
        if(GameObject.cache[i].label === label) results.push(GameObject.cache[i]);
    }
    return results;
    }
    setActive(bool){this.active=bool;}

}