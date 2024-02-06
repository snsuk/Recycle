import express from "express"
import {addProduct, getProducts, deleteProduct} from "../controllers/productControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../services/multer.js";
import Product from '../models/productModel.js';
import { getProductById } from '../controllers/productControllers.js';

const router = express.Router()


router.post('/', authMiddleware(), upload.single('image'), addProduct)
router.get('/', getProducts)
router.delete('/:productId', authMiddleware(), deleteProduct);
router.get('/:productId', getProductById);


router.put('/:productId', authMiddleware(), async (req, res) => {
    const productId = req.params.productId;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Продукт не найден' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Ошибка при обновлении продукта:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

export default router