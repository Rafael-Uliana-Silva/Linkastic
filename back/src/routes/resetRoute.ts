import express from 'express';
import User from "../models/user" 
import jwt from 'jsonwebtoken';
import { enviarEmail } from "../utils/resetMail"

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); 

    await user.save();

    await enviarEmail(email, token);

    res.json({ message: 'E-mail de redefinição de senha enviado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar solicitação.' });
  }
});

export default router;
