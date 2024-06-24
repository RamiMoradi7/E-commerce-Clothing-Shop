import express, { NextFunction, Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { imagesHandler } from "../2-utils/images-handler";
import { StatusCode } from "../3-models/enums";
import {
  AccessoryModel,
  ClothModel,
  IProductModel,
  IStock,
  ShoeModel,
} from "../3-models/product-model";
import {
  accessoriesService,
  clothesService,
  productsService,
  shoesService,
} from "../5-services/base-products-service";
import { categoriesService } from "../5-services/categories-service";
export type ProductFilter = {
  _id?: string;
  category?: string;
  categoryName?: string;
  color?: string;
  size?: string;
  name?: string;
  audience?: string;
  brand?: string;
  subCategory?: string;
  priceSort?: string;
};

class ProductsController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/products", this.getProducts);
    this.router.get("/products/:_id([a-f0-9A-F]{24})", this.getProduct);
    this.router.post("/products", this.addProduct);
    this.router.put("/products/:_id([a-f0-9A-F]{24})", this.updateProduct);
    this.router.delete("/products/:_id([a-f0-9A-F]{24})", this.deleteProduct);
    this.router.get(
      "/products/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }

  public async getProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        category,
        categoryName,
        color,
        size,
        name,
        _id,
        audience,
        brand,
        subCategory,
        price,
        priceSort,
        page,
      } = request.query;
      const queryFilters: FilterQuery<ProductFilter> = {};
      if (category) {
        queryFilters.categoryId = category;
      }
      if (categoryName) {
        const category = await categoriesService.getCategoryByName(
          categoryName as string
        );
        queryFilters.categoryName = category?.name;
      }

      if (name) {
        queryFilters.name = { $regex: new RegExp(name as string, "i") };
      }
      if (_id) {
        queryFilters._id = _id;
      }
      if (audience) {
        queryFilters.audienceId = audience;
      }
      if (brand) {
        queryFilters.brandId = brand;
      }
      if (subCategory) {
        queryFilters.subCategoryId = subCategory;
      }
      if (price) {
        const maxPrice = parseInt(price as string);
        queryFilters.price = { $lte: maxPrice };
      }
      if (color) {
        Array.isArray(color)
          ? (queryFilters["stock.color"] = { $in: color })
          : (queryFilters["stock.color"] = color);
      }
      if (size) {
        Array.isArray(size)
          ? (queryFilters["stock.size"] = { $in: size })
          : (queryFilters["stock.size"] = size);
      }
      const pageNumber = parseInt(page as string, 10) || 1;

      const products = await productsService.getProducts(
        queryFilters,
        priceSort as string,
        pageNumber
      );

      response.json(products);
    } catch (error) {
      next(error);
    }
  }
  private async getProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const product = await productsService.getProduct(_id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }

  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imagesArray = await imagesHandler.extractImagesFromRequest(request);
      const { categoryId } = request.body;
      const category = await categoriesService.getCategory(categoryId);
      let product: IProductModel;
      const stockBody: IStock[] = JSON.parse(request.body.stock);

      switch (category.name.toLowerCase()) {
        case "clothing":
          product = await clothesService.addProduct({
            product: new ClothModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        case "footwear":
          product = await shoesService.addProduct({
            product: new ShoeModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        case "accessories and equipment":
          product = await accessoriesService.addProduct({
            product: new AccessoryModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        default:
          throw new Error("Invalid category");
      }

      response.status(StatusCode.Created).json(product);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imagesArray =
        request.files !== null
          ? await imagesHandler.extractImagesFromRequest(request)
          : [];
      const { _id } = request.params;
      const { categoryId } = request.body;
      const category = await categoriesService.getCategory(categoryId);
      const stockBody: IStock[] = JSON.parse(request.body.stock);
      request.body._id = _id;
      let product: IProductModel;
      switch (category?.name.toLowerCase()) {
        case "clothing":
          product = await clothesService.updateProduct({
            product: new ClothModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        case "footwear":
          product = await shoesService.updateProduct({
            product: new ShoeModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        case "accessories and equipment":
          product = await accessoriesService.updateProduct({
            product: new AccessoryModel({ ...request.body, stock: stockBody }),
            images: imagesArray,
          });
          break;
        default:
          throw new Error("Invalid category");
      }

      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await productsService.deleteProduct(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const productsController = new ProductsController();
export const productsRouter = productsController.router;
