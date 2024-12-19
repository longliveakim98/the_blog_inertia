import { Link } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";
import { formatDate } from "./formatDate";
export default function AuthorDate({ author, date, userId }) {
    const route = useRoute();
    return (
        <>
            <p className="mt-1 text-sm font-semibold text-purple-700 ">
                {formatDate(date)} {"    "}•{" "}
                <Link
                    href={route("profile", userId)}
                    className="rounded-full hover:text-purple-500 hover:underline"
                >
                    {author}
                </Link>
            </p>
        </>
    );
}
