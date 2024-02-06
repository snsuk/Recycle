import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const image = req.file ? `/static/images/${req.file.filename}` : '/static/images/no_image.jpg';
        const newProduct = new Product({ title, description, price, image, seller: req.user._id });

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


export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate('seller', 'name');
        if (!product) {
            return res.status(404).json({ message: "Продукт не найден" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении продукта", error });
    }
};



export const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Продукт не найден" });
        }

        res.status(200).json({ message: "Продукт успешно удален", deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка удаления продукта", error });
    }
};

