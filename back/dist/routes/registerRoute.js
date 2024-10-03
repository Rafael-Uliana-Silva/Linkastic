"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Recebido:', { username, email, password });
    if (typeof password !== 'string') {
        return res.status(400).json({ message: 'Senha inválida' });
    }
    try {
        const existingUser = await user_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail ou nome de usuário já está em uso' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.KEY, { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});
exports.default = router;
