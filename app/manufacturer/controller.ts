import {Request, Response} from "express";
import {CarBrandsService} from "./service";
import {getQueries, sendSuccessResponse} from "../../core";
import {CarBrandModel, CarVariantModel} from "../models";
import {CarBrandNotFoundError, CarBrandVariantNotFoundError} from "./errors";

export class CarBrandsController {
    carBrandService = new CarBrandsService();

    createBrand = async (req: Request, res: Response) => {
        let {name} = req.body;
        let result = await this.carBrandService.createBrand({name: name});
        sendSuccessResponse({res: res, data: result});
    }

    editBrand = async (req: Request, res: Response) => {
        let exists = await CarBrandModel.exists({_id: req.params.id!});
        if (!exists) {
            throw new CarBrandNotFoundError();
        }
        let {name} = req.body;
        let result = await this.carBrandService.editBrand({id: req.params.id!, name: name});
        sendSuccessResponse({res: res, data: result});
    }

    deleteBrand = async (req: Request, res: Response) => {
        let exists = await CarBrandModel.exists({_id: req.params.id!});
        if (!exists) {
            throw new CarBrandNotFoundError();
        }
        await this.carBrandService.deleteBrand(req.params.id!);
        sendSuccessResponse({res: res});
    }
    getAllBrands = async (req: Request, res: Response) => {
        let query = getQueries(req.query, false);
        let result = await this.carBrandService.getAllBrands(query);
        sendSuccessResponse({res: res, data: result});
    }

    createVariant = async (req: Request, res: Response) => {
        let {brand, name} = req.body;
        let result = await this.carBrandService.createVariant({brand: brand, name: name,});
        sendSuccessResponse({res: res, data: result});
    }

    editVariant = async (req: Request, res: Response) => {
        let exists = await CarVariantModel.exists({_id: req.params.id!});
        if (!exists) {
            throw new CarBrandNotFoundError();
        }
        let {name} = req.body;
        let result = await this.carBrandService.editVariant({id: req.params.id!, name: name});
        sendSuccessResponse({res: res, data: result});
    }

    deleteVariant = async (req: Request, res: Response) => {
        let exists = await CarVariantModel.exists({_id: req.params.id!});
        if (!exists) {
            throw new CarBrandVariantNotFoundError();
        }
        await this.carBrandService.deleteVariant(req.params.id!);
        sendSuccessResponse({res: res});
    }
    getAllVariants = async (req: Request, res: Response) => {
        let query = getQueries(req.query, false, ['brand']);
        let result = await this.carBrandService.getAllVariants(query);
        sendSuccessResponse({res: res, data: result});
    }
}