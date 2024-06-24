import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { shoeSizesService } from "../5-services/shoe-sizes-service";
import { ShoeSizeModel } from "../3-models/size-model";

class ShoeSizesController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/shoe-sizes", this.getShoeSizes);
    this.router.get("/shoe-sizes/:_id([a-f0-9A-F]{24})", this.getShoeSize);
    this.router.post("/shoe-sizes", this.addShoeSize);
    this.router.put("/shoe-sizes/:_id([a-f0-9A-F]{24})", this.updateShoeSize);
    this.router.delete(
      "/shoe-sizes/:_id([a-f0-9A-F]{24})",
      this.deleteShoeSize
    );
  }
  private async getShoeSizes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const shoesSizes = await shoeSizesService.getShoeSizes();
      response.json(shoesSizes);
    } catch (err: any) {
      next(err);
    }
  }
  private async getShoeSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const shoeSize = await shoeSizesService.getShoeSize(_id);
      response.json(shoeSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async addShoeSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const shoeSize = new ShoeSizeModel(request.body);
      const addedShoeSize = await shoeSizesService.addShoeSize(shoeSize);
      response.status(StatusCode.Created).json(addedShoeSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateShoeSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const shoeSize = new ShoeSizeModel(request.body);
      const updatedShoeSize = await shoeSizesService.updateShoeSize(shoeSize);
      response.json(updatedShoeSize);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteShoeSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await shoeSizesService.deleteShoeSize(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const shoeSizesController = new ShoeSizesController();
export const shoeSizesRouter = shoeSizesController.router;
