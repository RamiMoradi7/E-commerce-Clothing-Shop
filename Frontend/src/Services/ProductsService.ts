import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { ProductsResponse, productActions } from "../Redux/ProductsSlice";
import { appStore } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";

export interface GetProductsProps {
  page?: string;
  category?: string;
  color?: string | string[];
  size?: string | string[];
  name?: string;
  _id?: string;
  audience?: string;
  brand?: string;
  subCategory?: string;
  price?: string;
  priceSort?: string;
}

class ProductsService {
  public async getProducts(
    filters: GetProductsProps
  ): Promise<ProductsResponse> {
    
    const baseUrl = `${appConfig.productsUrl}?${this.constructQueryParams(
      filters
    ).toString()}`;

    const response = await axios.get<ProductsResponse>(baseUrl);
    const { currentPage, products, total, currentAmount, totalPages } =
      response.data;

    return { currentPage, products, total, currentAmount, totalPages };
  }

  public constructQueryParams(filters: GetProductsProps) {
    const params = new URLSearchParams();
    const {
      audience,
      category,
      subCategory,
      brand,
      _id,
      name,
      price,
      size,
      color,
      priceSort,
      page,
    } = filters;
    if (audience) {
      params.append("audience", audience);
    }
    if (category) {
      params.append("category", category);
    }
    if (subCategory) {
      params.append("subCategory", subCategory);
    }
    if (brand) {
      params.append("brand", brand);
    }
    if (_id) {
      params.append("_id", _id);
    }
    if (name) {
      params.append("name", name);
    }
    if (price) {
      params.append("price", price);
    }
    if (size) {
      Array.isArray(size)
        ? size.forEach((size) => params.append("size", size))
        : params.append("size", size);
    }
    if (color) {
      Array.isArray(color)
        ? color.forEach((color) => params.append("color", color))
        : params.append("color", color);
    }
    if (priceSort) {
      params.append("priceSort", priceSort);
    }
    if (page) {
      params.append("page", page);
    }

    return params;
  }

  public async getProduct(_id: string): Promise<ProductModel> {
    const response = await axios.get<ProductModel>(
      appConfig.productsUrl + "/" + _id
    );
    const product = response.data;
    return product;
  }
  public async addProduct(product: any): Promise<void> {
    const formData = this.convertDataToFormData(product);
    const response = await axios.post<ProductModel>(
      appConfig.productsUrl,
      formData,
      appConfig.axiosOptions
    );
    const addedProduct = response.data;
    console.log(addedProduct);
  }
  public async updateProduct(product: ProductModel): Promise<void> {
    const formData = this.convertDataToFormData(product);
    const response = await axios.put<ProductModel>(
      appConfig.productsUrl + "/" + product._id,
      formData,
      appConfig.axiosOptions
    );
    const updatedProduct = response.data;
    appStore.dispatch(
      productActions.updateProduct(await this.getProduct(updatedProduct._id))
    );
  }
  public async deleteProduct(_id: string): Promise<void> {
    await axios.delete<ProductModel>(appConfig.productsUrl + "/" + _id);
    appStore.dispatch(productActions.deleteProduct(_id));
  }
  private convertDataToFormData(product: ProductModel): FormData {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", JSON.stringify(product.stock));
    formData.append("description", product.description);
    formData.append("discount", product.discount.toString());
    formData.append("audienceId", product.audienceId);
    formData.append("categoryId", product.categoryId);
    formData.append("subCategoryId", product.subCategoryId);
    formData.append("brandId", product.brandId);
    Array.from(product.images).forEach((image) => {
      formData.append(`images`, image);
    });

    return formData;
  }
}

export const productsService = new ProductsService();
