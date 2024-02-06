import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import dbConnect from "./services/mongoose.js";
import authRoutes from './routes/userRoutes.js';
import jwtStrategy from "./services/passport.js";
import chatRoutes from "./routes/chatRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { createChat } from './controllers/chatControllers.js';
import { createMessageForChat, getMessagesByChatId } from "./controllers/messageControllers.js";
import orderRoutes from './routes/orderRoutes.js';
import User from "./models/userModel.js";

dotenv.config();
dbConnect();
const PORT = process.env.PORT || 8090;
const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(passport.initialize());
passport.use('jwt', jwtStrategy);

server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/products', productRoutes);
server.use('/api/v1/chats', chatRoutes);
server.use('/api/v1/comments', commentRoutes);
server.use('/api/v1/messages', messageRoutes);
server.use('/api/v1/orders', orderRoutes);
server.post('/chats', authMiddleware(), (req, res, next) => {
    console.log("Request received at /chats");
    createChat(req, res, next);
});
server.post('/api/v1/chats/:chatId/messages', authMiddleware(), createMessageForChat);
server.post('/api/v1/chats/:chatId/messages', authMiddleware(), getMessagesByChatId);

server.use('/static/images', express.static('images'));

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'));
    server.get('/*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'));
    });
}

server.get('/api/v1/auth/admin/users', authMiddleware(), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении пользователей' });
    }
});

server.post('/api/v1/orders', async (req, res) => {
    const { productIds, userId } = req.body;
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0 || !userId) {
        return res.status(400).json({ message: 'Неверные входные данные' });
    }
    try {
        const order = await createOrderLogic(productIds, userId);
        res.status(200).json(order);
    } catch (error) {
        console.error('Ошибка при обработке заказа:', error);
        res.status(400).json({ success: false, message: 'Ошибка при обработке заказа', error: error.message });
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});