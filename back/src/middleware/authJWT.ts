import {Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config()

const secretKey: Secret = process.env.KEY as Secret;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header("Autorizacao")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado"});
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded
  } catch(err) {
    res.status(401).json({message: "Token inválido"});
  }
}
