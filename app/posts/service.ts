import mongoose from "mongoose";
import {PostModel} from "../models";
import {PostNotFoundException} from "./errors";

export class PostService {
    create = async function (input: {
        file?: mongoose.ObjectId | string,
        title: string,
        description: string,
        user: mongoose.ObjectId | string,
        session: mongoose.ClientSession | null
    }) {
        return (await PostModel.insertOne({
                image: input.file,
                title: input.title,
                description: input.description,
                user: input.user,
            },
            {session: input.session})).populate("user");
    }

    edit = async function (input: {
        id: mongoose.ObjectId | string,
        file?: mongoose.ObjectId | string | null,
        title?: string,
        description: string,
        session: mongoose.ClientSession | null
    }) {
        if (!(await PostModel.exists({_id: input.id}))) {
            throw new PostNotFoundException();
        }
        return PostModel.findByIdAndUpdate(input.id,
            {image: input.file, title: input.title, description: input.description,},
            {session: input.session, new: true,},
        ).populate("user");
    }
    delete = async function (id: mongoose.ObjectId | string, session: mongoose.ClientSession | null = null,) {
        if (!(await PostModel.exists({_id: id}))) {
            throw new PostNotFoundException();
        }
        await PostModel.findByIdAndDelete(id, {session: session,});
    }

    getAll = async function () {
        return PostModel.find().populate("user");
    }

    getById = async function (id: mongoose.ObjectId | string) {
        return PostModel.findById(id);
    }
}