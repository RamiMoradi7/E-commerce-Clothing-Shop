import express, { NextFunction, Request, Response } from "express";
import { clothSizeService } from "../5-services/cloth-sizes-service";
import { ClothSizeModel, SizeModel } from "../3-models/size-model";
import { StatusCode } from "../3-models/enums";

class ClothSizeController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/cloth-sizes", this.getClothSizes);
    this.router.get("/cloth-sizes/:_id([a-f0-9A-F]{24})", this.getClothSize);
    this.router.post("/cloth-sizes", this.addClothSize);
    this.router.put("/cloth-sizes/:_id([a-f0-9A-F]{24})", this.updateClothSize);
    this.router.delete(
      "/cloth-sizes/:_id([a-f0-9A-F]{24})",
      this.deleteClothSize
    );
  }
  private async getClothSizes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clothSizes = await clothSizeService.getClothSizes();
      response.json(clothSizes);
    } catch (err: any) {
      next(err);
    }
  }
  private async getClothSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const clothSize = await clothSizeService.getClothSize(_id);
      response.json(clothSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async addClothSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clothSize = new ClothSizeModel(request.body);
      const addedClothSize = await clothSizeService.addClothSize(clothSize);
      response.status(StatusCode.Created).json(addedClothSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateClothSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const clothSize = new ClothSizeModel(request.body);
      const updatedClothSize = await clothSizeService.updateClothSize(clothSize);
      response.json(updatedClothSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteClothSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await clothSizeService.deleteClothSize(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const clothSizesController = new ClothSizeController();
export const clothSizeRouter = clothSizesController.router;
