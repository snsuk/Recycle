import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main/Main";
import Cart from "./pages/Cart/Cart";
import Header from './components/Header/Header';
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getRates } from './redux/actions/productActions';
import axios from "axios";
import { signIn, logout } from './redux/actions/authActions';
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import AnonymousRoute from "./components/AnonymousRoute/AnonymousRoute";
import "tailwindcss/tailwind.css"
import AdminPage from "./pages/AdminPage/AdminPage"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

const App = () => {
    const dispatch = useDispatch();
    const { isLoading  } = useSelector(s => s.products);
    const { isAuth, token } = useSelector(s => s.auth);

    useEffect(() => {
        dispatch(getRates());
        dispatch(getProducts());
    }, [dispatch, token, isAuth]);

    useEffect(() => {
        if (token) {
            axios('/api/v1/auth/authenticate')
                .then(({ data }) => dispatch(signIn(data)))
                .catch(() => dispatch(logout()))
        }
    }, [isAuth]);


    if (isLoading) return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
    );


    return (
        <div className="flex flex-col h-min-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin-page" element={<AdminPage />} />
                    <Route path="/signup" element={<AnonymousRoute><SignUp /></AnonymousRoute>} />
                    <Route path="/signin" element={<AnonymousRoute><SignIn /></AnonymousRoute>} />
                    {/*<Route path="/admin-page" element={<PrivateRoute roles={['admin']}><AdminPage /></PrivateRoute>} />*/}
                </Routes>
            </main>
        </div>
    );
}

export default App;
