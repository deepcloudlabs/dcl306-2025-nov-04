circle1 = {}
circle1.x = 0;
circle1.y = 0;
circle1.radius = 100;
circle1.area = function(){
    return Math.PI * this.radius ** 2;
}
console.log(circle1.radius)
console.log(circle1["radius"])
console.log(circle1.area)
console.log(circle1.area())
field = "radius"
console.log(circle1[field])
