import { useEffect, useState } from 'react'
import { RootState } from '../Store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserLoginProtectors = () => {

    const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLoggedIn);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log('isLoggedIn route Protector', isLoggedIn);
            if (isLoggedIn) {
                navigate('/home');
            }
            setLoading(false);
        }

        checkAuthStatus();

    }, [isLoggedIn, navigate]);

    if (loading) {
        return <div> Loading... </div>
    }

    return (
        !isLoggedIn ? <Outlet /> : null
    )
}

export default UserLoginProtectors;