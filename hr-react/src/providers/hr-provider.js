import React, {useContext, useReducer} from "react";
import HrApp from "../HrApp";
import HrReducer from "../reducers/hr-reducer";
import Employee from "../model/employee";

const initial_state = {
    employee: new Employee({}),
    employees: [],
    departments: ["IT", "SALES", "FINANCE", "HR"]
}

export const HrContext = React.createContext(initial_state);

export function useHr() {
    const {hr, hrDispatcher} = useContext(HrContext);
    return {hr, hrDispatcher};
}

export function useHrDispatcher() {
    const {hrDispatcher} = useContext(HrContext);
    return hrDispatcher;
}

export function useEmployee() {
    const {hr} = useContext(HrContext);
    return hr.employee;
}

export function useEmployees() {
    const {hr} = useContext(HrContext);
    return hr.employees;
}

export function useDepartments() {
    const {hr} = useContext(HrContext);
    return hr.departments;
}

export default function HrProvider() {
    const [hr, hrDispatcher] = useReducer(HrReducer, initial_state);
    return (
        <HrContext.Provider value={{hr, hrDispatcher}}>
            <HrApp/>
        </HrContext.Provider>
    );
}
