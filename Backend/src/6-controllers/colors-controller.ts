import express, { NextFunction, Request, Response } from "express";
import { ColorModel } from "../3-models/color-model";
import { StatusCode } from "../3-models/enums";
import { colorsService } from "../5-services/colors-service";

class ColorsController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/colors", this.getColors);
    this.router.get("/colors/:_id([a-f0-9A-F]{24})", this.getColor);
    this.router.post("/colors", this.addColor);
    this.router.put("/colors/:_id([a-f0-9A-F]{24})", this.updateColor);
    this.router.delete("/colors/:_id([a-f0-9A-F]{24})", this.deleteColor);
  }
  private async getColors(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const colors = await colorsService.getColors();
      response.json(colors);
    } catch (err: any) {
      next(err);
    }
  }
  private async getColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const color = await colorsService.getColor(_id);
      response.json(color);
    } catch (err: any) {
      next(err);
    }
  }
  private async addColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const color = new ColorModel(request.body);
      const addedColor = await colorsService.addColor(color);
      response.status(StatusCode.Created).json(addedColor);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const color = new ColorModel(request.body);
      const updatedColor = await colorsService.updateColor(color);
      response.json(updatedColor);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await colorsService.deleteColor(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const colorsController = new ColorsController();
export const colorsRouter = colorsController.router;
