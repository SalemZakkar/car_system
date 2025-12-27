import mongoose, {ClientSession} from "mongoose";
import {IUser, UserUpdateFields} from "../models";
import {UserModel} from "../models";
import {MongooseQuery} from "../../core/";
import {hashPassword} from "../../core";

export class UserService {
    createAccount = async (data: IUser) => {
        return UserModel.create(data);
    };

    update = async (
        id: string | mongoose.ObjectId,
        data: UserUpdateFields,
        session: mongoose.mongo.ClientSession | null = null,
    ) => {
        return UserModel.findByIdAndUpdate(id, data, {
            new: true,
            session: session,
        });
    };

    setPassword = async (
        id: mongoose.ObjectId | String,
        password: string,
        session?: ClientSession
    ) => {
        return UserModel.findByIdAndUpdate(
            id,
            {password: await hashPassword(password, 10),},
            {session: session ? session : null}
        );
    };

    getUserByEmail = async (email: string) => {
        return UserModel.findOne({email: email});
    };

    getUserById = async (id: string | mongoose.ObjectId) => {
        return UserModel.findById(id);
    };

    getUserByCriteria = async (query: MongooseQuery) => {
        return UserModel.findAndCount(query);
    };

    changeUserEmail = async (id: string, email: string, session?: ClientSession) => {
        return UserModel.findByIdAndUpdate(id, {email: email, isEmailVerified: false,}, {
            new: true,
            session: session ? session : null,
        });
    };
}
