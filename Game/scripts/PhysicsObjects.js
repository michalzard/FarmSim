const Bodies=Matter.Bodies,
Body=Matter.Body,
Composite=Matter.Composite,
Vector=Matter.Vector

export class RectangleCollider{
    constructor(worldToSpawn,position,size,isStatic){
        this.body=Bodies.rectangle(position.x,position.y,size.x,size.y,{isStatic:isStatic});
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
        //Set the origin to the center of the rectangle
        ctx.translate(this.body.position.x ,this.body.position.y );
        //rotate 
        ctx.rotate(this.body.angle);
        //draw rect offset by half its size
        ctx.strokeRect(-this.size.x/2,-this.size.y/2,this.size.x,this.size.y);
        
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
        //Set the origin to the center of the rectangle
        ctx.translate(this.body.position.x,this.body.position.y);
        //rotate 
        ctx.rotate(this.body.angle);
        ctx.arc(0,0,this.radius,0,Math.PI*2);
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

