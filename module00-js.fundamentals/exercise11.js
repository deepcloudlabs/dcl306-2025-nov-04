let circle1 = {
    x: 0,
    y: 1,
    radius: 100,
    draw: {
        color: "red",
        thickness: 3,
        style: "solid"
    },
    fun: function () {}
};
let circle2 = JSON.parse(JSON.stringify(circle1)); // deep
circle2.draw.color = "blue";
console.log(circle1);
console.log(circle2);


