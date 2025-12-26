import {CarBrandModel, CarVariantModel} from "../models";
import mongoose from "mongoose";

export class CarBrandsService {
    createBrand = async function (input: { name: string }) {
        return await CarBrandModel.insertOne(input);
    }

    editBrand = async function (input: { id: mongoose.ObjectId | string, name: string }) {
        return CarBrandModel.findByIdAndUpdate(input.id, {name: input.name}, {new: true,});
    }

    deleteBrand = async function (id: mongoose.ObjectId | string) {
        await CarBrandModel.findByIdAndDelete(id);
    }

    getAllBrands = async function () {
        return CarBrandModel.find();
    }

    createVariant = async function (input: { brand: mongoose.ObjectId | string, name: string }) {
        return (await CarVariantModel.insertOne(input)).populate("brand");
    }

    editVariant = async function (input: { id: mongoose.ObjectId | string, name: string }) {
        return CarVariantModel.findByIdAndUpdate(input.id, {name: input.name}, {new: true,}).populate("brand");
    }

    deleteVariant = async function (id: mongoose.ObjectId | string) {
        await CarVariantModel.findByIdAndDelete(id);
    }

    getAllVariants = async function () {
        return CarVariantModel.find().populate("brand");
    }
}