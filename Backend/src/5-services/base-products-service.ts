import { UploadedFile } from "express-fileupload";
import { FilterQuery, Model } from "mongoose";
import { imagesHandler } from "../2-utils/images-handler";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import {
  AccessoryModel,
  ClothModel,
  IAccessoryModel,
  IClothModel,
  IProductModel,
  IShoeModel,
  ProductModel,
  ShoeModel,
} from "../3-models/product-model";
import { OrderItem } from "../types/order-types/order-item";

export type ProductProps<T extends IProductModel> = {
  product: T;
  images: UploadedFile[];
};

export const populateFields = [
  "category",
  "audience",
  "brand",
  "stock.color",
  "stock.size",
  "subCategory",
];
export abstract class BaseProductsService<T extends IProductModel> {
  protected abstract model: Model<T>;

  public async getProduct(_id: string): Promise<IProductModel | null> {
    const product = await ProductModel.findById(_id)
      .populate(populateFields)
      .exec();
    console.log(product);
    return product || null;
  }
  public async addProduct({ product, images }: ProductProps<T>): Promise<T> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);

    imagesHandler.configureFileSaver(
      "1-assets",
      `${this.model.modelName.toLowerCase()}-images`
    );
    const imageNames = await imagesHandler.addImagesToImageNames(images);
    product.imageNames = imageNames;
    const savedProduct = await this.model.create(product);
    return (await this.getProduct(savedProduct._id)).toObject();
  }

  public async updateProduct({ product, images }: ProductProps<T>): Promise<T> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    imagesHandler.configureFileSaver(
      "1-assets",
      `${this.model.modelName.toLowerCase()}-images`
    );
    const newImageNames = await imagesHandler.updateImageNames<T>(
      this.model,
      product._id,
      images
    );
    product.imageNames = newImageNames;
    const updatedProduct = await this.model.findByIdAndUpdate(
      product._id,
      { $set: product },
      { new: true }
    );
    if (!updatedProduct) {
      throw new ResourceNotFoundError(product._id);
    }
    return (await this.getProduct(product._id)).toObject();
  }

  public async updateProductStock(orderItem: OrderItem): Promise<void> {
    for (const stock of orderItem.stock) {
      const updatedProductStock = await this.model.findOneAndUpdate(
        {
          _id: orderItem.productId,
            "stock._id": stock.stockId,
        },
        { $inc: { "stock.$.quantity": -stock.quantity } },
        { new: true }
      );

      if (!updatedProductStock) {
        throw new ResourceNotFoundError(orderItem.productId);
      }
    }
  }
}
export class ProductsService extends BaseProductsService<IProductModel> {
  protected model = ProductModel;
  public async getProducts(
    queryFilters?: FilterQuery<IProductModel>,
    sortValue?: string,
    page = 1
  ): Promise<{
    products: IProductModel[];
    total: number;
    currentPage: number;
    currentAmount: number;
    totalPages: number;
  }> {
    let productsQuery = this.model.find();

    if (queryFilters) {
      productsQuery = productsQuery.find(queryFilters);
    }

    if (sortValue) {
      switch (sortValue) {
        case "high-to-low":
          productsQuery = productsQuery.sort({ price: -1 });
          break;
        case "low-to-high":
          productsQuery = productsQuery.sort({ price: 1 });
          break;
      }
    }
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    const products = await productsQuery
      .skip(skip)
      .limit(itemsPerPage)
      .populate(populateFields)
      .exec();
    const total = await this.model.countDocuments(queryFilters);
    const totalPages = Math.ceil(total / itemsPerPage);
    const currentAmount = products.length;
    return { products, total, currentPage: page, currentAmount, totalPages };
  }

  public async deleteProduct(_id: string): Promise<void> {
    const productToDelete = await this.model.findByIdAndDelete(_id);
    if (!productToDelete) {
      throw new ResourceNotFoundError(_id);
    }

    await imagesHandler.deleteImageNames(productToDelete.imageNames);
  }
}
export const productsService = new ProductsService();

export class ClothesService extends BaseProductsService<IClothModel> {
  protected model = ClothModel;
}
export const clothesService = new ClothesService();

export class ShoesService extends BaseProductsService<IShoeModel> {
  protected model = ShoeModel;
}
export const shoesService = new ShoesService();

export class AccessoriesService extends BaseProductsService<IAccessoryModel> {
  protected model = AccessoryModel;
}
export const accessoriesService = new AccessoriesService();
