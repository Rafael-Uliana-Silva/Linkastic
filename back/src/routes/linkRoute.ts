import { Router } from "express";
import {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
} from "../controllers/linkController";

const router = Router({ mergeParams: true }); 

router.get("/", getAllLinks);
router.get("/:linkId", getLinkById);
router.post("/", createLink);
router.patch("/:linkId", updateLink);
router.delete("/:linkId", deleteLink);

export default router;
