import mongoose from "mongoose";

export interface CarVariant {
    brand: mongoose.ObjectId | string;
    id: mongoose.ObjectId | string;
    name: string;
}

export interface CarBrand {
    id: mongoose.ObjectId | string;
    name: string;
}