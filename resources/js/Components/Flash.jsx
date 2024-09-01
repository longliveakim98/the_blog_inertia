import React from "react";

export default function Flash({ children, bgColor = "" }) {
    return (
        <>
            <p
                className={`absolute p-2 text-sm rounded-md shadow-lg top-27 left-14 text-white ${bgColor}`}
            >
                {children}
            </p>
        </>
    );
}
