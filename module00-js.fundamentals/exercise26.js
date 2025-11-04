async function fun(x, y, z) {
    if (Math.random()<0.5)
        throw "Ooops";
    return x * y + z;
}

console.log("Application is just started!");
fun(1,2,3).then(result => console.log(result))
    .catch(error => console.log(error));
console.log("Application is just completed!");
