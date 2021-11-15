export default class Canvas{
    static width;
    static height;
    static element;
    static ctx;
    static init(){
        Canvas.element=document.createElement('canvas');
        Canvas.ctx=Canvas.element.getContext('2d');
        //asign width and height
        Canvas.width=Canvas.element.width=window.innerWidth;
        Canvas.height=Canvas.element.height=window.innerHeight;
        //style that gets rid of any padding and set default color to black
        document.body.style="margin:0px;padding:0px;background-color:black;overflow:hidden";
        document.body.appendChild(Canvas.element);
    }
    static resize(){

    }

}

export class Mouse {
    static position={x:0,y:0};
    static updatePosition(e){
    this.position={x:e.clientX,y:e.clientY};
    }
}

window.addEventListener("mousemove",(e)=>{Mouse.updatePosition(e);});