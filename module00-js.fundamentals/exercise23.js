let Circle = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius ** 2;
    }
};

let circle1 = new Circle(0,0,100);
console.log(circle1.area());
console.log(circle1)
