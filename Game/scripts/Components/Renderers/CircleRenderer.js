import Transform from "../Transform.js";
import ShapeRenderer from "./ShapeRenderer.js";

export default class CircleRenderer extends ShapeRenderer {
  constructor() {
    super();
    this.radius=10;
  }
  render(ctx) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.beginPath();
    //Set the origin to the center of the rectangle
    ctx.translate(this.body.position.x, this.body.position.y);
    //rotate 
    ctx.rotate(this.body.angle);
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

  }
}
