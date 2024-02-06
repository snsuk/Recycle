import React from "react";
import {addToCart, removeFromCart} from '../../redux/actions/productActions';
import {useDispatch} from "react-redux";
import "tailwindcss/tailwind.css"

const ProductButtons = ({product, count, cart = false}) => {
    const dispatch = useDispatch()
    return (
        <>
            <button
                onClick={() => dispatch(removeFromCart(product))}
                className={`w-10 h-10 bg-red-400 hover:bg-red-500 active:bg-red-600 text-3xl font-bold rounded-l-lg`}
            >
                -
            </button>
            <span className={`text-center ${cart ? "w-10 sm:w-20" : "w-20"} pt-1 h-10 bg-gray-200 text-2xl`}>
                        {count}
                    </span>
            <button
                onClick={() => dispatch(addToCart(product))}
                className={`w-10 h-10 bg-green-400 hover:bg-green-500 active:bg-green-600 text-3xl font-semibold rounded-r-lg`}
            >
                +
            </button>
        </>
    )
}

export default ProductButtons