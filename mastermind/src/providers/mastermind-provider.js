import MastermindStateless from "../MastermindStateless";
import React, {useReducer} from "react";
import MastermindReducer from "../reducers/mastermind-reducer";
import {INITIAL_GAME_STATE, LOCAL_STORAGE_KEY} from "../config";


export const MastermindContext = React.createContext(INITIAL_GAME_STATE);

const localState = localStorage.getItem(LOCAL_STORAGE_KEY);

export default function MastermindProvider() {
    const [mastermind, dispatchMastermind] = useReducer(MastermindReducer, localState ? JSON.parse(localState) : INITIAL_GAME_STATE);
    return (
        <MastermindContext.Provider value={{mastermind, dispatchMastermind}}>
            <MastermindStateless/>
        </MastermindContext.Provider>
    );
}
