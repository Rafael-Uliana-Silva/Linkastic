import jwt, {Secret} from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config();

const secretKey: Secret = process.env.KEY as Secret

export const gerarToken = (user: any) => {
  return jwt.sign(
    { id: user._id, username: user.username},
    secretKey,
    {expiresIn: "1h"}
  )
}
