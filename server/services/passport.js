import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel.js';

const cookieExtractor = function (req) {
    return req && req.cookies && req.cookies.token;
};

const options = {
    secretOrKey: process.env.SECRET || "secret-key-for-jwt",
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new Strategy(options, async (jwt, done) => {
    try {
        const user = await User.findById(jwt._id);
        if (user) {
            user.role = user.role || 'user';

            const isAdmin = user.role === 'admin'; 

            return done(null, user, { isAdmin });
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});



export default jwtStrategy;
