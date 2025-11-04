let circle1 = {
    x: 0,
    y: 1,
    radius: 100,
    draw: {
        color: "red",
        thickness: 3,
        style: "solid"
    }
};
let circle2 = {...circle1}; // shallow
circle2.draw = {...circle1.draw}
circle2.draw.color = "blue";
console.log(circle1.draw.color);
console.log(circle2.draw.color);


