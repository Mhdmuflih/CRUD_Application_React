import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        image: null as File | null,
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
        if (!formData.email) {
            errors.email = "Email is required";
            valid = false;
        } else {
            const emailRegex = /^[^!#$%&'*+/=?^_`{|}~]+@gmail\.com$/i;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Please enter a valid email ID.";
                valid = false;
            }
        }

        // Mobile Validation
        if (!formData.mobile) {
            errors.mobile = "Mobile number is required";
            valid = false;
        } else {
            const mobileRegex = /^(?!([0-9])\1{9})[1-9]\d{9}$/;
            if (!mobileRegex.test(formData.mobile)) {
                errors.mobile = "Please enter a valid mobile number.";
                valid = false;
            }
        }

        // Password Validation
        if (!formData.password) {
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
                .filter(rule => !rule.regex.test(formData.password))
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
                const response = await axios.post('http://localhost:8080/admin/add-user', formData);
                if (response.data.success) {
                    console.log('set set set');

                    Swal.fire({
                        title: 'Success!',
                        text: 'Add User details successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/admin/dashboard');
                }
            } catch (error: any) {
                console.log(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to Add user details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    const navigateToBack = () => {
        navigate('/admin/dashboard');
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputTake}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter user name"
                        required
                    />
                    {formError.name && <p className="error text-red-500">{formError.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputTake}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mobile number"
                        required
                    />
                    {formError.mobile && <p className="error text-red-500">{formError.mobile}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputTake}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter user email"
                        required
                    />
                    {formError.email && <p className="error text-red-500">{formError.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputTake}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter user password"
                        required
                    />
                    {formError.password && <p className="error text-red-500">{formError.password}</p>}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={navigateToBack}
                        className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddUser;