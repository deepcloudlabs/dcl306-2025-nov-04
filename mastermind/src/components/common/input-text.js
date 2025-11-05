import React from "react";

export default function InputText({name,label,type="text",
                                      placeholder,onChange,
                                      value,children}){
    return (
        <div className="mb-3">
            <label className={"form-label"}
                   htmlFor={name}>{label}:</label>
            <input type={type}
                   className={"form-control"}
                   id={name}
                   name={name}
                   placeholder={placeholder}
                   onChange={onChange}
                   value={value}/>
            {children}
        </div>
    );
}
