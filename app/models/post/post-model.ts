import mongoose, {model, Schema} from "mongoose";
import {defaultDbOptions} from "../../../core";
import {Post} from "./interface";

let postSchema = new Schema<Post>({
        image: {
            type: mongoose.Types.ObjectId,
            ref: "File",
            // required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
            ref: "User"
        }
    }, defaultDbOptions(),
);

export const PostModel = model<Post>("Post", postSchema);