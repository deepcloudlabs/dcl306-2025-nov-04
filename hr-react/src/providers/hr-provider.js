import React, {useContext, useReducer} from "react";
import HrApp from "../HrApp";
import HrReducer from "../reducers/hr-reducer";
import Employee from "../model/employee";

const initial_state = {
    employee: new Employee({}),
    employees: [],
    departments: ["IT","SALES","FINANCE","HR"]
}

export const HrContext = React.createContext(initial_state);

export default function HrProvider() {
    const [hr, hrDispatcher] = useReducer(HrReducer, initial_state);
    return (
        <HrContext.Provider value={{hr, hrDispatcher}}>
            <HrApp/>
        </HrContext.Provider>
    );
}
