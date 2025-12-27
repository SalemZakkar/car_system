import mongoose, {model, Schema} from "mongoose";
import {AdBanner} from "./interface";
import {defaultDbOptions} from "../../../core";

let adBannerSchema = new Schema<AdBanner>({
        image: {
            type: mongoose.Types.ObjectId,
            ref: "File",
            required: true,
        },
    }, defaultDbOptions(),
);

export const AdBannerModel = model("AdBanner", adBannerSchema);