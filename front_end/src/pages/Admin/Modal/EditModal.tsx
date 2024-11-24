import React, { useState, useEffect } from 'react';
import { EditModelProps } from '../../../Interface/InputTypes';

const EditModal: React.FC<EditModelProps> = ({ show, onClose, onConform, title, body, data }) => {
    const [formData, setFormData] = useState<{ name: string; email: string; mobile: string }>({
        name: '',
        email: '',
        mobile: '',
    });

    const [formError, setFormError] = useState({ name: "", mobile: "", email: "" });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                email: data.email,
                mobile: data.mobile,
            });
        }
    }, [data]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    if (!show) {
        return null;
    }

    const validateForm = (): boolean => {
        let isValid = true;
        const errors = { name: "", mobile: "", email: "" };

        // Validate Name
        if (formData.name.trim() === '') {
            errors.name = "Name cannot be empty.";
            isValid = false;
        } else if (formData.name.length < 3) {
            errors.name = "Name must be at least 3 characters long.";
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            errors.name = "Name must contain only letters and spaces.";
            isValid = false;
        }

        // Validate Email
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid.";
            isValid = false;
        }

        // Validate Mobile
        if (!/^\d{10}$/.test(formData.mobile)) {
            errors.mobile = "Mobile must be exactly 10 digits.";
            isValid = false;
        } else if (!/^7|8|9\d{9}$/.test(formData.mobile)) {
            errors.mobile = "Mobile number must start with 7, 8, or 9.";
            isValid = false;
        }

        setFormError(errors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onConform?.(formData);
        }
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
                <h3 className="text-lg text-gray-600 text-center mb-4">{body}</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                    {formError.name && <p className="text-red-500">{formError.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                    {formError.email && <p className="text-red-500">{formError.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile:</label>
                    <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your mobile number"
                    />
                    {formError.mobile && <p className="text-red-500">{formError.mobile}</p>}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    );
};

export default EditModal;
