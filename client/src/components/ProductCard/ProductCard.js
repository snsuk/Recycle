// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import ProductButtons from "../ProductButtons/ProductButtons";
import "tailwindcss/tailwind.css";

const ProductCard = ({ product, count }) => {
  return (
    <div className="shadow-lg rounded-lg bg-gray-100 h-full flex flex-col justify-between pb-6">
      <Link to={`/products/${product._id}`}>
        {/* Используйте Link вокруг изображения или другого контейнера, чтобы сделать его ссылкой */}
        <img
          className="object-cover h-52 w-full rounded-t-lg"
          src={product.image}
          alt={product.title}
        />
      </Link>
      <div className="py-4 px-6 text-center flex-grow">
        <h3 className="text-xl mb-3">{product.title}</h3>
        <div className="mb-3">Цена: {product.price} сом</div>
        <div><Link to={`/products/${product._id}`}>Подробнее</Link></div>
        <div className="flex justify-center">
          <ProductButtons product={product} count={count} />
        </div>
        {/* Добавьте ссылку для перехода на страницу комментариев */}
      </div>
    </div>
  );
};

export default ProductCard;


