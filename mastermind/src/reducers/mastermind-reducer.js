import mastermind from "../Mastermind";
import createSecret, {createMove} from "../utils/mastermind-util";

export default function MastermindReducer(state, action) {
    let newState = {...state};
    switch (action.type) {
        case "PLAY":
            if (newState.guess === newState.secret) {
                newState.level++;
                if (newState.level >= 10) {
                    //TODO: design and implement a solution for routing case
                    return;
                }
                newState.moves = [];
                newState.maxCounter += 10;
                newState.counter = newState.maxCounter;
                newState.lives++;
                newState.secret = createSecret(newState.level);
            } else {
                let move = createMove(newState.guess, newState.secret);
                newState.moves = [...state.moves, move];
                if (newState.moves.length >= newState.maxMoves) {
                    if (newState.lives === 0) {
                        //TODO: design and implement a solution for routing case
                        return;
                    } else {
                        newState.lives--;
                        newState.moves = [];
                        newState.counter = newState.maxCounter;
                        newState.secret = createSecret(newState.level);
                    }
                }
            }
            break;
        case "GUESS_CHANGED":
            let guess = action.payload;
            return {...state, guess};
        case "TIME_CHANGED":
            newState.counter--;
            if (newState.counter <= 0) {
                if (newState.lives === 0) {
                    //TODO: design and implement a solution for routing case
                    return;
                } else {
                    newState.lives--;
                    newState.moves = [];
                    newState.maxCounter += 10
                    newState.counter = newState.maxCounter;
                    newState.secret = createSecret(newState.level);
                }
            }
            break;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
    return newState;
}
