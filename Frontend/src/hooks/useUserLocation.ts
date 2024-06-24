import _ from "lodash";
import { useEffect } from "react";
import { productActions } from "../Redux/ProductsSlice";
import { appStore } from "../Redux/Store";
import { productsService } from "../Services/ProductsService";
import { notify } from "../Utils/Notify";
import useExtractSearchParams from "./useExtractSearchParams";
export default function useUserLocation() {
  const searchParams = useExtractSearchParams();
  const {
    audience: audienceId,
    category: categoryId,
    subCategory: subCategoryId,
    brand: brandId,
    _id: productId,
    name,
    price,
    color,
    size,
    priceSort,
    page,
  } = searchParams;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productsService.getProducts({
          page,
          audience: audienceId,
          category: categoryId,
          subCategory: subCategoryId,
          brand: brandId,
          _id: productId,
          name,
          price,
          size,
          color,
          priceSort,
        });
        appStore.dispatch(productActions.initAll(products));
      } catch (err: any) {
        notify.error(err);
      }
    };
    const debouncedFetchProducts = _.debounce(fetchProducts, 500);

    debouncedFetchProducts();
  }, [
    audienceId,
    categoryId,
    subCategoryId,
    brandId,
    productId,
    name,
    price,
    color,
    size,
    priceSort,
    page,
  ]);
}
