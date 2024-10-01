import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController"

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/profile/:username", getUserByUsername);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router
