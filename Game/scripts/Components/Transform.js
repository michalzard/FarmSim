const Vector=Matter.Vector;

import Component from './Component.js';

export default class Transform extends Component{
    constructor(){
        super();
        this.label='Transform';
        this.position=Vector.create(0,0);
        this.size=Vector.create(60,60);
        this.angle=0;
        this.scale=Vector.create(1,1);
    }
}

