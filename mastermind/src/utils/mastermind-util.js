export default function createSecret(numberOfDigits = 3) {
    const digits = [create_digit(1, 9)];
    while (digits.length < numberOfDigits) {
        let digit = create_digit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    return Number(digits.join(""));
}

function create_digit(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createMove(guess, secret) {
    const guessAsString = guess.toString();
    const secretAsString = secret.toString();
    let perfectMatch = 0, partialMatch = 0;
    for (let i = 0; i < guessAsString.length; i++) {
        let g = guessAsString.charAt(i);
        for (let j = 0; j < secretAsString.length; j++) {
            let s = secretAsString.charAt(j);
            if (s === g) {
                if (i === j) {
                    perfectMatch++;
                } else {
                    partialMatch++;
                }
            }
        }
    }
    return new Move(guess,secret,perfectMatch,partialMatch);
}

export class Move {
    constructor(guess, secret,perfectMatch,partialMatch) {
        this.guess = guess;
        this.secret = secret;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
        this.message  = "";
        if (perfectMatch === 0 && this.partialMatch === 0) {
            this.message = "No match";
        }
        if (partialMatch > 0) {
            this.message = `-${this.partialMatch}`;
        }
        if (perfectMatch > 0) {
            this.message = `${this.message}+${this.perfectMatch}`;
        }
    }
}
