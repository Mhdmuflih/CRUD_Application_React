import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Store/Slice/adminSlice";
import Modal from "../Modal/Modal";
import { UserFormDataType } from "../../../Interface/InputTypes";
import EditModal from "../Modal/EditModal";
import Swal from 'sweetalert2';
import profile_img from '/profile_img.jpg';
import { editUserData } from "../../../Store/Slice/userSlice";



const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState<UserFormDataType[]>([]);
    const [userToDelete, setUserToDelete] = useState<UserFormDataType | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [editModal, setEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<UserFormDataType | null | undefined>(null);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            const takeUserData = async () => {
                try {
                    const respnse = await axios.get('http://localhost:8080/admin/user-details', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (respnse.data.success) {
                        setUserDetails(respnse.data.userData);
                    }
                } catch (error: any) {
                    console.log(error.message);
                }
            }
            takeUserData();
        } else {
            console.log('is it not working');
            navigate('/admin/login')
        }
    }, [navigate]);


    const handleToDeleteUser = (user: any) => {
        setUserToDelete(user);
        setShowModal(true);
    }

    const handleConformDelete = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (userToDelete) {
                console.log('Deleting user:', userToDelete);

                const response = await axios.delete(`http://localhost:8080/admin/delete-user/${userToDelete._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.data.success) {
                    setUserDetails(prevUsers => prevUsers.filter((user: any) => user._id !== userToDelete._id));
                    Swal.fire({
                        title: 'Success!',
                        text: 'User details Deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setShowModal(false);
                } else {
                    console.error('Failed to delete user:', response.data.message);
                }
            }
        } catch (error: any) {
            console.error('Error deleting user:', error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to Delete user details.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleEditUser = (user: any) => {
        setUserToEdit(user);
        setEditModal(true);
    }

    const handleConformEdit = async (formData: any) => {
        try {

            const token = localStorage.getItem("adminToken");
            const response = await axios.put(`http://localhost:8080/admin/edit-user/${userToEdit?._id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

            if (response.data.success) {
                setUserDetails(prevUsers =>
                    userToEdit ? prevUsers.map((user: any) => user._id === userToEdit._id ? { ...user, ...formData } : user) : prevUsers);

                dispatch(editUserData({
                    user: response.data.user
                }));

                Swal.fire({
                    title: 'Success!',
                    text: 'User details updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setEditModal(false);
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update user details.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleToBlockUser = async (user: any) => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.post('http://localhost:8080/admin/action', { _id: user._id, is_block: !user.is_block }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {

                setUserDetails((prevUsers) =>
                    prevUsers.map((u) =>
                        u._id === user._id ? { ...u, is_block: !u.is_block } : u
                    )
                );

                Swal.fire({
                    title: 'Success!',
                    text: 'User is Blocked successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update user action.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const filteredUsers = userDetails.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery)
    );

    const navigateToAddUser = () => {
        navigate('/admin/add-user');
    }


    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        dispatch(logout());
        navigate('/admin/login')
    }


    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-1/6 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li className="mb-2 cursor-pointer hover:text-blue-400">Dashboard</li>
                    <li
                        onClick={navigateToAddUser}
                        className="mb-2 cursor-pointer hover:text-blue-400"
                    >
                        Add User
                    </li>
                    <li
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-blue-400"
                    >
                        Logout
                    </li>
                </ul>
            </aside>

            <main className="flex-1 p-6 bg-white">
                <h1 className="text-3xl font-bold mb-4">User Management</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search for users..."
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="ml-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                        Search
                    </button>
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        {filteredUsers && filteredUsers.length > 0
                            ? `Total Users: ${filteredUsers.length}`
                            : 'No Users Found'}
                    </h2>

                    <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-center">Profile</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Mobile</th>
                                <th className="py-2 px-4 text-center">Actions</th>
                                <th className="py-2 px-4 text-center">Edit</th>
                                <th className="py-2 px-4 text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers && filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b">
                                        <td className="py-2 px-2 text-center">
                                            <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border-2 border-gray flex items-center justify-center"> {/* Smaller image size */}
                                                <img
                                                    src={typeof user?.image === 'string'
                                                        ? user?.image
                                                        : user?.image instanceof File
                                                            ? URL.createObjectURL(user?.image)
                                                            : profile_img}
                                                    alt="User Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-1 px-2 text-sm">{user.name}</td>
                                        <td className="py-1 px-2 text-sm">{user.email}</td>
                                        <td className="py-1 px-2 text-sm">{user.mobile}</td>
                                        <td className="py-1 px-2 text-center">
                                            {user.is_block ? (
                                                <button
                                                    className="px-2 py-1 bg-green-600 text-white rounded text-xs transition duration-200"
                                                    onClick={() => handleToBlockUser(user)}
                                                >
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-2 py-1 bg-black text-white rounded text-xs transition duration-200"
                                                    onClick={() => handleToBlockUser(user)}
                                                >
                                                    Block
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-1 px-2 text-center">
                                            <button
                                                className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 transition duration-200"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="py-1 px-2 text-center">
                                            <button
                                                className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition duration-200"
                                                onClick={() => handleToDeleteUser(user)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-2 px-2 text-center">
                                        <span className="text-gray-500">No users found!</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </main>

            <Modal
                show={showModal}
                title={"Delete User"}
                onClose={() => setShowModal(false)}
                onConform={handleConformDelete}
                body={`Are you sure you want to delete ${userToDelete?.name}?`}
            />

            <EditModal
                show={editModal}
                title={"Edit User"}
                onClose={() => setEditModal(false)}
                onConform={handleConformEdit}
                body={`Are you sure you want to edit ${userToEdit?.name}?`}
                data={userToEdit}
            />
        </div>



    )
}

export default Dashboard;