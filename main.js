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
  tank1 = new Tank(width/2, height/2, 0, 'green', 1);
}

function draw() {
  // fr.html(floor(frameRate()));
  background(0);  
  
  tank1.render();
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
    
    // collideBT(bullets1[i], tank1);
    for (var j = 0; j < walls.length; j++)
      collideBW(bullets1[i], walls[j]); 
      // if(collideBW(bullets1[i], walls[j])) 
        // j = -1;  //Multiple collisions per bullet
  }
  bullets1 = bullets2.slice();
  
  bgcolor = 0;
  for (var i = 0; i < walls.length; i++) {
    // collideTW(tank1, walls[i]);
    walls[i].render();
  }
  
  // collideTT()
  tank1.update();
}

function collideBW(bullet, wall){
  var hit = collideLineLine(bullet.pos.x, bullet.pos.y, bullet.prevPos.x, bullet.prevPos.y, wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y, true);
  if(!hit.x || !hit.y)
    return false;
    
  //reflect position (excess penetration)
  var perp = p5.Vector.fromAngle(radians(-wall.theta));  
  bullet.prevPos.x = hit.x
  bullet.prevPos.y = hit.y
  var px = p5.Vector.sub(bullet.prevPos, bullet.pos);
  perp.setMag(2 * p5.Vector.dot(perp, px));
  bullet.pos.add(perp);
  
  //reflect velocity
  perp.setMag(1);
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
  if (key == 'M' || key == ' '){
    bullets1.push(new Bullet(tank1));
  }
}
