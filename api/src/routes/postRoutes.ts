import express from "express";
const router = express.Router();
import { authGuard } from "../middlewares/authMiddleware";
import {
    createPost,
    getPost,
    deletePost,
    getAllPost,
    updatePost
} from './../controllers/postController';
import {
    createComment,
    deleteComment,
    updateComment
} from "./../controllers/commentController";

router.post("/post", authGuard, createPost);
router.get("/post/:slug", getPost)
router.get("/posts", getAllPost)
router.delete("/post/:slug", authGuard, deletePost)
router.patch("/post/:slug", authGuard, updatePost)

router.post("/post/comment", authGuard, createComment)
router.patch("/post/comment/:commentId", authGuard, updateComment)
router.delete("/post/comment/:commentId", authGuard, deleteComment)


export default router;