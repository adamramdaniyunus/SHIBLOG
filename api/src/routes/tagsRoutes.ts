import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "../middlewares/authMiddleware";
import { createTags, deletetags, getTags, onetags, updatetags } from "../controllers/tagsController";


router.post("/tags", authGuard, adminGuard, createTags);
router.get("/tags", getTags)
router.patch("/tags/:tagsId", authGuard, adminGuard, updatetags)
router.delete("/tags/:tagsId", authGuard, adminGuard, deletetags)
router.get("/tags/:tagsId", onetags)

export default router;