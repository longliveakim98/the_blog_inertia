import React from "react";

export default function Header({ children }) {
    return (
        <>
            <h3 className="text-[1.5rem] font-semibold ">{children}</h3>
        </>
    );
}
