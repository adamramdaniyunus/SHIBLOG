import { Schema, model } from "mongoose";

const postTagesSchema = new Schema(
    {
        title: { type: String, required: true },
    },
    { timestamps: true }
);

const PostTags = model("PostTags", postTagesSchema);
export default PostTags;