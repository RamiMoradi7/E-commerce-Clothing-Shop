import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AudienceModel } from "../../Models/AudienceModel";
import { BrandModel } from "../../Models/BrandModel";
import { CategoryModel } from "../../Models/CategoryModel";
import { ProductModel } from "../../Models/ProductModel";
import { SubCategoryModel } from "../../Models/SubCategoryModel";
import { audiencesService } from "../../Services/AudiencesService";
import { brandsService } from "../../Services/BrandsService";
import { categoriesService } from "../../Services/CategoriesService";
import { productsService } from "../../Services/ProductsService";
import { notify } from "../../Utils/Notify";
import { useCategoryChange } from "../../hooks/FormHooks/useCategoryChange";
import { useImagesChange } from "../../hooks/FormHooks/useImagesChange";
import { useStockChange } from "../../hooks/FormHooks/useStockChange";
import { useTitle } from "../../hooks/useTitle";
import { Stock } from "../../types/Stock";
import ImagesInput from "../Common/Inputs/ImagesInput/ImagesInput";
import NumberInput from "../Common/Inputs/NumberInput/NumberInput";
import SelectInput from "../Common/Inputs/SelectInput/SelectInput";
import StockInput from "../Common/Inputs/StockInput/StockInput";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function AddProduct(): JSX.Element {
  useTitle("Add Product");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductModel>();
  const { handleCategoryChange, selectedCategory, sizes } = useCategoryChange();
  const { handleImageChange, imageUrls, imageFiles } = useImagesChange();
  const { stock, handleStockChange, addToStock, removeFromStock } =
    useStockChange();
  async function addProduct(product: ProductModel) {
    try {
      product.images = imageFiles;
      product.stock = stock;
      await productsService.addProduct(product);
      notify.success(`${product.name} has been added successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={addProduct}
        mode="add"
        name="Product"
        isSubmitting={isSubmitting}
        inputs={[
          <SelectInput<ProductModel, AudienceModel>
            register={register}
            fnQuery={audiencesService.getAll}
            registerValue="audienceId"
            label="Audiences"
            name="Audience"
            required
          />,
          <SelectInput<ProductModel, CategoryModel>
            register={register}
            onValueChange={handleCategoryChange}
            registerValue="categoryId"
            label="Categories"
            fnQuery={categoriesService.getAll}
            name="Category"
            required
          />,
          <SelectInput<ProductModel, SubCategoryModel>
            register={register}
            fnQuery={() =>
              selectedCategory &&
              categoriesService.getSubCategoriesByCategory(
                selectedCategory?._id
              )
            }
            registerValue="subCategoryId"
            label="Subordinate Categories"
            name="Sub Categories"
            disabled={!selectedCategory}
            required
          />,
          <SelectInput<ProductModel, BrandModel>
            register={register}
            registerValue="brandId"
            fnQuery={brandsService.getAll}
            label="Brands"
            name="Brand"
            required
          />,
          <StringInput register={register} registerValue="name" label="Name" />,
          <StringInput<ProductModel>
            register={register}
            registerValue="description"
            label="Description"
            large
          />,
          <NumberInput
            register={register}
            registerValue="price"
            label="Price"
            name="price"
          />,
          <NumberInput
            register={register}
            registerValue="discount"
            label="Discount"
            name="Discount"
          />,
          <>
            {stock.map((_, index) => (
              <div key={index}>
                {stock.length === 1 ? (
                  ""
                ) : (
                  <Button
                    className="py-0 px-1 text-xs"
                    placeholder={"Remove from Stock"}
                    onClick={() => removeFromStock(index)}
                  >
                    X
                  </Button>
                )}
                <StockInput
                  disabled={!selectedCategory}
                  sizesByCategory={sizes}
                  onChange={(stock: Stock) => handleStockChange(stock, index)}
                />
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                className="py-0 px-1 text-xs"
                placeholder={"Add Stock"}
                onClick={() => addToStock()}
              >
                + Stock Option
              </Button>
            </div>
          </>,

          <ImagesInput
            register={register}
            onChange={handleImageChange}
            imageUrls={imageUrls}
            required={true}
          />,
        ]}
      />
    </>
  );
}
