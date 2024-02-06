import React from "react";
import {addToCart, removeFromCart} from '../../redux/actions/productActions';
import {useDispatch} from "react-redux";
import "tailwindcss/tailwind.css"

const ProductButtons = ({product, count, cart = false}) => {
    const dispatch = useDispatch()
    return (
        <>
            <button
                onClick={() => dispatch(addToCart(product))}
                className="flex items-center justify-center w-4/6 h-12 bg-gray-900 hover:bg-gray-200 hover:text-black mt-2 text-white font-semibold rounded-md transition duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 12h6m-3-3v6"></path>
                </svg>
                 В корзину
            </button>
        </>
    );
}


export default ProductButtons