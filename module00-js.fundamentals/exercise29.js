async function fun(x, y, z) {
    if (Math.random()<0.5)
        throw "Ooops";
    return x * y + z;
}
async function app(){
    console.log("Application is just started!");
    let result = await fun(1,2,3);
    console.log("Application is just completed!");
}

app();
