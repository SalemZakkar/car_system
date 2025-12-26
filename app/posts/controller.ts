import {Request, Response} from "express";
import {executeWithTransaction, getFilesByFieldName, sendSuccessResponse} from "../../core";
import {FileService} from "../files";
import {PostService} from "./service";
import {PostNotFoundException} from "./errors";

export class PostController {
    service = new PostService();
    fileService = new FileService();

    create = async (req: Request, res: Response) => {
        let {title, description} = req.body;
        let file = getFilesByFieldName(req, "image").at(0);
        let result = await executeWithTransaction(async (session) => {
            let rFile = await this.fileService.saveFile(file!, session);
            return await this.service.create({
                title: title,
                description: description,
                file: rFile?.id,
                user: req.userId!,
                session: session
            });
        });
        sendSuccessResponse({res: res, data: result});
    }

    edit = async (req: Request, res: Response) => {
        let old = await this.service.getById(req.params.id!);
        if (!old) {
            throw new PostNotFoundException();
        }
        let {title, description, image} = req.body;
        let result = await executeWithTransaction(async (session) => {
            if (image === null && old.image) {
                await this.fileService.deleteFile(old.image, session);
            }
            let file = await this.fileService.saveFile(
                getFilesByFieldName(req, "image").at(0),
                session,
            );
            if (file) {
                await this.fileService.deleteFile(old.image, session);
            }
            return await executeWithTransaction(async (session) => {
                return await this.service.edit({
                    id: req.params.id!,
                    title: title,
                    description: description,
                    file: file?.id,
                    session: session
                });
            });
        });
        sendSuccessResponse({res: res, data: result});

    }

    delete = async (req: Request, res: Response) => {
        let exist = await this.service.getById(req.params.id!);
        if (!exist) {
            throw new PostNotFoundException();
        }
        await executeWithTransaction(async (session) => {
            await this.fileService.deleteFile(exist.image, session);
            await this.service.delete(req.params.id!, session);
        });
        sendSuccessResponse({res: res});
    }

    getAll = async (req: Request, res: Response) => {
        sendSuccessResponse({res: res, data: await this.service.getAll()});
    }
}