import express from "express";
import { addComment, getComments, getCommentById, updateComment, deleteComment } from "../controllers/commentControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware(), addComment);
router.get('/', getComments);
router.get('/:commentId', getCommentById);
router.put('/:commentId', authMiddleware(), updateComment);
router.delete('/:commentId', authMiddleware(), deleteComment);

router.get('/users', authMiddleware(), (req, res) => {
    console.log('Authenticated user:', req.user); 
  });
  

export default router;

