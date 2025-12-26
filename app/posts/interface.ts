import mongoose from "mongoose";

export interface Post {
    image?: mongoose.ObjectId | string | null;
    id: mongoose.ObjectId | string;
    title: string;
    description: string;
    user: mongoose.ObjectId | string,
}