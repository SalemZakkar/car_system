import mongoose from "mongoose";
import {LatLng} from "../common/interface";

export interface Car {
    brand: string | mongoose.ObjectId;
    variant: string | mongoose.ObjectId;
    year: number;
    price: number;
    image: string | mongoose.Types.ObjectId | mongoose.ObjectId;
    description: string;
    color: string;
    location: LatLng;
    user: mongoose.ObjectId | string;
    service: CarServiceType;
}

export interface CarInput {
    brand?: string | mongoose.Types.ObjectId | mongoose.ObjectId | undefined;
    variant?: string | mongoose.Types.ObjectId | undefined;
    year?: number | undefined;
    price?: number | undefined;
    image?: string | mongoose.Types.ObjectId | undefined;
    description?: string | undefined;
    color?: string | undefined;
    location?: LatLng | undefined;
    service: CarServiceType;
}

export enum CarServiceType {
    rent = "rent",
    sell = "sell"
}