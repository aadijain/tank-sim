var tank1;
var walls, bullets1, bullets2;
var gameend, winner, timeout, handle;
var bgcolor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  newGame();                  
  // fr = createP('');
}
function newGame(){
  walls = randmap().slice();
  bullets1 = []; bullets2 = [];
  tank1 = new Tank(40, height / 2, 0, 'green', 1);
  puck = new Puck(width/2, height/2);
}

function draw() {
  // fr.html(floor(frameRate()));
  background(0);  
  
  // puck.render();
  // tank1.render();
  tank1.collisionBox();  
  
  if (keyIsDown(UP_ARROW))
    tank1.setBoost(1);
  else if (keyIsDown(DOWN_ARROW)) 
    tank1.setBoost(-1);
    
  if (keyIsDown(LEFT_ARROW))
    tank1.setRotation(-1);
  else if (keyIsDown(RIGHT_ARROW))
    tank1.setRotation(1);  

  bullets2 = [];
  for (var i = 0; i < bullets1.length; i++) {
    bullets1[i].render();
    bullets1[i].update();
    
    if(bullets1[i].alive)
      bullets2.push(bullets1[i]);
    else
      continue;
    
    collideBT(bullets1[i], tank1);
    for (var j = 0; j < walls.length; j++)
      // collideBW(bullets1[i], walls[j]); 
      if(collideBW(bullets1[i], walls[j])) 
        j = -1;  //Multiple collisions per bullet
  }
  bullets1 = bullets2.slice();
  
  collideTP(tank1, puck);
  
  for (var i = 0; i < walls.length; i++) {
    collideTW(tank1, walls[i]);
    collidePW(puck, walls[i]);
    walls[i].render();
  }
  
  puck.render();
  tank1.render();
  puck.update();
  tank1.update();
}

function collideTP(tank, puck) {
  if (collideCirclePoly(puck.pos.x, puck.pos.y, puck.radius, tank.hitboxbody)) {
    var dir = p5.Vector.sub(puck.pos, tank.pos);
    dir.setMag(tank.vel.mag() * tank.mass/ puck.mass);
    puck.vel.add(dir);
    dir.setMag(puck.vel.mag() * puck.mass / tank.mass);
    tank.vel.sub(dir);
  }
}


function collideBT(bullet, tank) {
  if (collideLinePoly(bullet.pos.x, bullet.pos.y, bullet.prevPos.x, bullet.prevPos.y, tank.hitboxbody)) {
    var dir = bullet.vel;
    dir.mult(bullet.mass / tank.mass);
    tank.vel.add(dir);
    bullet.lifeSpan = 0;
  }
}

function collidePW(puck, wall) {
  var hit = collideLineCircle(wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y, puck.pos.x, puck.pos.y, puck.radius);
  if (!hit)
    return false;

  var para, perp = p5.Vector.fromAngle(radians(-wall.theta));//one way wall
  if (p5.Vector.dot(perp, puck.vel) < 0)
    return true;

  perp = p5.Vector.fromAngle(radians(-wall.theta)); //reflect velocity
  perp.mult(p5.Vector.dot(perp, puck.vel));
  para = p5.Vector.sub(puck.vel, perp);
  perp.mult(1);
  puck.vel = p5.Vector.sub(para, perp);

  return true;
}




function collideTW(tank, wall){
  var hit1 = collideLinePoly(wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y, tank.hitboxbody);
  var hit2 = collideLinePoly(wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y, tank.hitboxgun);
  var hit = hit1 || hit2;
  if (!hit)
    return false;
  tank.intersecting = hit2;
    
  var para, perp = p5.Vector.fromAngle(radians(-wall.theta));//one way wall
  if (p5.Vector.dot(perp, tank.vel) < 0)
    return true;
    
  perp = p5.Vector.fromAngle(radians(-wall.theta)); //reflect velocity
  perp.mult(p5.Vector.dot(perp, tank.vel));
  para = p5.Vector.sub(tank.vel, perp);
  perp.mult(wall.e);
  tank.vel = p5.Vector.sub(para, perp);

  p5.Vector.fromAngle(radians(-wall.theta)); //align thrust
  perp.mult(Math.abs(p5.Vector.dot(perp, tank.thrust)));
  para = p5.Vector.sub(tank.thrust, perp);
  perp.setMag(-10);
  tank.thrust = p5.Vector.sub(para, perp);  

  return true;
}


function collideBW(bullet, wall){
  var hit = collideLineLine(bullet.pos.x, bullet.pos.y, bullet.prevPos.x, bullet.prevPos.y, wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y, true);
  if (!hit.x || !hit.y)
    return false;
    
  var perp = p5.Vector.fromAngle(radians(-wall.theta));  //walls are one way
  if (p5.Vector.dot(perp, bullet.vel) < 0)
    return false;

  //reflect position (excess penetration)
  bullet.prevPos.x = hit.x
  bullet.prevPos.y = hit.y
  var px = p5.Vector.sub(bullet.prevPos, bullet.pos);
  perp.setMag(2 * p5.Vector.dot(perp, px));
  bullet.pos.add(perp);
  
  //reflect velocity
  var perp = p5.Vector.fromAngle(radians(-wall.theta));  
  perp.setMag(p5.Vector.dot(perp, bullet.vel));
  var para = p5.Vector.sub(bullet.vel, perp);
  bullet.vel = p5.Vector.sub(para, perp);

  push();
  strokeWeight(12);
  stroke(bullet.colour);
  point(hit.x, hit.y);
  pop();
  return true;
}

function keyPressed() {
  if ((key == 'M' || key == ' ') && !tank1.intersecting){
    bullets1.push(new Bullet(tank1));
  }
}
