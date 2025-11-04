x = 0;
y = 0;
radius = 100;
circle1 = {x: x, y: y, radius: radius};
circle2 = {x,y,radius};
for (let field in circle1) {
    console.log(field)
    console.log(circle1[field]);
}

