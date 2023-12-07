import express from "express";
const router = express.Router();
import { getAllComment, checkComment } from "../controllers/commentController";
import { adminGuard, authGuard } from "../middlewares/authMiddleware";

router.get("/comments", getAllComment);
router.post("/comments/:commentId", authGuard, adminGuard, checkComment);


export default router;