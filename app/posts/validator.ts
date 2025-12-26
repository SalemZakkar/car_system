import Joi from "joi";
import {fileValidator} from "../files";

export const createPostValidator = Joi.object(
    {
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: fileValidator(10 * 1024 * 8, ["image/jpeg", "image/png", "image/jpg"])
    }
).unknown(false);

export const updatePostValidator = Joi.object(
    {
        title: Joi.string(),
        description: Joi.string(),
        image: fileValidator(10 * 1024 * 8, ["image/jpeg", "image/png", "image/jpg"]).allow(null)
    }
).unknown(false);