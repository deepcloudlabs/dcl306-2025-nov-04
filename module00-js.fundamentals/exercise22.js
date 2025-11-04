function* get_odds(items) {
    console.log('get_odds');
    for (let item of items) {
        console.log(`for: ${item}`);
        if (item % 2 === 1) {
            yield item;
        }
    }
}

console.log("application is just started!");
numbers = [4, 8, 15, 16, 23, 42]
let generator = get_odds(numbers);
let result = null;
do {
    result = generator.next()
    if (!result.done) {
        console.log(result.value);
    }
} while (!result.done);
for (let odd of get_odds(numbers)) {
    console.log(odd);
}
console.log("application is just completed!");
