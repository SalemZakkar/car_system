import mongoose from "mongoose";
import {LatLng} from "../common";

export interface Car {
    brand: string | mongoose.ObjectId;
    variant: string | mongoose.ObjectId;
    year: number;
    price: number;
    image: string | mongoose.ObjectId;
    description: string;
    color: string;
    location: LatLng;
    user: mongoose.ObjectId | string;
}

export interface CarInput {
    brand?: string | mongoose.ObjectId | undefined;
    variant?: string | mongoose.ObjectId | undefined;
    year?: number | undefined;
    price?: number | undefined;
    image?: string | mongoose.ObjectId | undefined;
    description?: string | undefined;
    color?: string | undefined;
    location?: LatLng | undefined;
}