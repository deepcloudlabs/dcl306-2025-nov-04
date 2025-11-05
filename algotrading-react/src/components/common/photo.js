import React from "react";

export default function Photo({id, label, value, handleChange, readOnly=false}) {
    function handleFileChange(e) {
        const fileReader = new FileReader();
        const fileName = e.target.files[0];
        fileReader.onload = event => {
            handleChange(event.target.result);
            // console.log(event.target.result);
        };
        fileReader.readAsDataURL(fileName);
    }

    if (readOnly) {
        return (
            <img src={value}
                 id={id}
                 alt={"Employee's Profile Photo"}
                 style={{width: "64px"}}
                 className={"img-thumbnail"}/>
        );
    }
    return (
        <div className={"mb-3"}>
            <label className={"form-label"}
                   htmlFor={id}>{label}:</label>
            <img src={value}
                 id={id}
                 alt={"Employee's Profile Photo"}
                 style={{width: "64px"}}
                 className={"img-thumbnail"}/>
            <label>
                <input type={"file"}
                       onChange={handleFileChange}
                       style={{display: "none"}}
                />
                <span className={"btn btn-primary"}>File</span>
            </label>
        </div>
    );
}