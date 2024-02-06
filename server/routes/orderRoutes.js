import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received order request:', req.body);
        await createOrder(req, res);
    } catch (error) {
        console.error('Error handling order request:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

export default router;


