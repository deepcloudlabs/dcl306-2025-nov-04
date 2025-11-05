import createSecret from "./utils/mastermind-util";

const ACTION_TYPES = {
    PLAY: "PLAY",
    GUESS_CHANGED: "GUESS_CHANGED",
    TIME_CHANGED: "TIME_CHANGED"
}

export const GAME_STATUS = {
    "CONTINUES": 1,
    "WINS": 2,
    "LOSES": 3

};

export const LOCAL_STORAGE_KEY = "mastermind-v2";

export const INITIAL_GAME_STATE = {
    level: 3,
    secret: createSecret(3),
    lives: 3,
    moves: [],
    counter: 90,
    maxCounter: 90,
    maxMoves: 10,
    guess: 123,
    status: GAME_STATUS.CONTINUES
};
export default ACTION_TYPES;
