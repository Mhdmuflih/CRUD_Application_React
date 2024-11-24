import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../../Store/Slice/adminSlice';

const AdminLogin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [formError, setFormError] = useState({ email: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    setFormError(errors);
    return valid;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {

      try {
        const response = await axios.post('http://localhost:8080/admin/login', formData);
        console.log(response.data)
        if (response.data.success) {
          dispatch(loginSuccess({ token: response.data.token, admin: response.data.admin }))
          console.log(response.data, 'all is well');
          navigate('/admin/dashboard');
        } else {
          console.log('is it not working again');

        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputTake}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formError.email && <p className="error text-red-500">{formError.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputTake}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
          <div className="mt-4 text-center text-gray-400">
            <p>
              Already have an Account? <span className="text-blue-500 cursor-pointer">Sign In Now</span>
            </p>
          </div>
        </form>
      </div>
    </div>


  )
}

export default AdminLogin;