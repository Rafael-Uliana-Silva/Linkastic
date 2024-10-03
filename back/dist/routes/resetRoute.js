"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resetController_1 = require("../controllers/resetController");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/", resetController_1.resetPassword);
router.post("/:token", resetController_1.resetPasswordToken);
exports.default = router;
