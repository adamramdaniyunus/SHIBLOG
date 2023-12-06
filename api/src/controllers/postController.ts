import uploadPicture from "../middlewares/uploadPicture";
import Post from "../models/post";
import { fileRemover } from "../utils/fileRemover";
import { v4 as uuidv4 } from "uuid"
import Comment from "../models/comment";
import express from 'express';


// create a post

export const createPost = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const post = new Post({
            title: "sample title",
            caption: "sample caption",
            slug: uuidv4(),
            body: {
                type: "doc",
                content: [],
            },
            photo: "",
            user: req.user._id,
        });

        const createdPost = await post.save();
        return res.json({ data: createdPost });
    } catch (error) {
        next(error)
    }
}

// update post

export const updatePost = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post aws not found");
            next(error);
            return;
        }

        const upload = uploadPicture.single("postPicture");

        const handleUpdatePostData = async (data: string) => {
            const { title, caption, slug, body, tags, categories } = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            const updatedPost = await post.save();
            return res.json({ data: updatedPost });
        };

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            } else {
                // every thing went well
                if (req.file) {
                    let filename;
                    filename = post.photo;
                    if (filename) {
                        fileRemover(filename);
                    }
                    post.photo = req.file.filename;
                    handleUpdatePostData(req.body.document);
                } else {
                    let filename;
                    filename = post.photo;
                    post.photo = "";
                    fileRemover(filename);
                    handleUpdatePostData(req.body.document);
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

// get post

export const getPost = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate([
            {
                path: "user",
                select: ["avatar", "name"],
            },
            {
                path: "categories",
                select: ["title"],
            },
            {
                path: "comments",
                match: {
                    check: true,
                    parent: null,
                },
                populate: [
                    {
                        path: "user",
                        select: ["avatar", "name"],
                    },
                    {
                        path: "replies",
                        match: {
                            check: true,
                        },
                        populate: [
                            {
                                path: "user",
                                select: ["avatar", "name"],
                            },
                        ],
                    },
                ],
            },
        ]);

        if (!post) {
            const error = new Error("Post was not found");
            return next(error);
        }

        return res.json({ data: post });
    } catch (error) {
        next(error);
    }
}


// delete post

export const deletePost = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post not found");
            return next(error);
        }

        await Comment.deleteMany({ post: post._id });

        return res.json({
            message: "Post is successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}

// get all post
export const getAllPost = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const filter = req.query.searchKeyword;
        let where: { title?: { $regex: string; $options: string } } = {};
        if (typeof filter === "string") {
            where.title = { $regex: filter, $options: "i" };
        }
        let query = Post.find(where);
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * pageSize;
        const total = await Post.find(where).countDocuments();
        const pages = Math.ceil(total / pageSize);

        res.header({
            "x-filter": filter,
            "x-totalcount": JSON.stringify(total),
            "x-currentpage": JSON.stringify(page),
            "x-pagesize": JSON.stringify(pageSize),
            "x-totalpagecount": JSON.stringify(pages),
        });

        if (page > pages) {
            return res.json([]);
        }

        const result = await query
            .skip(skip)
            .limit(pageSize)
            .populate([
                {
                    path: "user",
                    select: ["avatar", "name", "verified"],
                },
            ])
            .sort({ updatedAt: "desc" });

        return res.json(result);
    } catch (error) {
        next(error);
    }
}