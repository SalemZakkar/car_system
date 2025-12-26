import Joi from "joi";

export const createBrandValidator = Joi.object({
    name: Joi.string().required(),
}).unknown(false);

export const editBrandVariantValidator = Joi.object({
    name: Joi.string(),
}).unknown(false);

export const createVariantValidator = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
}).unknown(false);