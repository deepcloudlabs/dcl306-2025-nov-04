export default function createSecret(numberOfDigits=3) {
    const digits = [create_digit(1,9)];
    while (digits.length < numberOfDigits) {
        let digit = create_digit(0,9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    return Number(digits.join(""));
}

function create_digit(min=0, max=9) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
