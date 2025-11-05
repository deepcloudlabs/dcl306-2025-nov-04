import mastermind from "../Mastermind";

export default function MastermindReducer(state, action) {
    let newState = {...state};
    switch(action.type) {
        case "PLAY":
            break;
        case "GUESS_CHANGED":
            break;
        case "TIME_CHANGED":
            newState.counter--;
            break;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
    return newState;
}
