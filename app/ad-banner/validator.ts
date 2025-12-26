import Joi from "joi";
import {fileValidator} from "../files";

export const createEditAdBannerValidator = Joi.object(
    {
        image: fileValidator(10 * 1024 * 8, ["image/jpeg", "image/png", "image/jpg"]).required()
    }
);