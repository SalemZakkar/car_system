import mongoose, {model, Schema} from "mongoose";
import {CarVariant} from "../manufacturer";
import {defaultDbOptions} from "../../core";

let carVariantSchema = new Schema<CarVariant>({
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
    }, defaultDbOptions(),
);

export const CarVariantModel = model<CarVariant>("Variant", carVariantSchema,);