import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Recebido:', { username, email, password });

  if (typeof password !== 'string') {
      return res.status(400).json({ message: 'Senha inválida' });
  }

  try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
          return res.status(400).json({ message: 'E-mail ou nome de usuário já está em uso' });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Verifique se 'password' não é undefined

      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.KEY as string, { expiresIn: '1h' });

      res.status(201).json({ token });
  } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ message: 'Erro no servidor'});
  }
});


export default router;
