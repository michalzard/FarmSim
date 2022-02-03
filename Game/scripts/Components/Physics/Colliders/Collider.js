import Component from '../../Component.js';
import { Body } from '../PhysicsConfig.js';

export default class Collider extends Component{
    constructor(){
        super();
        this.label='Base Collider';
        this.body=null; // Matter.body 
        this.hitbox=null;
    }
    render(ctx){
        super.render();
        if(this.hitbox.enabled) this.hitbox.render(ctx);
    }
    /*
    * Applies a force to a body from a given world-space position, including resulting torque.
    */
    applyForce(force){
    if(this.body && typeof force === 'object') Body.applyForce(this.body,this.body.position,force);
    }
    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     */
    setPosition(position){
    if(this.body && typeof position === 'object') Body.setPosition(this.body,position);
    }
    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity. 
     */
    setStatic(bool){
    if(this.body && typeof bool === 'boolean') Body.setStatic(this.body,bool);
    }
    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged.
     */
    setVelocity(velocity){
        if(this.body && typeof velocity === 'object') Body.setVelocity(this.body,velocity);
    }
    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     */
    setAngle(angle){
        if(this.body && typeof angle === 'number') Body.setAngle(this.body,angle);
    }
    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     */
    setDensity(density){
        if(this.body && typeof density === 'number') Body.setDensity(this.body,density);
    }
    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     */
    setMass(mass){
        if(this.body && typeof mass === 'number') Body.setMass(this.body,mass);
    }
}