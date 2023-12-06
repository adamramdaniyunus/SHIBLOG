import { Schema, model } from "mongoose";

const postCategoriesSchema = new Schema(
    {
        title: { type: String, required: true },
    },
    { timestamps: true }
);

const PostCategories = model("PostCategories", postCategoriesSchema);
export default PostCategories;