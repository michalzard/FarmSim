export default class RendererLayer{
    constructor(){
        this.layer=1;
    }
    compareLayer(otherRenderer){
    return otherRenderer.layer > this.layer; 
    }
}

//TODO: USE THIS TO DETERMINE SORTING ORDER OF GAMEOBJECTS