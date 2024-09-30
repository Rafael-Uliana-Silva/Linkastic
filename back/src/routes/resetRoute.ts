import { Router } from "express";
import { resetPassword, resetPasswordToken } from "../controllers/resetController";

const router = Router({ mergeParams: true }); 

router.post("/", resetPassword);
router.post("/:token", resetPasswordToken);

export default router;
