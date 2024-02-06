import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom"
import { changeRate, sortByPrice, changeSearchValue } from '../../redux/actions/productActions';
import "tailwindcss/tailwind.css"
import {logout} from '../../redux/actions/authActions'

const Burger = ({setBurgerMenu}) => {
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")
    const {isAuth} = useSelector(s => s.auth)

    useEffect(() => {
        dispatch(changeSearchValue(searchInput))
    }, [searchInput, dispatch]);

    const clickChangeRate = (rate) => {
        setBurgerMenu(false)
        dispatch(changeRate(rate))
    }

    const clickSortByPrice = () => {
        dispatch(sortByPrice())
        setBurgerMenu(false)
    }

    const logoutClick = () => {
        console.log('Before dispatching logout action');
        dispatch(logout());
        console.log('After dispatching logout action');
    }

    return (
        <div className="fixed z-50 inset-0">
            <div onClick={(e) => e.stopPropagation()}
                 className="fixed z-50 top-0 right-0 pb-12 w-80 bg-gray-900 rounded-b-2xl">
                <div onClick={() => setBurgerMenu(false)} className="fixed z-50 inset-0">
                    <div onClick={(e) => e.stopPropagation()}
                         className="fixed z-50 top-0 right-0 pb-12 w-80 bg-gray-900 rounded-b-2xl">
                        {
                            !searchInput && <>
                                {!isAuth
                                    ? <div className="mt-12 mb-6 flex justify-around">
                                        <Link className="bg-gray-300 px-3 py-1 rounded-md font-semibold"
                                              to="/signup">Регистрация</Link>
                                        <Link className="bg-gray-300 px-3 py-1 rounded-md font-semibold"
                                              to="/signin">Войти</Link>
                                    </div>
                                    : <div className="mt-12 mb-6 text-center">
                                        <button onClick={logoutClick}
                                                className="bg-gray-300 px-3 py-1 rounded-md font-semibold">Выйти
                                        </button>
                                    </div>
                                }

                                {
                                    !searchInput && <>
                                        <div className="flex justify-around mb-5">
                                            <button onClick={() => clickChangeRate(['USD', '$'])}
                                                    className="bg-gray-300 px-3 py-1 rounded-md font-semibold">USD
                                            </button>
                                            <button onClick={() => clickChangeRate(['KGZ', 'Сом'])}
                                                    className="bg-gray-300 px-3 py-1 rounded-md font-semibold">KGZ
                                            </button>
                                            <button onClick={() => clickChangeRate(['RUB', 'Руб'])}
                                                    className="bg-gray-300 px-3 py-1 rounded-md font-semibold">RUB
                                            </button>
                                        </div>
                                    </>
                                }
                                <div className="text-2xl text-white text-center">Sort:</div>
                                <div className="flex justify-center mb-3">
                                    <button onClick={clickSortByPrice}
                                            className="bg-gray-300 px-3 py-1 rounded-md font-semibold">Price
                                    </button>
                                </div>
                            </>
                        }
                        <div className="text-2xl text-white text-center">Search:</div>
                        <div className="text-center">
                            <input onChange={(e) => setSearchInput(e.target.value)}
                                   className="px-3 py-2 font-medium text-center"
                                   type="text"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Burger
