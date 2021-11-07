const Bodies=Matter.Bodies,
Body=Matter.Body,
Composite=Matter.Composite,
Vector=Matter.Vector

export class RectangleCollider{
    constructor(worldToSpawn,position,size,isStatic){
        this.position=position || Vector.create(0,0);
        this.size=size || Vector.create(10,10);
        this.isStatic=isStatic || false;
        this.body=Bodies.rectangle(this.position.x,this.position.y,this.size.x,this.size.y,{isStatic:this.isStatic});
        /*
        expected format to add object to physical world
        Composite.add(engine.world, [boxA, boxB, ground]);
        */
        Composite.add(worldToSpawn,this.body);//World.add
    }
    draw(ctx){
        //needs to be rendered
        ctx.save();
        ctx.strokeStyle="red";   
        ctx.strokeRect(this.body.position.x-this.size.x/2,this.body.position.y-this.size.y/2,this.size.x,this.size.y);
        ctx.restore();
    }
    /**
     * Matter.Body.applyForce(body, position, force)
     */
    applyForce(force){
    if(typeof force === "object"){
    Body.applyForce(this.body,this.body.position,force);
    }
    }
}

export class CircleCollider{
    constructor(worldToSpawn,position,radius,isStatic){
        this.position=position || Vector.create(0,0);
        this.radius=radius || Vector.create(10,10);
        this.isStatic=isStatic || false;
        this.body=Bodies.circle(this.position.x,this.position.y,this.radius,{isStatic:this.isStatic});
        /*
        expected format to add object to physical world
        Composite.add(engine.world, [boxA, boxB, ground]);
        */
        Composite.add(worldToSpawn,this.body);//World.add
    }
    draw(ctx){
        //needs to be rendered
        ctx.save();
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.arc(this.body.position.x-this.radius/2,this.body.position.y-this.radius/2,this.radius,0,Math.PI*2);
        ctx.stroke();
        ctx.restore();
    }
     /**
     * Matter.Body.applyForce(body, position, force)
     */
      applyForce(force){
        if(typeof force === "object"){
        Body.applyForce(this.body,this.body.position,force);
        }
    }
}


export class PolygonCollider{
    constructor(worldToSpawn,position,numOfSides,radius,isStatic){
        this.position=position || Vector.create(0,0);
        this.sides=numOfSides || 5;
        this.radius=radius || Vector.create(10,10);
        this.isStatic=isStatic || false;
        this.body=Bodies.polygon(this.position.x,this.position.y,this.sides,this.radius,{isStatic:this.isStatic});
        /*
        expected format to add object to physical world
        Composite.add(engine.world, [boxA, boxB, ground]);
        */
        Composite.add(worldToSpawn,this.body);//World.add
    }
    draw(ctx){
    //needs to be rendered
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "red";   
    ctx.moveTo (this.body.position.x-this.radius/2 +  this.radius * Math.cos(0),
    this.body.position.y-this.radius/2 +  this.radius  *  Math.sin(0));          
    for (let i=0;i<=this.sides;i++) {
    ctx.lineTo (this.body.position.x-this.radius/2 +  this.radius * Math.cos(i * 2 * Math.PI / this.sides),
    this.body.position.y-this.radius/2 +  this.radius * Math.sin(i * 2 * Math.PI / this.sides));
    }
    ctx.stroke();
    ctx.restore();
    }
     /**
     * Matter.Body.applyForce(body, position, force)
     */
    applyForce(force){
    if(typeof force === "object"){
    Body.applyForce(this.body,this.body.position,force);
    }
    }
}