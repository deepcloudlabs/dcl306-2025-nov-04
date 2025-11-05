export const ActionTypes = {
    ON_CHANGE: "on_change",
    ON_PHOTO_CHANGE: "on_photo_change",
    ON_FULLTIME_CHANGE: "on_fultime_change",
    ON_EMPLOYEE_RECEIVED: "on_employee_received",
    ON_EMPLOYEE_HIRED: "on_employee_hired",
    ON_EMPLOYEE_UPDATED: "on_employee_updated",
    ON_EMPLOYEE_FIRED: "on_employee_fired",
    ON_EMPLOYEES_RETRIEVED: "on_employees_retrieved",
    ON_ROW_CLICKED: "on_row_clicked",
    ON_EMPLOYEE_FIRED_ON_ROW: "on_row_clicked_on_ROW",
    ON_ERROR: "on_error"
}
export default function HrReducer(state, action) {
    let employee = {...state.employee};
    // implement this
    return {...state}; // shallow
}
