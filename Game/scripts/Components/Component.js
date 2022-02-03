//TODO: IDs
let ComponentID=1;
export default class Component{
    constructor(){
    this.label='Component';
    this.id=ComponentID;
    this.gameObject=null;//
    this.enabled=true;
    this.started=false;
    }

    enable(){this.enabled=true;}
    disable(){this.enabled=false;}
    //
    update(){

    }
    destroy(){
        //on destroy
    }
    //called once on initialization
    start(){
        ComponentID++;
        this.started=true;
        this.loadEventListeners();
    }
    loadEventListeners(){
        // console.log(`${this.label} listeners loaded`);
    }
}





