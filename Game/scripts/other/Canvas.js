const Vector=Matter.Vector;

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
        //actual canvas element appended to body
        Canvas.element.width=window.innerWidth;
        Canvas.element.height=window.innerHeight;
        //this is used by renderer to rendder into canvas
        Canvas.width=window.innerWidth;
        Canvas.height=window.innerHeight;
    }

}
window.addEventListener("resize",()=>{Canvas.resize()});



export class Mouse {
    static position=Vector.create(0,0);
    static button={left:false,right:false}
    static delta=1;
    static updatePosition(e){
    this.position=Vector.create(e.clientX,e.clientY);
    }
    static getDelta(e){
    this.delta=-e.deltaY/100;
    }
    static checkBoxCollision(position,size){
    return (this.position.x >= position.x && this.position.y>=position.y && this.position.x<position.x+size.x && this.position.y<position.y+size.y);
    }
    static onButtonDown(e){
    if(e.which===1)this.button.left=true;
    if(e.which===3)this.button.right=true;
    }
    
    static onButtonUp(e){
        if(e.which===1)this.button.left=false;
        if(e.which===3)this.button.right=false;
    }
}
window.addEventListener("mousedown",(e)=>{Mouse.onButtonDown(e);});
window.addEventListener("mouseup",(e)=>{Mouse.onButtonUp(e);});
window.addEventListener('wheel',(e)=>{Mouse.getDelta(e);});
window.addEventListener("mousemove",(e)=>{Mouse.updatePosition(e);});
