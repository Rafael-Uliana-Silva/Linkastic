"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLink = exports.updateLink = exports.createLink = exports.getLinkById = exports.getAllLinks = void 0;
const user_1 = __importDefault(require("../models/user"));
const getAllLinks = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Id de usuário não encontrado' });
            return;
        }
        res.status(200).json(user.links);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar links de usuário', error: err });
    }
};
exports.getAllLinks = getAllLinks;
const getLinkById = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const link = user.links.id(req.params.linkId);
        if (!link) {
            res.status(404).json({ message: 'Link não encontrado' });
        }
        else {
            res.status(200).json(link);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar Link', error: err });
    }
};
exports.getLinkById = getLinkById;
const createLink = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        user.links.push(req.body);
        await user.save();
        res.status(201).json(user.links);
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao criar link', error: err });
    }
};
exports.createLink = createLink;
const updateLink = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const link = user.links.id(req.params.linkId);
        if (!link) {
            res.status(404).json({ message: 'Link não encontrado' });
            return;
        }
        link.set(req.body);
        await user.save();
        res.status(200).json(link);
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar link', error: err });
    }
};
exports.updateLink = updateLink;
const deleteLink = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const link = user.links.id(req.params.linkId);
        if (!link) {
            res.status(404).json({ message: 'Link não encontrado' });
            return;
        }
        link.deleteOne();
        await user.save();
        res.status(200).json({ message: 'Link excluído com sucesso' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir link', error: err });
    }
};
exports.deleteLink = deleteLink;
