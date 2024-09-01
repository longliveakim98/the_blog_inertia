import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import InputField from "../../Components/InputField";

export default function Register() {
    const { data, setData, errors, post } = useForm({
        name: "",
        email: "",
        password: "",
        picture: null,
    });

    const route = useRoute();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register.store"));
    };
    return (
        <div className="flex justify-center h-[95vh] ">
            <div className="lg:w-[50%] w-full h-[95%] bg-white/30 border shadow-lg p-10 rounded">
                <Head title="Register" />
                <h1 className="py-5 mb-10 text-4xl font-bold text-center border-y-4 ">
                    Register
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-1 justify-center h-[70%] space-y-3 "
                >
                    <InputField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                    />
                    <InputField
                        label="Email"
                        value={data.email}
                        type="email"
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />
                    <InputField
                        label="Password"
                        name={"password"}
                        value={data.password}
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />
                    <InputField
                        label="Confirmed Password"
                        name={"password_confirmation"}
                        value={data.password_confirmation}
                        type="password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                    />

                    <InputField
                        label="Profile Picture"
                        value={data.picture}
                        type="file"
                        onChange={(e) => setData("picture", e.target.files[0])}
                        error={errors.picture}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 mt-5 font-semibold text-white bg-blue-500 rounded-lg lg:mt-auto"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
