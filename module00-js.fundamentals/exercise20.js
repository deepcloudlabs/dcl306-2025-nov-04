function fun(x,y,z){
    return x*y+z;
}
fun(1,2,3);

function gun({x,y,z}){
    return x*y+z;
}
gun({
    z: 3,
    x: 1,
    y: 2,
    radius: 10
})
