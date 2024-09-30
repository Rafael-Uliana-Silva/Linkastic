import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from "../models/user" 
import bcrypt from "bcryptjs"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { enviarEmail } from "../utils/resetMail"


dotenv.config();

const secretKey: Secret = process.env.KEY as Secret;

interface CustomRequest extends Request {
  params: {
    token: string;
  };
  body: {
    newPassword: string;
  };
}

const resetPasswordToken = async (req: CustomRequest, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, secretKey);
    let userId: string | undefined;

    if (typeof decoded === 'object' && 'id' in decoded) {
      userId = (decoded as JwtPayload).id;
    }

    if (!userId) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao processar redefinição de senha:', error);
    res.status(400).json({ message: 'Token inválido ou expirado' });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = jwt.sign({ id: user._id, email }, secretKey, { expiresIn: '1h' });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); 

    await user.save();

    await enviarEmail(email, token);

    res.json({ message: 'E-mail de redefinição de senha enviado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar solicitação.' });
  }
};

export {resetPassword, resetPasswordToken}
