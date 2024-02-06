import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createMessageForChat,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessagesByChatId
} from "../controllers/messageControllers.js";

const router = express.Router();

router.get('/:chatId/messages', authMiddleware(), getMessagesByChatId);
router.post('/:chatId/messages', authMiddleware(), createMessageForChat);
router.get('/', getMessages);
router.put('/:messageId', authMiddleware(), updateMessage);
router.delete('/:messageId', authMiddleware(), deleteMessage);

export default router;


