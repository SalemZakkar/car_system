import { Car, CarInput } from "../models";
import { CarModel, CarVariantModel } from "../models";
import mongoose from "mongoose";
import { MongooseQuery } from "../../core";
import { CarVariantNotFoundError } from "./errors";
import { omit } from "lodash";
export class CarService {
  createCar = async (input: Car) => {
    let variant = await CarVariantModel.findById(input.variant);
    if (!variant) {
      throw new CarVariantNotFoundError();
    }
    input.brand = variant.brand;
    return new CarModel(input).save();
  };

  editCar = async (
    id: string | mongoose.ObjectId,
    input: CarInput,
    session: mongoose.ClientSession
  ) => {
    if (input.variant) {
      let variant = await CarVariantModel.findById(input.variant);
      if (!variant) {
        throw new CarVariantNotFoundError();
      }
      input.brand = variant.brand;
    }
    return (await CarModel.findByIdAndUpdate(id, input, {
      new: true,
      session: session,
    }))!.save();
  };

  deleteCar = async (id: string, session: mongoose.ClientSession) => {
    await CarModel.findByIdAndDelete(id, { session: session });
  };

  getAllCars = async (query: MongooseQuery) => {
    console.log(query.conditions);

    const { sortSellCount, sortKmInTank, ...otherQuery } = query.conditions;

    let sortOptions: any = {};
    if (sortSellCount === "DESC") {
      sortOptions.sellCount = -1;
    }

    if (sortKmInTank === "DESC") {
      sortOptions.kmInTank = -1;
    }

    if (sortSellCount === "ASC") {
      sortOptions.sellCount = 1;
    }

    if (sortKmInTank === "ASC") {
      sortOptions.kmInTank = 1;
    }

    const finalSort =
      Object.keys(sortOptions).length > 0 ? sortOptions : query.sort;

    console.log(finalSort);

    console.log(otherQuery);

    return CarModel.find(otherQuery).sort(finalSort);
  };
}
