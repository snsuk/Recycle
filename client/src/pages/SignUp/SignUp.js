import React from "react"
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios"
const SignUp = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const signUpSubmit = (data) => {
        axios.post('api/v1/auth/signup', data)
            .then(() => {
                alert(data.message)
                navigate('/signin')
            })
            .catch(e => alert(e.response?.data?.message || "Ошибка"))
    }

    return (
        <div className="flex justify-center items-center w-full">
            <form onSubmit={handleSubmit(signUpSubmit)} className="mt-10  ">
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <div>
                            <label htmlFor="name"
                                   className="block mb-1 text-gray-600 font-semibold">Username</label>
                            <input {...register('name')} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                   id="name"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                            <input {...register('email')} type="email" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                   id="email"/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-1 text-gray-600 font-semibold">Password</label>
                            <input {...register('password')} type="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                   id="password"/>
                        </div>
                    </div>
                    <button
                        className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Register
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignUp