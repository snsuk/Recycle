import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddProduct = () => {
    const { handleSubmit, register, reset } = useForm();

    const addProduct = (data) => {
        const product = new FormData();
        product.append("title", data.title);
        product.append("description", data.description);
        product.append("price", data.price);
        product.append("image", data.image[0]);

        axios({
            method: "post",
            url: "/api/v1/products",
            headers: { "Content-Type": "multipart/form-data" },
            data: product,
        })
            .then(({ data }) => {
                alert(data.message);
                reset();
            })
            .catch((e) => alert(e.response?.data?.message || "Ошибка"));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(addProduct)}>
                <div className="min-h-screen md:px-20 pt-2">
                    <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
                            Создать товар
                        </h1>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="text-lx font-serif"
                                >
                                    Название:
                                </label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    placeholder="Название товара"
                                    id="title"
                                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-lg font-serif"
                                >
                                    Описание:
                                </label>
                                <textarea
                                    {...register("description")}
                                    id="description"
                                    cols="30"
                                    rows="5"
                                    placeholder="Введите описание товара..."
                                    className="w-full font-serif p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="text-lx font-serif"
                                >
                                    Цена:
                                </label>
                                <input
                                    {...register("price")}
                                    type="number"
                                    placeholder="Цена"
                                    id="price"
                                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="inline-block font-serif mr-5 mb-5">
                                    Изображение:
                                </label>
                                <input {...register("image")} id="image" type="file" />
                            </div>
                            <button className="px-10 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-indigo-600">
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
