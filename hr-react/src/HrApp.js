import Container from "./components/common/container";
import Card from "./components/common/card";
import {useDepartments, useEmployee, useHr, useHrDispatcher} from "./providers/hr-provider";
import InputText from "./components/common/input-text";
import React, {useCallback} from "react";
import SelectBox from "./components/common/select-box";
import Photo from "./components/common/photo";
import CheckBox from "./components/common/check-box";
import {ActionTypes} from "./reducers/hr-reducer";
import Button from "./components/common/button";
import callApi, {API_OPTIONS} from "./utils/api-utils";
import EmployeeCard from "./components/EmployeesCard";

function HrApp() {
    const employee = useEmployee();
    const departments = useDepartments();
    const hrDispatcher = useHrDispatcher();

    const handleChange = useCallback(e => {
        hrDispatcher({type: ActionTypes.ON_CHANGE, value: e.target.value, name: e.target.name});
    }, [hrDispatcher]);

    const handlePhotoChange = useCallback(value => {
        hrDispatcher({type: ActionTypes.ON_PHOTO_CHANGE, value, name: 'photo'})
    }, [hrDispatcher]);

    const handleFullTimeChange = useCallback(e => {
        hrDispatcher({type: ActionTypes.ON_FULLTIME_CHANGE, value: e.target.checked, name: 'fulltime'})
    }, [hrDispatcher]);

    const handleError = useCallback(err => {
        hrDispatcher({type: ActionTypes.ON_ERROR, value: err});
    }, [hrDispatcher]);

    const findEmployeeById = useCallback(async () => {
        callApi(`/${employee.identityNo}`, API_OPTIONS.GET)
            .then(employee => {
                hrDispatcher({type: ActionTypes.ON_EMPLOYEE_RECEIVED, value: employee})
            })
            .catch(handleError);
    }, [hrDispatcher, handleError, employee.identityNo]);

    const hireEmployee = useCallback(async () => {
        callApi("/", {...API_OPTIONS.POST, body: JSON.stringify(employee)})
            .then(response => {
                hrDispatcher({type: ActionTypes.ON_EMPLOYEE_HIRED, value: response.status})
            })
            .catch(handleError);
    }, [hrDispatcher, handleError, employee]);

    const fireEmployee = useCallback(async () => {
        callApi(`/${employee.identityNo}`, API_OPTIONS.DELETE)
            .then(employee => {
                hrDispatcher({type: ActionTypes.ON_EMPLOYEE_FIRED, value: employee})
            })
            .catch(handleError);
    }, [hrDispatcher, handleError, employee.identityNo]);

    const updateEmployee = useCallback(async () => {
        callApi("/", {...API_OPTIONS.PUT, body: JSON.stringify(employee)})
            .then(response => {
                hrDispatcher({type: ActionTypes.ON_EMPLOYEE_UPDATED, value: response.status})
            })
            .catch(handleError);
    }, [hrDispatcher, handleError, employee]);

    return (
        <>
            <p></p>
            <Container>
                <Card title={"Employee"}>
                    <InputText value={employee.identityNo}
                               label={"Identity No"}
                               form_id={"identityNo"}
                               placeholder={"Enter Identity No"}
                               onChange={handleChange}/>
                    <div className={"mb-3"}>
                        <Button click={findEmployeeById}
                                label={"Find Employee"}
                                color={"btn-primary"}/>
                        <Button click={fireEmployee}
                                label={"Fire Employee"}
                                color={"btn-danger"}/>
                    </div>
                    <InputText value={employee.fullname}
                               label={"FullName"}
                               form_id={"fullname"}
                               placeholder={"Enter Full name"}
                               onChange={handleChange}/>
                    <InputText value={employee.salary}
                               label={"Salary"}
                               form_id={"salary"}
                               placeholder={"Enter Salary"}
                               onChange={handleChange}/>
                    <InputText value={employee.iban}
                               label={"IBAN"}
                               form_id={"iban"}
                               placeholder={"Enter IBAN"}
                               onChange={handleChange}/>
                    <InputText value={employee.birthYear}
                               label={"Birth Year"}
                               form_id={"birthYear"}
                               placeholder={"Enter Birth Year"}
                               onChange={handleChange}/>
                    <SelectBox value={employee.department}
                               id={"department"}
                               label={"Department"}
                               options={departments}
                               change={handleChange}/>
                    <Photo id={"photo"}
                           label={"Photo"}
                           handleChange={handlePhotoChange}
                           value={employee.photo}/>
                    <CheckBox value={employee.fulltime}
                              label={"Full Time"}
                              handleChange={handleFullTimeChange}
                              id={"fulltime"}
                    />
                    <div className={"mb-3"}>
                        <Button click={hireEmployee}
                                label={"Hire Employee"}
                                color={"btn-success"}/>
                        <Button click={updateEmployee}
                                label={"Update Employee"}
                                color={"btn-warning"}/>
                    </div>
                </Card>
                <p></p>
                <EmployeeCard />
            </Container>
        </>
    );
}

export default HrApp;
