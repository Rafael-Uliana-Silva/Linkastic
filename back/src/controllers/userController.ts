import { Request, Response } from "express";
import User from "../models/user"

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: err });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error: err });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: err });
  }
};

export {getAllUsers, getUserById, createUser, updateUser, deleteUser}
