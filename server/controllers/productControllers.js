import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const image = req.file ? `/static/images/${req.file.filename}` : '/static/images/no_image.jpg';
        const newProduct = new Product({ title, description, price, image });

        const product = await newProduct.save();

        res.json({
            message: 'Товар добавлен',
            product
        });
    } catch (error) {
        res.status(400).json({ message: "Ошибка добавления товара", error });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: "Ошибка", error });
    }
};
