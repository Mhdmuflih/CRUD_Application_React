import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../../Store/Slice/userSlice';
// import { setUsers } from '../../../Store/Slice/user';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formError , setFormError] = useState({email: "" , password: ""});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputTake = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const validate = () => {
        let errors: any = {};
        let valid: boolean = true;

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
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(validate()) {
            try {
                const response = await axios.post('http://localhost:8080/', formData);
                if (response.data.success) {
    
                    if(response.data.user.is_block){
                        alert('Your account is blocked. Please contact support.');
                        return;
                    }
    
                    dispatch(loginSuccess({
                        token: response.data.token,
                        isLoggedIn: true,
                        user: response.data.user
                    }));
    
                    navigate('/home');
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }

    const navigateToSign = () => {
        navigate('/register');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                { <p className="mb-4 text-red-500"></p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputTake}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            id="email"
                            required
                        />
                    {formError.email && <p className="error text-red-500">{formError.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputTake}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            id="password"
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
                </form>
                <div className="mt-4 text-center">
                    <span > Do you have an account? <span onClick={navigateToSign} className="text-blue-500 cursor-pointer hover:underline">SignUp</span>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Login;