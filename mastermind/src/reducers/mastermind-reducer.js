import createSecret, {createMove} from "../utils/mastermind-util";
import ACTION_TYPES, {GAME_STATUS, LOCAL_STORAGE_KEY} from "../config";

function play(state) {
    let newState = {...state};
    if (newState.guess === newState.secret) {
        newState.level++;
        if (newState.level > 10) {
            newState.status = GAME_STATUS.WINS;
            return newState;
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
                newState.status = GAME_STATUS.LOSES;
            } else {
                newState.lives--;
                newState.moves = [];
                newState.counter = newState.maxCounter;
                newState.secret = createSecret(newState.level);
            }
        }
    }
    return newState;
}

function handleChange(state, action) {
    let guess = action.payload;
    return {...state, guess}
}

function countDown(state) {
    const newState = {...state};
    newState.counter--;
    if (newState.counter <= 0) {
        if (newState.lives === 0) {
            newState.status = GAME_STATUS.LOSES;
            return newState;
        } else {
            newState.lives--;
            newState.moves = [];
            newState.maxCounter += 10
            newState.counter = newState.maxCounter;
            newState.secret = createSecret(newState.level);
        }
    }
    return newState;
}

export default function MastermindReducer(state, action) {
    let newState;
    switch (action.type) {
        case ACTION_TYPES.PLAY:
            newState = play(state);
            break;
        case ACTION_TYPES.GUESS_CHANGED:
            newState = handleChange(state, action);
            break;
        case ACTION_TYPES.TIME_CHANGED:
            newState = countDown(state);
            break;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
}
