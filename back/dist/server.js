"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
mongoose_1.default.connect(process.env.MONGODB_URI || '')
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.log(`Houve um erro de conexão: ${err}`));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/images', express_1.default.static('src/public/images'));
app.use(express_1.default.json({ limit: '250mb' }));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const linkRoute_1 = __importDefault(require("./routes/linkRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
const resetRoute_1 = __importDefault(require("./routes/resetRoute"));
app.use("/users", userRoute_1.default);
app.use("/users/:id/links", linkRoute_1.default);
app.use("/login", loginRoute_1.default);
app.use("/register", registerRoute_1.default);
app.use("/resetPassword", resetRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server iniciado na url: http://localhost:${PORT}`);
});
