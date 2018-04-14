function Puck(x, y) {
    this.mass = 5;
    this.radius = 70;
    this.heading = 0;
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy()
    this.dampening = 0.05;
    this.rotation = 0;
    this.colour = 70;
    this.vel = createVector(0, 0);
    // this.acc = createVector(0, 0);

    this.update = function () {
        this.prevPos = this.pos.copy();
        // this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
        this.vel.mult(1 - this.dampening/this.mass);
        // this.acc.mult(0);
    }

    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        stroke(255);
        strokeWeight(1);
        fill(70, 100, 100);
        var angle = 360 / 36;
        beginShape(TRIANGLE_FAN);
        for (var a = 0; a < 360; a += angle) {
            var sx = cos(a) * this.radius/2;
            var sy = sin(a) * this.radius/2;
            vertex(sx, sy);
        }
        endShape(CLOSE);
        pop();
    }
}


