import createSecret from "../utils/mastermind-util";
import MastermindStateless from "../MastermindStateless";
import React,{useReducer} from "react";
import MastermindReducer from "../reducers/mastermind-reducer";

const initialGameState = {
    level: 3,
    secret: createSecret(3),
    lives: 3,
    moves: [],
    counter: 90,
    maxCounter: 90,
    maxMoves: 10,
    guess: 123
};

export const MastermindContext = React.createContext(initialGameState);

export default function MastermindProvider(){
    const [mastermind,dispatchMastermind] = useReducer(MastermindReducer,initialGameState);
    return (
        <MastermindContext.Provider value={{mastermind,dispatchMastermind}}>
            <MastermindStateless />
        </MastermindContext.Provider>
    );
}
