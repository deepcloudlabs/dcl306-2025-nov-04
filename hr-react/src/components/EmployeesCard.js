import Card from "./common/card";
import {useEmployees, useHrDispatcher} from "../providers/hr-provider";
import Button from "./common/button";
import {useCallback, useMemo} from "react";
import Photo from "./common/photo";
import callApi, {API_OPTIONS} from "../utils/api-utils";
import {ActionTypes} from "../reducers/hr-reducer";
import Badge from "./common/badge";

export default function EmployeeCard() {
    const employees = useEmployees();
    const hrDispatcher = useHrDispatcher();

    const handleError = useCallback(err => {
        hrDispatcher({type: ActionTypes.ON_ERROR, value: err});
    }, [hrDispatcher]);

    const retrieveEmployees = useCallback(async () => {
        callApi("/", API_OPTIONS.GET)
            .then(employees => {
                hrDispatcher({type: ActionTypes.ON_EMPLOYEES_RETRIEVED, value: employees})
            })
            .catch(handleError);
    }, [hrDispatcher, handleError]);

    return (
        <Card title={"Employees"}>
            <Button color={"btn-success"}
                    click={retrieveEmployees}
                    label={"Retrieve Employees"}></Button>
            <table className={"table table-bordered table-responsive table-hover table-striped"}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Photo</th>
                    <th>Identity No</th>
                    <th>Full Name</th>
                    <th>Salary</th>
                    <th>IBAN</th>
                    <th>Birth Year</th>
                    <th>Department</th>
                    <th>Full-time?</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {
                    employees.map((employee, index) => (
                            <tr key={employee.identityNo}>
                                <td>{index + 1}</td>
                                <td><Photo readOnly={true} value={employee.photo}/></td>
                                <td>{employee.identityNo}</td>
                                <td>{employee.fullname}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.iban}</td>
                                <td>{employee.birthYear}</td>
                                <td><Badge color={"bg-warning"} displayOnly={true} value={employee.department}/></td>
                                <td><Badge color={"bg-primary"} displayOnly={true} value={employee.fulltime ? 'FULL-TIME' : 'PART-TIME'}/></td>
                                <td><Button color={"btn-danger"} label={"Fire Employee"}/></td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </Card>
    );
}
