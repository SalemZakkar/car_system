import Joi from "joi";
import {stringQueryValidator} from "../../core";

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

export const getVariantValidator = Joi.object({
    name: stringQueryValidator,
    brand: Joi.string()
}).unknown(false);

export const getBrandValidator = Joi.object({
    name: stringQueryValidator,
}).unknown(false);