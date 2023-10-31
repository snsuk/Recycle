import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/productRoutes.js"


import dbConnect from "./services/mongoose.js";
import authRoutes from './routes/userRoutes.js'
import jwtStrategy from "./services/passport.js";

dotenv.config()
dbConnect()
const port = process.env.PORT || 8090
const server = express()

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())
passport.use('jwt', jwtStrategy)

server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/products', productRoutes)

server.use('/static/images', express.static('images'))

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'));
    server.get('/*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
