import express, {Request, Response} from "express"
import bcrypt from "bcryptjs"
import { gerarToken } from "../utils/tokenGenerator"
import User from "../models/user";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = gerarToken(user);

    res.json({ token });
});

export default router;
