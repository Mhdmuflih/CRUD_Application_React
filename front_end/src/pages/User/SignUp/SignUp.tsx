import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp: React.FC = () => {

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        // image: null as File | null,
        password: ""
    })

    const [formError, setFormError] = useState({ name: "", email: "", password: "", mobile: "" });

    const navigate = useNavigate();

    const handleInputTake = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }


    const validate = () => {
        let errors: any = {};
        let valid = true;

        // Name Validation
        if (!formData.name.trim()) {
            errors.name = "Username is required";
            valid = false;
        } else {
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(formData.name.trim())) {
                errors.name = "Please enter a valid name.";
                valid = false;
            }
        }

        // Email Validation
        if (!formData.email.trim()) {
            errors.email = "Email is required";
            valid = false;
        } else {
            const emailRegex = /^[^!#$%&'*+/=?^_`{|}~]+@gmail\.com$/i;
            if (!emailRegex.test(formData.email.trim())) {
                errors.email = "Please enter a valid email ID.";
                valid = false;
            }
        }

        // Mobile Validation
        if (!formData.mobile.trim()) {
            errors.mobile = "Mobile number is required";
            valid = false;
        } else {
            const mobileRegex = /^(?!([0-9])\1{9})[1-9]\d{9}$/;
            if (!mobileRegex.test(formData.mobile.trim())) {
                errors.mobile = "Please enter a valid mobile number.";
                valid = false;
            }
        }

        // Password Validation
        if (!formData.password.trim()) {
            errors.password = "Password is required";
            valid = false;
        } else {
            const passwordRegex = [
                { regex: /.{8,}/, message: "At least 8 characters" },
                { regex: /\d/, message: "At least 1 digit" },
                { regex: /[a-z]/, message: "At least 1 lowercase letter" },
                { regex: /[!@#$%^&*]/, message: "At least 1 special character" },
                { regex: /[A-Z]/, message: "At least 1 uppercase letter" }
            ];

            const passwordErrors = passwordRegex
                .filter(rule => !rule.regex.test(formData.password.trim()))
                .map(rule => rule.message);

            if (passwordErrors.length > 0) {
                errors.password = passwordErrors.join(", ");
                valid = false;
            }
        }

        setFormError(errors);
        return valid;
    };



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:8080/register', formData);
                if (response.data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Registration successfully completed.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/');
                }
            } catch (error) {
                console.error("Error submitting the form", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to register user details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const navigateToLogin = () => {
        navigate('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputTake}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    {formError.name && <p className="error text-red-500">{formError.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Mobile:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputTake}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    {formError.mobile && <p className="error text-red-500">{formError.mobile}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputTake}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    {formError.email && <p className="error text-red-500">{formError.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputTake}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    {formError.password && <p className="error text-red-500">{formError.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account?
                        <span onClick={navigateToLogin} className="text-blue-500 cursor-pointer hover:underline"> SignIn Now </span>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default SignUp;