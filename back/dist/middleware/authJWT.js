"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.KEY;
const authenticateJWT = (req, res, next) => {
    const token = req.header("Autorizacao")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acesso não autorizado" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
    }
    catch (err) {
        res.status(401).json({ message: "Token inválido" });
    }
};
exports.authenticateJWT = authenticateJWT;
const generateResetToken = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn: "1h" });
    return token;
};
exports.generateResetToken = generateResetToken;
