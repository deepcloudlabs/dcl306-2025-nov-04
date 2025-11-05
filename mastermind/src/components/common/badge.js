import React from "react";

export default function Badge({isVisible = true, label= "", value, color = "default", displayOnly=false}) {
    if (!isVisible) return null;
    if (displayOnly) {
        return (
            <h4><span className={`badge ${color}`}>{value}</span></h4>
        );
    }
    return (
        <h4>{label}: <span className={`badge ${color}`}>{value}</span></h4>
    );
}
