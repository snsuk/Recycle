import passport from "passport";

const handleJWT = (req, res, next) => {
    return async (error, user, admin) => {
        console.log('JWT Error:', error);
        console.log('JWT User:', user);
        console.log('JWT Admin:', admin);

        if (error || (!user && !admin)) {
            return res.status(401).json({ message: 'Доступ запрещен', error });
        }

        await req.logIn(user, { session: false });
        req.user = user;
        return next();
    };
};


const authMiddleware = () => {
    return (req, res, next) => {
        const authenticate = passport.authenticate('jwt', { session: false }, handleJWT(req, res, next));
        return authenticate(req, res, next);
    };
};

export default authMiddleware;
