import React from "react";

export default function Card({title, children}) {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}
