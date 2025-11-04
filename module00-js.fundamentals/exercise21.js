numbers = [4, 8, 15, 16, 23, 42]
total = 0
// external loop
for (let number of numbers){
    if (number % 2 === 0){
        let cubed = number ** 3;
        total += cubed;
    }
}
console.log('total: ', total);
let if_even = n => n % 2 === 0;
let to_cube = p => p ** 3;
let to_their_sum = (partial_sum,m) => partial_sum+ m;
total = numbers.filter(if_even)
               .map(to_cube)
               .reduce(to_their_sum, 0);
console.log('total: ', total);
