import { Link } from "@inertiajs/react";
import React from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Tag({ tag, otherClass = "", color = "blue" }) {
    return (
        <Link href={`/tags/${tag}`}>
            <p
                className={`px-2 font-medium text-${color}-500 border bg-${color}-600/20 rounded-xl ${otherClass}`}
            >
                {tag}
            </p>
        </Link>
    );
}
