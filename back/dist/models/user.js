"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const links_1 = require("./links");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    img: {
        type: String,
        default: "https://linkastic.onrender.com/images/defaultImg.svg",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    criado: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    links: [links_1.linkSchema],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
