import Comment from "../models/comment";
import Post from "../models/post";
import express from "express";


// create comment

export const createComment = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const { desc, slug, parent, replyOnUser, check } = req.body;

        const post = await Post.findOne({ slug: slug });

        if (!post) {
            const error = new Error("Post not found");
            return next(error)
        }

        const newComment = await Comment.create({
            desc,
            slug,
            check,
            user: req.user._id,
            parent,
            post: post._id,
            replyOnUser,
        });

        return res.status(201).json({ data: newComment })
    } catch (error) {
        next(error)
    }
}

// update comment

export const updateComment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { desc } = req.body;
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            const error = new Error("Comment was not found");
            return next(error);
        }

        comment.desc = desc || comment.desc;

        const updatedComment = await comment.save();
        return res.json({ data: updatedComment });
    } catch (error) {
        next(error)
    }
}

// delete comment

export const deleteComment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            const error = new Error("Comment was not found");
            return next(error);
        }

        await comment.deleteOne();
        return res.json({ msg: "Comment deleted!" });
    } catch (error) {
        next(error)
    }
}