import mongoose from "mongoose";
import {AdBannerModel} from "../models";

export class AdBannerService {
    create = async function (file: mongoose.ObjectId | string) {
        return AdBannerModel.insertOne({image: file});
    }
    edit = async function (input: {
        id: mongoose.ObjectId | string,
        file: mongoose.ObjectId | string,
        session: mongoose.ClientSession | null
    }) {
        return AdBannerModel.findByIdAndUpdate(input.id,
            {image: input.file},
            {session: input.session},
        );
    }
    delete = async function (id: mongoose.ObjectId | string, session: mongoose.ClientSession | null = null,) {
        await AdBannerModel.findByIdAndDelete(id, {session: session,});
    }

    getAll = async function () {
        return AdBannerModel.find();
    }

    getById = async function (id: mongoose.ObjectId | string) {
        return AdBannerModel.findById(id);
    }
}