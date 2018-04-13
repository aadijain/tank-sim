function Wall(xm, ym, theta, d, e=-0.3, clr = 255) {
  this.theta = theta;
  this.d = d; 
  this.pm = createVector(xm, ym);
  this.p1 = createVector(xm - d * sin(theta), ym - d * cos(theta));
  this.p2 = createVector(xm + d * sin(theta), ym + d * cos(theta));
  this.e = e; 
  this.clr = clr;
  
  this.render = function() {
    push();
    stroke(this.clr);
    strokeWeight(5);
    translate(this.pm.x, this.pm.y);
    rotate(-90-this.theta);
    line(-this.d, 0, this.d, 0);
    line(0, 0, 0, 10);
    pop();
  }
}
