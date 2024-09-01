import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Layout({ children }) {
    const user = children.props.user;
    const route = useRoute();

    const [search, setSearch] = useState("");

    const handleSubmit = () => {
        e.preventDefault();
        router.get("/search", { search });
    };

    return (
        <div className="w-[90%] mx-auto pb-10">
            <div className="w-full">
                <nav className="flex justify-between py-5 text-[1.25rem] lg:mb-12 mx-auto lg:flex-row flex-col items-center gap-y-2 w-full ">
                    <div>
                        <Link
                            href={user ? route("profile", user) : "/"}
                            className="py-2 text-2xl font-bold border-t border-b"
                        >
                            {user ? user.name : "THE BLOG"}
                        </Link>
                    </div>

                    <div className="flex flex-col items-center lg:space-x-6 lg:flex-row gap-y-2 ">
                        <Link href="/">Home</Link>
                        <a href="/">About</a>

                        {!user && <Link href={"/login"}>Log In</Link>}
                        {user && (
                            <div className="space-x-6">
                                <Link href={route("posts.create")}>
                                    Create Post
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="POST"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} action="/search">
                            <div className="flex space-x-2 ">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Web Dev..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-none "
                                />
                                <button>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>

            <div>{children}</div>
        </div>
    );
}
