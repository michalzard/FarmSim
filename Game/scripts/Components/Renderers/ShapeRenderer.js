import Component from "../Component.js";
import Transform from "../Transform.js";

export default class ShapeRenderer extends Component{
    constructor(){
        super();
        this.color="red";
        this.transform=new Transform();
    }
    render(ctx){
    }
}