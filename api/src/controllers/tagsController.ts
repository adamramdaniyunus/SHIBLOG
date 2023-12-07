import PostTags from "../models/tags";
import express from 'express';

// create tags
export const createTags = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { title } = req.body;

        const postTags = await PostTags.findOne({ title });

        if (postTags) {
            const error = new Error("Tags is already created");
            return next(error)
        }

        const newCategory = await PostTags.create({
            title,
        });

        return res.status(201).json({ data: newCategory })
    } catch (error) {
        next(error)
    }
}

// get one tag
export const onetags = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { tagsId } = req.params
    try {
        const postTags = await PostTags.findById(tagsId);

        if (postTags) {
            const error = new Error("Tags not found");
            return next(error)
        }

        return res.status(201).json({ data: PostTags })
    } catch (error) {
        next(error)
    }
}


// get data
export const getTags = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const postTags = await PostTags.find();
        return res.status(201).json({ data: postTags })
    } catch (error) {
        next(error)
    }
}

// update tags
export const updatetags = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { tagsId } = req.params
    try {
        const { title } = req.body;

        const postTags = await PostTags.findById(tagsId);

        if (postTags) {
            const error = new Error("Tags not found");
            return next(error)
        }

        postTags.title = title || postTags.title

        await postTags.save()

        return res.status(201).json({ data: PostTags })
    } catch (error) {
        next(error)
    }
}

// delete tags
export const deletetags = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { tagsId } = req.params
    try {

        const postTags = await PostTags.findById(tagsId);

        if (postTags) {
            const error = new Error("Tags not found");
            return next(error)
        }

        await postTags.deleteOne()

        return res.status(201).json({ msg: "Tags deleted" })
    } catch (error) {
        next(error)
    }
}