import {FileService} from "../files";
import {CarService} from "./service";
import {Request, Response} from "express";
import {
    executeWithTransaction,
    getFilesByFieldName,
    getQueries,
    sendSuccessResponse,
    SystemNotFoundError
} from "../../core";
import {Car, CarInput} from "../models";
import {CarModel} from "../models";

export class CarController {
    fileService = new FileService();
    carService = new CarService();

    createCar = async (req: Request, res: Response) => {
        let file = getFilesByFieldName(req, "image").at(0)!;
        let input: Car = req.body;
        input.sellCount = Math.floor(Math.random() * 1000) + 1;
        input.user = req.userId!;
        let result = await executeWithTransaction(async (session) => {
            let fileResult = await this.fileService.saveFile(file, session);
            input.image = fileResult!._id;
            return await this.carService.createCar(input);
        });
        sendSuccessResponse({res: res, data: result});
    }

    editCar = async (req: Request, res: Response) => {
        let oldCar = await CarModel.findById(req.params.id!);
        if (!oldCar) {
            throw new SystemNotFoundError();
        }
        let file = getFilesByFieldName(req, "image").at(0);
        let input: CarInput = req.body;
        let result = await executeWithTransaction(async (session) => {
            if (file) {
                await this.fileService.deleteFile(oldCar.image, session);
                let fileResult = await this.fileService.saveFile(file, session);
                input.image = fileResult!._id;
            }
            return await this.carService.editCar(req.params.id!, input, session,);
        });
        sendSuccessResponse({res: res, data: result});
    }

    deleteCar = async (req: Request, res: Response) => {
        let oldCar = await CarModel.findById(req.params.id!);
        if (!oldCar) {
            throw new SystemNotFoundError();
        }
        await executeWithTransaction(async (session) => {
            await this.fileService.deleteFile(oldCar.image, session);
            await this.carService.deleteCar(req.params.id!, session);
        });
        sendSuccessResponse({res: res});
    }

    getAllCars = async (req: Request, res: Response) => {
        let query = getQueries(req.query, false, ['user', 'brand', 'variant' , 'sortKmInTank' , 'sortSellCount']);
        let result = await this.carService.getAllCars(query);
        sendSuccessResponse({res: res, data: result});
    }
}