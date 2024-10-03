"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordToken = exports.resetPassword = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resetMail_1 = require("../utils/resetMail");
dotenv_1.default.config();
const secretKey = process.env.KEY;
const resetPasswordToken = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        let userId;
        if (typeof decoded === 'object' && 'id' in decoded) {
            userId = decoded.id;
        }
        if (!userId) {
            return res.status(400).json({ message: 'Token inválido' });
        }
        const user = await user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Senha redefinida com sucesso' });
    }
    catch (error) {
        console.error('Erro ao processar redefinição de senha:', error);
        res.status(400).json({ message: 'Token inválido ou expirado' });
    }
};
exports.resetPasswordToken = resetPasswordToken;
const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email }, secretKey, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        await user.save();
        await (0, resetMail_1.enviarEmail)(email, token);
        res.json({ message: 'E-mail de redefinição de senha enviado.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao processar solicitação.' });
    }
};
exports.resetPassword = resetPassword;
