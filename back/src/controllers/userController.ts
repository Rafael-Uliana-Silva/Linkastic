import { Request, Response } from "express";
import User from "../models/user"
import bcrypt from "bcryptjs"

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
  const { oldPassword, newPassword, username, email } = req.body;

  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    if (oldPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Senha antiga incorreta' });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (username) user.username = username;
    if (email) user.email = email;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);

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
