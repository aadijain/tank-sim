function Wall(xm, ym, theta, d, e=0.2, clr = 255) {
  this.theta = theta;
  this.pm = createVector(xm, ym);
  this.p1 = createVector(xm - d * sin(theta), ym - d * cos(theta));
  this.p2 = createVector(xm + d * sin(theta), ym + d * cos(theta));
  this.e = e; 
  this.clr = clr;
  
  this.render = function() {
    push();
    stroke(this.clr);
    strokeWeight(5);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    line(this.pm.x, this.pm.y, this.pm.x + 10 * cos(theta), this.pm.y - 10 * sin(theta));
    pop();
  }
}
