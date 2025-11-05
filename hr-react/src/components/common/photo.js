import React from "react";

export default function Photo({id, label, value, handleChange, readOnly=false}) {
    function handleFileChange(e) {
        //TODO: implement handle logic
    }

    if (readOnly) {
        return (
            <>TODO: implement this</>
        );
    }
    return (
        <div className={"mb-3"}>
            //TODO: implement this
        </div>
    );
}
