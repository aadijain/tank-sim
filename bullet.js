function Bullet(tankdata) {
  this.tankdata = tankdata;
  this.mass = 1;
  this.startFrame = frameCount;
  this.lifeSpan = 10*60;
  this.alive;
  this.pos = createVector(tankdata.pos.x + 49*cos(tankdata.heading), tankdata.pos.y + 49*sin(tankdata.heading));
  this.prevPos = this.pos.copy();
  this.colour = tankdata.colour;

  this.vel = p5.Vector.fromAngle(radians(tankdata.heading));
  this.vel.mult(12);
  tankdata.ctr++;
  
  this.update = function() {
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.alive = frameCount - this.startFrame <= this.lifeSpan;
    if(!this.alive)
      tankdata.ctr--; 
  }
  
  this.render = function() {
    push();
    stroke(this.colour);
    strokeWeight(12);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
