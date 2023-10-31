import React from "react";
import ProductButtons from "../ProductButtons/ProductButtons";
import "tailwindcss/tailwind.css"


const ProductCard = ({ product, count }) => {
    // const { currentRate, rates } = useSelector((s) => s.products);

    return(
        <div className="shadow-lg rounded-lg bg-gray-100 h-full flex flex-col justify-between pb-6">
            <img className="object-cover h-52 w-full rounded-t-lg" src={product.image} alt={product.title}/>
            <div className="py-4 px-6 text-center flex-grow">
                <h3 className="text-xl mb-3">{product.title}</h3>
                <div className="mb-3">Цена: {product.price} сом</div>
                {/*<div className="mb-3">Цена: {(product.price * rates[currentRate]).toFixed(2)}{currentRate[1]}</div>*/}
                <div className="flex justify-center">
                    <ProductButtons product={product} count={count}/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

