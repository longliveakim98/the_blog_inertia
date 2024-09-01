import React from "react";

export default function InputField({
    label = "",
    value,
    onChange,
    className = "",
    type = "text",
    error = null,
    name = null,
    disabled = false,
}) {
    return (
        <div className="w-full space-y-2">
            <label className="text-lg">{label}</label>
            <input
                name={name}
                type={type}
                value={type !== "file" ? value : undefined}
                onChange={onChange}
                className={className}
                disabled={disabled}
            />
            {error && (
                <div className="text-sm italic text-red-600">{error}</div>
            )}
        </div>
    );
}
