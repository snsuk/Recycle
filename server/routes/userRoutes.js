import express from "express";
import {signUp, signIn, authenticate, getUsers, addAdminUser} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {deleteAdminUser } from "../controllers/authControllers.js";
import { sendAdminNotification } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/authenticate', authenticate);
router.post('/notifications', sendAdminNotification);

router.get('/users', authMiddleware(), (req, res) => {
    console.log('Authenticated user:', req.user); 
  });
  

router.get('/admin/users', authMiddleware(), getUsers);


router.post('/admin/users', authMiddleware(), addAdminUser);

router.delete('/admin/users/:userId', authMiddleware(), deleteAdminUser);

export default router;
