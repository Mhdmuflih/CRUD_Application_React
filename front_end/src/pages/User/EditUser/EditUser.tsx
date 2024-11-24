import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUserData } from "../../../Store/Slice/userSlice";

const EditUser = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        image: ""
    });

    const [formError, setFormError] = useState({ name: "", mobile: "", email: "", image: "" });

    const [profileImage, setProfileImage] = useState<File | null>(null);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserData = useSelector((state: any) => state.userAuth.user)


    useEffect(() => {
        setUserData({
            name: currentUserData.name || "",
            email: currentUserData.email || "",
            mobile: currentUserData.mobile || "",
            image: currentUserData.image || "",

        });
    }, [currentUserData]);

    const validate = () => {
        let errors: any = {};
        let valid: boolean = true;

        if (!userData.name.trim()) {
            errors.name = "Username is required";
            valid = false;
        } else {
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(userData.name.trim())) {
                errors.name = "Please enter a valid name.";
                valid = false;
            }
        }

        if (!userData.email.trim()) {
            errors.email = "Email is required";
            valid = false;
        } else {
            const emailRegex = /^[^!#$%&'*+/=?^_`{|}~]+@gmail\.com$/i;
            if (!emailRegex.test(userData.email.trim())) {
                errors.email = "Please enter a valid email ID.";
                valid = false;
            }
        }

        if (!userData.mobile.trim()) {
            errors.mobile = "Mobile number is required";
            valid = false;
        } else {
            const mobileRegex = /^(?!([0-9])\1{9})[1-9]\d{9}$/;
            if (!mobileRegex.test(userData.mobile.trim())) {
                errors.mobile = "Please enter a valid mobile number.";
                valid = false;
            }
        }

        setFormError(errors);
        return valid;
    }



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            if (files.length > 1) {
                console.log("You can only upload one image at a time.");
                return;
            }

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setProfileImage(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();


        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('mobile', userData.mobile);

        if (profileImage) {
            formData.append('image', profileImage);
            console.log('Image appended:', profileImage);
        } else {
            console.log('No image selected');
        }

        formData.forEach((value, key) => {
            console.log(key, value);
        });


        if (validate()) {
            try {
                const response = await axios.put('http://localhost:8080/home/edit-user', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    
                    dispatch(editUserData({
                        user: response.data.data,
                    }))

                    Swal.fire({
                        title: 'Success!',
                        text: 'Edit User details successfully Updated.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/home');
                }
            } catch (error: any) {
                console.log(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to Edit user details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

    }

    const handleToNavigateCancel = () => {
        navigate('/home');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Edit User Profile</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Enter the name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {formError.name && <p className="text-red-500">{formError.name}</p>}
                </div>
                <div className="mb-4">
                    <input type="text" name="email" value={userData.email} onChange={handleInputChange} placeholder="Enter the email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {formError.email && <p className="text-red-500">{formError.email}</p>}
                </div>
                <div className="mb-4">
                    <input type="number" name="mobile" value={userData.mobile} onChange={handleInputChange} placeholder="Enter the mobile number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {formError.mobile && <p className="text-red-500">{formError.mobile}</p>}
                </div>
                <div className="mb-4">
                    <input type="file" name="image" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="flex gap-4 mt-6">
                    <button onClick={handleToNavigateCancel} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Confirm</button>
                </div>
            </form>
        </div>

    )
}

export default EditUser;