"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkSchema = exports.Links = void 0;
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});
exports.linkSchema = linkSchema;
const Links = (0, mongoose_1.model)("Link", linkSchema);
exports.Links = Links;
