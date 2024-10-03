"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByUsername = exports.getUserById = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
    }
};
exports.getUserById = getUserById;
const getUserByUsername = async (req, res) => {
    try {
        const user = await user_1.default.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
    }
};
exports.getUserByUsername = getUserByUsername;
const createUser = async (req, res) => {
    try {
        const newUser = new user_1.default(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: err });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { oldPassword, newPassword, username, email, img } = req.body;
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        if (oldPassword && newPassword) {
            const isPasswordValid = await bcryptjs_1.default.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Senha antiga incorreta' });
                return;
            }
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (img)
            user.img = img;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error: err });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await user_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        else {
            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir usuário', error: err });
    }
};
exports.deleteUser = deleteUser;
