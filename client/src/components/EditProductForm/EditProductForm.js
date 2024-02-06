import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";

const EditProductForm = ({ product, onCancel, onUpdate }) => {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: product?.title || "",
            price: product?.price || "",
            description: product?.description || "",
        },
    });

    React.useEffect(() => {
        setValue("title", product?.title || "");
        setValue("price", product?.price || "");
        setValue("description", product?.description || "");
    }, [product, setValue]);

    const onSubmit = async (data) => {
        if (!product || !product._id) {
            console.error("Product is missing _id");
            return;
        }

        const updatedProductData = {
            title: data.title,
            price: data.price,
            description: data.description,
        };



        try {
            const response = await fetch(`/api/v1/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update product (status ${response.status})`);
            }
            alert("Продукт был успешно изменён!")
            navigate("/")

            onUpdate(updatedProductData);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="container mt-10 mb-20 bg-white px-10 m-5 py-8 rounded-xl shadow-md max-w-sm w-screen ml-20"
        >
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Название продукта
                </label>
                <input
                    {...register("title")}
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                    Цена
                </label>
                <input
                    {...register("price")}
                    type="number"
                    id="price"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Описание
                </label>
                <textarea
                    {...register("description")}
                    id="description"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="flex items-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                    Обновить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default EditProductForm;
