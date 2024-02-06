import React from "react"
import {RiDeleteBin5Line} from "react-icons/ri"
import ProductButtons1 from "../ProductButtons1/ProductButtons1";
import {removeAllFromCart} from '../../redux/actions/productActions';
import {useDispatch} from "react-redux";

const CartRow = ({product}) => {
    const dispatch = useDispatch()

    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border">
                <div className="flex flex-col sm:flex-row items-center text-sm">
                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img className="object-cover w-full h-full rounded-full"
                             src={product.image}
                             alt={product.title} loading="lazy"/>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{product.title}</p>
                        <p className="text-xs text-gray-600">Цена: {product.price} сом</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">
                <div className="flex flex-col sm:flex-row justify-center">
                    <div className="flex justify-center sm:mr-6 mb-4 sm:mb-0">
                        <ProductButtons1 product={product} count={product.count} cart={true}/>
                    </div>
                    <div className="w-full">
                        <button onClick={() => dispatch(removeAllFromCart(product._id))}
                                className="py-2 sm:py-0 rounded-xl text-2xl text-white bg-red-600 w-full sm:w-12 flex justify-center items-center">
                            <RiDeleteBin5Line/></button>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-xs border">
                <span className="px-2 py-1 font-semibold text-lg leading-tight text-green-700 bg-green-100 rounded-sm">
                    {product.count * product.price} сом
                </span>
            </td>
        </tr>
    )
}
export default CartRow