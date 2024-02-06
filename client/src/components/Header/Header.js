import React, { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Burger from "../Burger/Burger";
import { useSelector } from "react-redux";
import "tailwindcss/tailwind.css";

const Header = () => {
    const myRef = useRef(null);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const { user } = useSelector((s) => s.auth);

    return (
        <>
            <header className="sticky top-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-md">
                <div className="container px-2 py-3 flex justify-between items-center">
                    <div className="hidden sm:flex">
                        <NavLink
                            to="/"
                            className="hover:bg-gray-200 hover:text-black duration-200 font-semibold px-4 py-2 mr-3"
                        >
                            Главная
                        </NavLink>
                        <NavLink
                            to="/cart"
                            className="hover:bg-gray-200 hover:text-black duration-200 font-semibold px-4 py-2 mr-3"
                        >
                            Корзина
                        </NavLink>
                        <NavLink
                            to="/add-product"
                            className="hover:bg-gray-200 hover:text-black duration-200 font-semibold px-2 sm:px-4 py-2"
                        >
                            Создать товар
                        </NavLink>
                        <NavLink
                            to="/kyrgyzstan-map"
                            className="hover:bg-gray-200 hover:text-black duration-200 font-semibold px-2 sm:px-8 py-2"
                        >
                            Карта
                        </NavLink>
                        {user && user.role === "admin" && (
                            <NavLink
                                to="/admin-page"
                                className="hover:bg-gray-200 hover:text-black duration-200 font-semibold px-2 sm:px-8 py-2"
                            >
                                Панель админа
                            </NavLink>
                        )}
                    </div>

                    <div className="flex items-center">
                        {user && (
                            <div className="mr-3 font-bold hidden sm:block">
                                {user.name}
                            </div>
                        )}
                        <button
                            onClick={() => setBurgerMenu(!burgerMenu)}
                            className="hover:bg-gray-200 hover:text-black duration-200 text-3xl px-2 py-1 z-50"
                        >
                            <GiHamburgerMenu />
                        </button>
                    </div>
                </div>
            </header>
            <CSSTransition
                in={burgerMenu}
                classNames="burger"
                timeout={300}
                unmountOnExit
                nodeRef={myRef}
            >
                <Burger setBurgerMenu={setBurgerMenu} />
            </CSSTransition>
        </>
    );
};

export default Header;

