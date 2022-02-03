import Component from "./Components/Component";
import Transform from "./Components/Transform";

export default class Camera extends Component{
    constructor(){
    super();
    this.transform=new Transform();
    this.zoom=1;
    }
    move(){
        
    }
    zoom(){
        
    }    
}