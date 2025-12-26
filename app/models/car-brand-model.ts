import {model, Schema} from "mongoose";
import {CarBrand} from "../manufacturer";
import {defaultDbOptions} from "../../core";

let brandModel = new Schema<CarBrand>({
        name: {
            type: String,
            required: true,
        }
    },
    defaultDbOptions(),);

export const CarBrandModel = model<CarBrand>("Brand", brandModel);