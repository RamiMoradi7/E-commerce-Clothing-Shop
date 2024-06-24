import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import {
  ISubCategoryModel,
  SubCategoryModel,
} from "../3-models/sub-category-model";
import { subCategoriesService } from "../5-services/sub-categories-service";

class SubCategoriesController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/sub-categories", this.getSubCategories);
    this.router.get(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.getSubCategory
    );
    this.router.post("/sub-categories", this.addSubCategory);
    this.router.put(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.updateSubCategory
    );
    this.router.delete(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.deleteSubCategory
    );
  }
  private async getSubCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subCategories = await subCategoriesService.getSubCategories();
      response.json(subCategories);
    } catch (err: any) {
      next(err);
    }
  }
  private async getSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const subCategory = await subCategoriesService.getSubCategory(_id);
      response.json(subCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async addSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const addedSubCategories =
        await subCategoriesService.addMultipleSubCategories(request.body);
      response.status(StatusCode.Created).json(addedSubCategories);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const subCategory = new SubCategoryModel(request.body);
      const updatedSubCategory = await subCategoriesService.updateSubCategory(
        subCategory
      );
      response.json(updatedSubCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await subCategoriesService.deleteSubCategory(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const subCategoriesController = new SubCategoriesController();
export const subCategoriesRouter = subCategoriesController.router;
