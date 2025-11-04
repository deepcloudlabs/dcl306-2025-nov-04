function fun(x, y, z) {
    if (arguments.length !== 3) {
        throw 'you must provide exactly 3-parameters';
    }
    return x * y + z;
}

// console.log(fun())
// console.log(fun(1))
// console.log(fun(1,2))
console.log(fun(1, 2, 3))
//console.log(fun(1,2,3,4,5,6,7,8))
