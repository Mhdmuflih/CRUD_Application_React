import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLoginProtector = () => {

    const isLoggedIn = useSelector((state: RootState) => state.adminAuth.isLoggedIn);

    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const chackAuthStatus = () => {
            setLoading(false)
        };
        chackAuthStatus();
    }, []);

    useEffect(() => {
        if(loading){
            if(isLoggedIn) {
                navigate('/admin/dashboard');
            }
        }
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {!isLoggedIn ? <Outlet /> : null}
        </div>
    );
}

export default AdminLoginProtector;