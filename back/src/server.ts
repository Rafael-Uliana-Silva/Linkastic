import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || '')
.then(() => console.log("Conectado ao MongoDB"))
.catch(err => console.log(`Houve um erro de conexão: ${err}`));

app.use(express.json());
app.use(cors());

import userRoute from "./routes/userRoute"
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server iniciado na url: http://localhost:${PORT}`);
});
