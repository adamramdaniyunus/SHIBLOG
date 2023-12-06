import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "../middlewares/authMiddleware";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
} from "../controllers/categoryController";

router.post("/category", authGuard, adminGuard, createCategory);
router.get("/category", getAllCategories)
router.patch("/category/:categoryId", authGuard, adminGuard, updateCategory)
router.delete("/category/:categoryId", authGuard, adminGuard, deleteCategory)

export default router;