import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitError, setSubmitError] = useState(null);

    const signUpSubmit = (data) => {
        axios
            .post("api/v1/auth/signup", data)
            .then(() => {
                alert("Вы зарегистрированы!");
                navigate("/signin");
            })
            .catch((e) => {
                setSubmitError(e.response?.data?.message || "Ошибка");
            });
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(signUpSubmit)} className="mt-5 max-w-md w-full">
                <div className="bg-white px-6 py-8 rounded-md shadow-md">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <div>
                            <label htmlFor="name" className={`block mb-1 text-gray-600 font-semibold ${errors.name ? 'text-red-500' : ''}`}>
                                Username
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className={`block mb-1 text-gray-600 font-semibold ${errors.email ? 'text-red-500' : ''}`}>
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
                                id="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className={`block mb-1 text-gray-600 font-semibold ${errors.password ? 'text-red-500' : ''}`}>
                                Password
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full ${errors.password ? 'border-red-500' : ''}`}
                                id="password"
                            />
                        </div>
                        <div>
                            <label htmlFor="userType" className={`block mb-1 text-gray-600 font-semibold ${errors.userType ? 'text-red-500' : ''}`}>
                                User Type
                            </label>
                            <select
                                {...register("userType")}
                                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full ${errors.userType ? 'border-red-500' : ''}`}
                            >
                                <option placeholder="choose"></option>
                                <option value="individual">Individual</option>
                                <option value="legal">Legal</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="role" className={`block mb-1 text-gray-600 font-semibold ${errors.role ? 'text-red-500' : ''}`}>
                                Role
                            </label>
                            <select
                                {...register("role")}
                                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full ${errors.role ? 'border-red-500' : ''}`}
                            >
                                <option value="" disabled defaultValue>Select your role</option>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                    </div>
                    {submitError && <div className="text-red-500 mt-2">{submitError}</div>}
                    <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
