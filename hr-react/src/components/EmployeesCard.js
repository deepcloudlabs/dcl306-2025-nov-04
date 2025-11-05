import Card from "./common/card";
import {useEmployees, useHrDispatcher} from "../providers/hr-provider";
import Button from "./common/button";
import {useCallback, useMemo} from "react";
import Photo from "./common/photo";
import callApi, {API_OPTIONS} from "../utils/api-utils";
import {ActionTypes} from "../reducers/hr-reducer";
import Badge from "./common/badge";

export default function EmployeeCard() {
    return (
        <Card title={"Employees"}>
            implement this
        </Card>
    );
}
