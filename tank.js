function Tank(x, y, h, colour, id = 0) {
  this.id = id;
  this.ctr = 0;
  this.pos = createVector(x, y);
  this.prevPos = this.pos.copy()
  this.heading = h;
  this.prevHeading = this.heading;
  this.mass = 10;
  this.dampening = 0.97;
  this.power = 3;
  this.torque = 5;
  this.rotation = 0;
  this.colour = colour;
  this.intersecting = false;
  this.vel = createVector(0, 0);
  this.thrust = createVector(0,0);
  this.hitboxfull = [];
  this.hitboxbody = [];
  
  this.update = function() {
    this.prevPos = this.pos.copy();
    this.prevHeading = this.heading;
    this.boost();
    this.rotate();
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    this.vel.mult(this.dampening);
  }
  
  this.setBoost = function(k) {
    this.thrust = p5.Vector.fromAngle(radians(this.heading));
    this.thrust.mult(k * this.power / this.mass);
  }
  
  this.boost = function() {
    this.vel.add(this.thrust);
    this.thrust.mult(0);
  }
  
  this.setRotation = function(k) {
    this.rotation = k * this.torque;
  }  
  
  this.rotate = function() {
    this.heading += this.rotation;
    this.rotation = 0;
  }
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(this.colour);
    rect(0, 0, 60, 40);
    rect(0, 0, 20, 20);
    rect(25, 0, 50, 8);
    pop();
  }

  this.createRotatedVector = function(px, py) {
    var vx = px * cos(this.heading) - py * sin(this.heading);
    var vy = px * sin(this.heading) + py * cos(this.heading);
    return createVector(this.pos.x + vx ,this.pos.y + vy);
  }  

  this.collisionBox = function() {
    var a = 30, b = 20;
    var c = cos(this.heading), s = sin(this.heading);
    var poly = [];
    poly[0] = this.createRotatedVector( a,-b); // body
    poly[1] = this.createRotatedVector(-a,-b);
    poly[2] = this.createRotatedVector(-a, b);
    poly[3] = this.createRotatedVector(a, b);
    poly[4] = this.createRotatedVector(0, 5); // gun
    poly[5] = this.createRotatedVector(50, 5);
    poly[6] = this.createRotatedVector(50, -5);
    poly[7] = this.createRotatedVector(0, -5);
    this.intersecting = false;
    this.hitboxgun = poly.slice(4, 8);
    this.hitboxbody = poly.slice(0, 4);
    // beginShape();
    // fill(150,150,150,150);
    // for(var i = 0; i < this.hitboxgun.length; i++)
    //   vertex(this.hitboxgun[i].x, this.hitboxgun[i].y);
    // endShape(CLOSE);
  }
}


