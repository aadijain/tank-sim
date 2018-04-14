function randmap(){
    return map0();   
}

function map0() {
    var map = [];
    map.push(new Wall(width / 2, 0, 90, width / 2));
    map.push(new Wall(width / 2, height, -90, width / 2));
    map.push(new Wall(width, height / 2, 0, height / 2));
    map.push(new Wall(0, height / 2, 180, height / 2));
    for (var t = -45; t <= 45; t += 10) {
        p = p5.Vector.fromAngle(radians(t));
        p.setMag(100);
        map.push(new Wall(p.x, height / 2 - p.y, t, 10));
        map.push(new Wall(width - p.x, height / 2 + p.y, 180 + t, 10));
    }
    for (var t = 0; t <= 90; t += 10) {
        p = p5.Vector.fromAngle(radians(t));
        p.setMag(100);
        map.push(new Wall(width - 100 + p.x, 100 - p.y, t, 10));
        map.push(new Wall(100 - p.x, 100 - p.y, 180 -t, 10));
        map.push(new Wall(100 - p.x, height - 100 + p.y, 180 + t, 10));
        map.push(new Wall(width - 100 + p.x, height - 100 + p.y, - t, 10));
    }
    return map;  
}

function map1() { //Circle
    var map = [];
    var r = 200;
    map.push(new Wall(width / 2, 0, 90, width / 2));
    map.push(new Wall(width / 2, height, -90, width / 2));
    map.push(new Wall(width, height / 2, 0, height / 2));
    map.push(new Wall(0, height / 2, 180, height / 2));
    map.push(new Wall(width/4, height/2, 180, 300));
    for(var t = -160; t < 160; t += 10){
        var p = p5.Vector.fromAngle(radians(t));
        p.setMag(r);
        map.push(new Wall(width / 2 + p.x, height / 2 - p.y, t, r/10));
    }
    return map;
}

function map2() { //Retro-reflector
    var map = [];
    var k = 20;
    for (var i = -height; i < height; i += 4*k) {
        map.push(new Wall(0.67 * width, i, 45, k * sqrt(2)));
        map.push(new Wall(0.67 * width, i + 2 * k, -45, k * sqrt(2)));
        map.push(new Wall(0.67 * width + 2*k, i, 135, k * sqrt(2)));
        map.push(new Wall(0.67 * width + 2*k, i + 2 * k, -135, k * sqrt(2)));        
    }
    return map;
}