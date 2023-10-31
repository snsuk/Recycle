import {Strategy, ExtractJwt} from 'passport-jwt'
import dotenv from "dotenv"
import User from "../models/userModel.js"
dotenv.config()
const cookieExtractor = function (req) {
    return req && req.cookies && req.cookies.token
};

const options = {
    secretOrKey: process.env.SECRET || "secret",
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new Strategy(options, (jwt, done) => {
    User.findById(jwt._id, (error, user) => {
        if(error) return done(error, false)
        if(user) return done(null, user)
        return done(null, false)
    })
})

export default jwtStrategy