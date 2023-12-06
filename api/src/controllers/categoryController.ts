import PostCategories from "../models/categories";
import Post from "../models/post";
import express from 'express';

// create category

export const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { title } = req.body;

        const postCatgory = await PostCategories.findOne({ title });

        if (postCatgory) {
            const error = new Error("Category is already created");
            return next(error)
        }

        const newCategory = await PostCategories.create({
            title,
        });

        return res.status(201).json({ data: newCategory })
    } catch (error) {
        next(error)
    }
}
// get all category
export const getAllCategories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const postCatgory = await PostCategories.find({});
        return res.status(200).json({ data: postCatgory })
    } catch (error) {
        next(error)
    }
}

// update category

export const updateCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { title } = req.body;
        const { categoryId } = req.params

        const postCatgory = await PostCategories.findById(categoryId);

        if (!postCatgory) {
            const error = new Error("Category not found!");
            return next(error)
        }

        postCatgory.title = title || postCatgory.title

        await postCatgory.save()

        return res.status(200).json({ data: postCatgory })
    } catch (error) {
        next(error)
    }
}

// delete category

export const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { categoryId } = req.params;

        await Post.updateMany({
            categories: { $in: [categoryId] }
        },
            {
                $pull: { categories: categoryId }
            })

        const postCatgory = await PostCategories.findById(categoryId);

        if (postCatgory) {
            const error = new Error("Category is already created");
            return next(error)
        }

        await postCatgory.deleteOne()

        return res.status(201).json({ msg: "Category deleted!" })
    } catch (error) {
        next(error)
    }
}