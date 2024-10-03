"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenGenerator_1 = require("../utils/tokenGenerator");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { credential, password } = req.body;
    try {
        const user = await user_1.default.findOne({ $or: [{ username: credential }, { email: credential }] });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const token = (0, tokenGenerator_1.gerarToken)(user);
        res.json({ token, id: user.id });
    }
    catch (error) {
        console.error("Erro ao processar login:", error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.default = router;
