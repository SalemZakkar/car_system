import {Request, Response} from "express";
import {executeWithTransaction, getFilesByFieldName, sendSuccessResponse} from "../../core";
import {AdBannerService} from "./service";
import {FileService} from "../files";
import {AdBannerNotFoundError} from "./errors";

export class AdBannerController {
    service = new AdBannerService();
    fileService = new FileService();

    create = async (req: Request, res: Response) => {
        let result = await this.fileService.saveFile(getFilesByFieldName(req, "image").at(0)!);
        sendSuccessResponse({res: res, data: await this.service.create(result!.id)});
    }

    edit = async (req: Request, res: Response) => {
        let old = await this.service.getById(req.params.id!);
        if (!old) {
            throw new AdBannerNotFoundError();
        }
        let nAdBanner =
            await executeWithTransaction(
                async (session) => {
                    let file = getFilesByFieldName(req, "image");
                    let result = await this.fileService.saveFile(file.at(0)!, session);
                    await this.fileService.deleteFile(old.image, session);
                    return await this.service.edit({
                        id: req.params.id!,
                        file: result!.id,
                        session
                    });
                }
            );
        sendSuccessResponse({res: res, data: nAdBanner});

    }

    delete = async (req: Request, res: Response) => {
        let exist = await this.service.getById(req.params.id!);
        if (!exist) {
            throw new AdBannerNotFoundError();
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