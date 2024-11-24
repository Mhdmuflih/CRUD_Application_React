import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminRouteProtector = () => {

    const isLoggedIn = useSelector((state: RootState) => state.adminAuth.isLoggedIn);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(false);
        };
        checkAuthStatus();
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn) {
                navigate('/admin/login');
            }
        }
    }, [loading, isLoggedIn, navigate]);


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isLoggedIn ? <Outlet /> : null}
        </div>
    );

}

export default AdminRouteProtector;