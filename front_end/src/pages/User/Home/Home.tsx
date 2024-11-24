import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../../Store/Slice/userSlice';
import profile_img from '/profile_img.jpg';




const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, user } = useSelector((state: any) => state.userAuth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    
    const navigateToEditUser = () => {
        navigate('/edit-user');
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-gray">
                    <img
                        src={user?.image ? user?.image : profile_img}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h1 className="text-3xl font-bold text-center">User Profile</h1>
            </div>
            {user ? (
                <div className="mb-4">
                    <p className="text-lg font-semibold">
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p className="text-lg font-semibold">
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            ) : (
                <p className="text-red-500 text-center">No user data available.</p>
            )}
            <div className="flex justify-between mt-4">
                <button
                    onClick={navigateToEditUser}
                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Edit
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
    
    
    );
}

export default Home;


