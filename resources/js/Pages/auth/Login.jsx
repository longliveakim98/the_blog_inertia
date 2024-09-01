import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import InputField from "../../Components/InputField";

export default function Login() {
    const { data, setData, errors, post } = useForm({
        name: "",
        email: "",
        password: "",
        picture: null,
    });

    const route = useRoute();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login.store"));
    };
    return (
        <div className="flex justify-center py-20 ">
            <Head title="Login" />
            <div className="lg:w-[50%] w-full bg-white/30 border shadow-lg justify-center flex flex-col px-10 py-20 rounded">
                <h1 className="py-5 mb-10 text-4xl font-bold text-center border-y-4 ">
                    Log in
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-10"
                >
                    <InputField
                        label="Email"
                        value={data.email}
                        type="email"
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        className="mt-auto"
                    />
                    <InputField
                        label="Password"
                        name={"password"}
                        value={data.password}
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 mt-auto font-semibold text-white bg-blue-500 rounded-lg lg:mt-auto"
                    >
                        Login Account
                    </button>
                </form>
                <div className="mt-10 text-sm">
                    Dont have an account?{" "}
                    <Link
                        className="text-blue-700 underline hover:text-blue-5 00"
                        href={"/register"}
                    >
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}
