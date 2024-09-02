import { Request, Response } from "express";
import User from "../models/user";

const getAllLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);  
    if (!user) {
      res.status(404).json({ message: 'Id de usuário não encontrado' });
      return;
    }
    res.status(200).json(user.links);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar links de usuário', error: err });
  }
};

const getLinkById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    const link = user.links.id(req.params.linkId);
    if (!link) {
      res.status(404).json({ message: 'Link não encontrado' });
    } else {
      res.status(200).json(link);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Link', error: err });
  }
};

// Cria um novo link para um usuário específico
const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    user.links.push(req.body);
    await user.save();
    res.status(201).json(user.links);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar link', error: err });
  }
};

// Atualiza um link específico de um usuário
const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    const link = user.links.id(req.params.linkId);
    if (!link) {
      res.status(404).json({ message: 'Link não encontrado' });
      return;
    }

    link.set(req.body); // Atualiza o link
    await user.save();
    res.status(200).json(link);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar link', error: err });
  }
};

// Exclui um link específico de um usuário
const deleteLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
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
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir link', error: err });
  }
};

export { getAllLinks, getLinkById, createLink, updateLink, deleteLink };
