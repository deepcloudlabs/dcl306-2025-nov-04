import React from "react";

export default function Table({columns,items,fields,keyField}){
    return (
        <div className={"mb-3"}>
            <table className="table table-striped table-bordered table-hover table-responsive">
                <thead>
                <tr>
                    {
                        columns.map(column =>
                            (
                                <th key={column}>{column}</th>
                            )
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {
                    items.map( (item, i) =>
                        (
                            <tr key={item[keyField]}>
                                {
                                    fields.map( field =>
                                       (
                                         <td>{item[field]}</td>
                                       )
                                    )
                                }
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
}
