import express from "express"
import {addProduct, getProducts} from "../controllers/productControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../services/multer.js";

const router = express.Router()

router.post('/', authMiddleware(['admin']), upload.single('image'), addProduct)
router.get('/', getProducts)
export default router