import mongoose, {model, Schema} from "mongoose";
import {defaultDbOptions} from "../../../core";
import {Car, CarServiceType} from "./interface";

let carSchema = new Schema<Car>({
        variant: {
            type: mongoose.Types.ObjectId,
            ref: "Variant",
            required: true,
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: "Brand",
            // required: true,
        },

        color: {
            type: String,
            isRequired: true,
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: "File",
            required: true,
        },
        description: {
            type: String,
            isRequired: true,
        },
        year: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        location: {
            address: {
                type: String,
                required: true,
            },
            lat: {
                type: Number,
                required: true,
            },
            lng: {
                type: Number,
                required: true,
            },
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        service: {
            type: String,
            enum: Object.values(CarServiceType),
            required: true,
        }
    }, defaultDbOptions(),
);

carSchema.pre(["find", "findOne", "findOneAndUpdate"], function (next) {
    this.populate("user");
    this.populate("brand");
    this.populate({
        path: "variant",
        populate: {
            path: "brand",
        }
    });
    next();
});

// carSchema.pre("save", async function (next) {
//     console.log(this.variant)
//     // if (this.variant) {
//     //     const variantExists = await mongoose.model("Variant").findById({_id: this.variant});
//     //     if (!variantExists) {
//     //         throw new CarVariantNotFoundError();
//     //     }
//     //     console.log(variantExists.brand);
//     //     this.brand = variantExists.brand;
//     // }
//     next();
// });

carSchema.post("save", async function (doc, next) {

    await doc.populate("user");
    this.populate("brand");
    await doc.populate({
        path: "variant",
        populate: {
            path: "brand",
        }
    });
    next();
});
export const CarModel = model<Car>("Car", carSchema);