import {CarBrandModel, CarVariantModel} from "../models";
import mongoose from "mongoose";
import {MongooseQuery} from "../../core";

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

    getAllBrands = async function (query: MongooseQuery) {
        return CarBrandModel.find(query.conditions);
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

    getAllVariants = async function (query: MongooseQuery) {
        return CarVariantModel.find(query.conditions).populate("brand");
    }
}