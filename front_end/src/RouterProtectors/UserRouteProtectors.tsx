import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../Store/store';

const UserRouteProtectors: React.FC = () => {

    const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLoggedIn);
    const navigate = useNavigate();

    console.log("isLoggedIn protected", isLoggedIn);

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/');
        }
    }, []);

  return (
    isLoggedIn ? <Outlet /> : null
  )
}

export default UserRouteProtectors;