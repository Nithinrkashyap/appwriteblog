import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        console.log("i am in singup page", data);
        setError("")
        try {
            //& this code is making an API call to the Appwrite backend to create a new user account







            //*ID.unique():This generates a unique identifier for the new user account. This ID is used as a primary key for the user in the Appwrite database.

            // this.account.create(...):
            // This is a method provided by the Appwrite SDK to create a new user account. It makes an HTTP request to the Appwrite server.
            // Behind the Scenes
            // Here's what happens in the Appwrite backend:

            // API Request:

            // The Appwrite SDK sends an HTTP POST request to the Appwrite server's user creation endpoint (e.g., https://your-appwrite-server/v1/account/create).
            // Request Payload:

            // The request includes the following data:
            // userId: The unique ID generated by ID.unique().
            // email: The user's email address.
            // password: The user's password.
            // name: The user's name.
            // Server Processing:

            // The Appwrite server receives the request and performs several actions:
            // Validation: It validates the provided email and password (e.g., checking email format, password strength).
            // Uniqueness Check: It checks if the email already exists in the database to prevent duplicate accounts.
            // Hashing Password: The password is securely hashed before being stored to protect against unauthorized access.
            // User Creation: It creates a new user record in the database with the provided information and the generated unique ID.
            // Triggering Events: If there are any triggers or hooks set up (e.g., sending a welcome email), they might be executed at this stage.
            // Response:

            // The server sends back a response to the SDK, typically including the newly created user account information (excluding the password for security reasons).
            // Handling the Response:

            // The await this.account.create(...) line in your code waits for the server's response. Once the response is received, the userAccount variable is assigned the resulting user object from the server.



            const userData = await authService.createAccount(data)
            console.log("in createAccount(data)", userData);
            if (userData) {
                const userData = await authService.getCurrentUser()
                console.log("in getCurrentUser()", userData);
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* //* handleSubmit in that create has data as parameters due to register */}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            //* collects all data
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup