function fun(x, y, z) {
    return new Promise(
        (resolve, reject) => {
            if (Math.random() < 0.5) {
                reject("Oooops");
            }
            resolve(x * y + z);
        });
}
console.log("Application is just started!");
fun(1,2,3).then(result => console.log(result))
                 .catch(error => console.log(error));
console.log("Application is just completed!");

