import express from "express";
const router = express.Router();
import {
    registerUser,
    updateProfile,
    updateProfilePicture,
    userLogin,
    userProfile,
} from "../controllers/userController";
import { authGuard } from "../middlewares/authMiddleware";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", authGuard, userProfile);
router.patch("/update-profile", authGuard, updateProfile)
router.patch("/update-avatar", authGuard, updateProfilePicture)


export default router;