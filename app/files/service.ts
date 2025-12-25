import {AppFile, FileModel} from "./model";
import {FileNotFoundError} from "./errors";
import mongoose from "mongoose";

export class FileService {
    saveFile = async (file: Express.Multer.File, session: mongoose.ClientSession | null = null) => {
        const fileData: AppFile = {
            fileName: file.originalname,
            mimetype: file.mimetype,
            buffer: file.buffer,
        };
        return await FileModel.insertOne(fileData, {session: session});
    }

    getFileDocument = async (id: string | mongoose.ObjectId) => {
        let doc = await FileModel.findById(id);
        if (!doc) {
            throw new FileNotFoundError();
        }
        return doc;
    }

    getFile = async (id: string | mongoose.ObjectId) => {
        return (await this.getFileDocument(id)).buffer;
    }


    deleteFile = async (id: string | mongoose.ObjectId, session: mongoose.ClientSession | null = null) => {
        await FileModel.findOneAndDelete({_id: id}, {session: session});
    }
}