import {Car, CarInput} from "./interface";
import {CarModel, CarVariantModel} from "../models";
import mongoose from "mongoose";
import {MongooseQuery} from "../../core";
import {CarVariantNotFoundError} from "./errors";

export class CarService {
    createCar = async (input: Car) => {
        let variant = await CarVariantModel.findById(input.variant);
        if (!variant) {
            throw new CarVariantNotFoundError();
        }
        input.brand = variant.brand;
        return (await new CarModel(input)).save();
    }

    editCar = async (id: string | mongoose.ObjectId, input: CarInput, session: mongoose.ClientSession) => {
        if (input.variant) {
            let variant = await CarVariantModel.findById(input.variant);
            if (!variant) {
                throw new CarVariantNotFoundError();
            }
            input.brand = variant.brand;
        }
        return (await CarModel.findByIdAndUpdate(id, input, {new: true, session: session,})).save();
    }

    deleteCar = async (id: string, session: mongoose.ClientSession) => {
        await CarModel.findOneAndDelete(id, {session: session});
    }

    getAllCars = async (query: MongooseQuery) => {
        return CarModel.find(query.conditions).sort(query.sort);
    }

}