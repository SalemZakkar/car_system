import {model, Schema} from "mongoose";
import {defaultDbOptions} from "../../../core";
import {CarBrand} from "./interface";

let brandModel = new Schema<CarBrand>({
        name: {
            type: String,
            required: true,
        }
    },
    defaultDbOptions(),);

export const CarBrandModel = model<CarBrand>("Brand", brandModel);