import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


export const sendAdminNotification = async (req, res) => {
    try {
      const { orderId, userId } = req.body;
      res.json({ message: 'Admin notification sent successfully', notification: { orderId, userId } });
    } catch (error) {
      res.status(500).json({ message: 'Error sending admin notification', error });
    }
  };
  
export const deleteAdminUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        await User.findByIdAndDelete(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
// ... (ваш импорт)

export const addAdminUser = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { name, email, password, role, userType } = req.body;

        if (!name || !email || !password || !userType) {
            return res.status(400).json({ message: 'Все поля должны быть заполнены' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            _id,
            name,
            email,
            password: hashedPassword,
            role: role || 'user', 
            userType,
        });

        await newUser.save();

        console.log('Created User:', newUser);

        res.json({
            message: 'Пользователь добавлен',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user list", error });
    }
};

export const signUp = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        const newUser = new User({ ...req.body });
        const result = await newUser.save();

        res.status(201).json({
            message: "Вы зарегистрированы",
            user: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка регистрации", error });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Пользователь не найден" });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({ message: "Неверный email или пароль" });
        }

        const secret = process.env.SECRET || 'secret';
        
        const tokenPayload = { _id: user._id, role: user.role };
        
        const token = jwt.sign(tokenPayload, secret, { expiresIn: '2d' });
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 });

        res.json({
            message: `Добро пожаловать ${user.name}`,
            token,
            user: {
                _id: user._id, 
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Ошибка", error });
    }
}


export const authenticate = async (req, res) => {
    const token = req?.cookies?.token;
    if (!token) return res.status(401).json({ message: "Пользователь не авторизован" });

    try {
        const secret = process.env.SECRET || 'secret';
        const decodedToken = jwt.verify(token, secret);

        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }

        res.json({
            message: "Пользователь авторизован",
            token,
            user: {
                _id: user._id, 
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(401).json({ message: "Пользователь не авторизован", error });
    }
}

