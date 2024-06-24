import { GetProductsProps, productsService } from "../Services/ProductsService";
export const constructProductUrl = (filterOptions: GetProductsProps) => {
  const {
    audience,
    category,
    subCategory,
    brand,
    name,
    price,
    color,
    size,
    priceSort,
  } = filterOptions;

  const filters = productsService.constructQueryParams({
    audience,
    category,
    subCategory,
    brand,
    name,
    price,
    color,
    size,
    priceSort,
  });

  return "/products?" + filters;
};
