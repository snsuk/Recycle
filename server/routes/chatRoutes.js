import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChat,
  getChats,
  getChatById,
  updateChat,
  deleteChat
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post('/', authMiddleware(), createChat);
router.get('/', authMiddleware(), getChats);
router.get('/:chatId', authMiddleware(), getChatById);
router.put('/:chatId', authMiddleware(), updateChat);
router.delete('/:chatId', authMiddleware(), deleteChat);

export default router;

