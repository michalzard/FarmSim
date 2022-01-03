const Vector=Matter.Vector;

/**
 * BASE GAMEOBJECT THAT WILL HOLD ALL THE NECCESSARY PROPERTIES
 */

export class GameObject{
    constructor(label){
        this.label=label ||'GameObject';
        this.tags=[];
        this.parent=null;
        this.active=true;
        this.transform={
            position:Vector.create(100,100),
            size:Vector.create(80,80),
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

    updatePositionWithParent(position,offset){
    if(this.parent!==null && this.parent instanceof GameObject){
    if(offset){
    const posWoffset=Vector.create(position.x+offset.x,position.y+offset.y);
    this.parent.transform.position=posWoffset;
    this.transform.position=posWoffset;
    }else{
    this.parent.transform.position=position;
    this.transform.position=position;
    }}
    }
    
}