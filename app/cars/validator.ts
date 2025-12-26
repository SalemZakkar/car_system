import Joi from "joi";
import {Car} from "./interface";
import {fileValidator} from "../files";
import {numberQueryValidator, stringQueryValidator} from "../../core";

export const carCreateValidator = Joi.object<Car>({
    // brand: Joi.string().required(),
    variant: Joi.string().required(),
    year: Joi.number().required(),
    price: Joi.number().required(),
    image: fileValidator(10 * 1024 * 8, ["image/png", "image/jpeg"]).required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
    location: Joi.alternatives(
        Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required(),
        }).and("lat", "lng")
    ).required(),
});

export const carEditValidator = Joi.object<Car>({
    // brand: Joi.string(),
    variant: Joi.string(),
    year: Joi.number(),
    price: Joi.number(),
    image: fileValidator(10 * 1024 * 8, ["image/png", "image/jpeg"]).allow(null),
    description: Joi.string(),
    color: Joi.string(),
    location: Joi.alternatives(
        Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required(),
        }).and("lat", "lng"),
        Joi.valid(null)
    ),
});

export const carGetValidator = Joi.object({
    brand: Joi.string(),
    variant: Joi.string(),
    year: numberQueryValidator,
    price: numberQueryValidator,
    color: stringQueryValidator,
    user: Joi.string(),
}).unknown(false);