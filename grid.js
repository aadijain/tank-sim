function randmap(){
    return map0();   
}

function map0() {
    var map = [];
    map.push(new Wall(width / 3, height / 3, -45, 200));
    map.push(new Wall(2 * width / 3, height / 3, 45, 200));
    map.push(new Wall(width / 3, 2 * height / 3, 45, 200));
    map.push(new Wall(2 * width / 3, 2 * height / 3, -45, 200));
    return map;  
}