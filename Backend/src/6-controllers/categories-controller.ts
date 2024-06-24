import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";
import { imagesHandler } from "../2-utils/images-handler";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { StatusCode } from "../3-models/enums";
import { categoriesService } from "../5-services/categories-service";

class CategoriesController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/categories", this.getCategories);
    this.router.get("/categories/:_id([a-f0-9A-F]{24})", this.getCategory);
    this.router.get(
      "/sub-categories-by-category/:_id([a-f0-9A-F]{24})",
      this.getSubCategoriesByCategory
    );
    this.router.post("/categories", this.addCategory);
    this.router.put("/categories/:_id([a-f0-9A-F]{24})", this.updateCategory);
    this.router.delete(
      "/categories/:_id([a-f0-9A-F]{24})",
      this.deleteCategory
    );
    this.router.get(
      "/products/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }
  private async getCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.query;
      const queryFilters: FilterQuery<ICategoryModel> = {};
      if (_id) {
        queryFilters.subCategories = await CategoryModel.findById(_id).select(
          "subCategories"
        );
      }

      const categories = await categoriesService.getCategories(queryFilters);
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
  private async getCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const category = await categoriesService.getCategory(_id);
      response.json(category);
    } catch (err: any) {
      next(err);
    }
  }
  private async getSubCategoriesByCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const subCategories = await categoriesService.getSubCategoriesByCategory(
        _id
      );
      response.json(subCategories);
    } catch (err: any) {
      next(err);
    }
  }
  private async addCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = new CategoryModel(request.body);
      const addedCategory = await categoriesService.addCategory({
        category,
        image: request.files?.image as UploadedFile,
      });
      response.status(StatusCode.Created).json(addedCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const category = new CategoryModel(request.body);
      const updatedCategory = await categoriesService.updateCategory({
        category,
        image: request.files?.image as UploadedFile,
      });
      response.json(updatedCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await categoriesService.deleteCategory(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const categoriesController = new CategoriesController();
export const categoriesRouter = categoriesController.router;
