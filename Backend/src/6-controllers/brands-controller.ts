import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { BrandModel } from "../3-models/brand-model";
import { StatusCode } from "../3-models/enums";
import { brandsService } from "../5-services/brands-service";
import { imagesHandler } from "../2-utils/images-handler";

class BrandsController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/brands", this.getBrands);
    this.router.get("/brands/:_id([a-f0-9A-F]{24})", this.getBrand);
    this.router.post("/brands", this.addBrand);
    this.router.put("/brands/:_id([a-f0-9A-F]{24})", this.updateBrand);
    this.router.delete("/brands/:_id([a-f0-9A-F]{24})", this.deleteBrand);
    this.router.get(
      "/products/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }
  private async getBrands(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brands = await brandsService.getBrands();
      response.json(brands);
    } catch (err: any) {
      next(err);
    }
  }
  private async getBrand(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const brand = await brandsService.getBrand(_id);
      response.json(brand);
    } catch (err: any) {
      next(err);
    }
  }
  private async addBrand(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(request.files);
      const brand = new BrandModel(request.body);
      const addedBrand = await brandsService.addBrand({
        brand,
        image: request.files?.image as UploadedFile,
      });
      response.status(StatusCode.Created).json(addedBrand);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateBrand(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const brand = new BrandModel(request.body);
      const updatedBrand = await brandsService.updateBrand({
        brand,
        image: request.files?.image as UploadedFile,
      });
      response.json(updatedBrand);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteBrand(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await brandsService.deleteBrand(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const brandsController = new BrandsController();
export const brandsRouter = brandsController.router;
