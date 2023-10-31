import express from "express"
import {signUp, signIn, authenticate} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/authenticate', authenticate)



export default router

