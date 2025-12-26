import mongoose from "mongoose";

export interface AdBanner {
    image: mongoose.ObjectId | string;
    id: mongoose.ObjectId | string;
}