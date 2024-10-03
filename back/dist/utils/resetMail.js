"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const enviarEmail = async (email, token) => {
    const resetUrl = `http://localhost:5173/resetPassword/${token}`;
    const mailOptions = {
        from: "rafaelulianatestes@gmail.com",
        to: email,
        subject: "Redefinir senha",
        text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetUrl}`,
        html: `<p>Você solicitou uma redefinição de senha. Clique no link abaixo para redefinir sua senha:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail de reset enviado com sucesso");
    }
    catch (err) {
        console.error("Houve um erro", err);
    }
};
exports.enviarEmail = enviarEmail;
