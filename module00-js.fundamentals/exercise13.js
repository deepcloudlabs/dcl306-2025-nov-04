numbers = [4,8,15,23,42,16]
numbers["100"] = 100;
numbers["radius"] = -100;
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    if (number) {
        console.log(number);
    }
}
console.log("for (let i in numbers)");
for (let i in numbers) {
    let number = numbers[i];
    console.log(`i: ${i}, number: ${number}`);
}
console.log("for (let number of numbers)");
for (let number of numbers) {
    console.log(number);
}
console.log("numbers.forEach(...)");
numbers.forEach(function(number) {
    console.log(number);
})
numbers.forEach(console.log)
