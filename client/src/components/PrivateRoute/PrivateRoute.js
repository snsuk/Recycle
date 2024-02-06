import React from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PrivateRoute = ({children, roles = ['admin']}) => {
    const navigate = useNavigate()
    const {isAuth, user} = useSelector(s => s.auth)
    useEffect(() => {
        if (!isAuth || !roles.includes(user?.role)) {
            if (window.location.pathname !== '/admin-page') {
                navigate('/admin-page');
            }
        }
    }, [isAuth, user, roles, navigate]);

    return isAuth && roles.includes(user?.role) ? children : null;
};

export default PrivateRoute