import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import Loader from "../Common/Loader/Loader";
import GenericForm from "../GenericForm/GenericForm";

export default function EditProduct(): JSX.Element {
  useTitle("Edit Product");
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<ProductModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const { _id } = useParams();

  const { handleCategoryChange, selectedCategory, sizes } = useCategoryChange();

  const { stock, setStock, handleStockChange, addToStock, removeFromStock } =
    useStockChange();

  const { handleImageChange, imageUrls, setImageUrls, imageFiles } =
    useImagesChange();
  const navigate = useNavigate();

  useEffect(() => {
    productsService
      .getProduct(_id)
      .then((product) => {
        Object.entries(product).forEach(([key, value]) => {
          setValue(key as keyof ProductModel, value, { shouldValidate: true });
        });
        setImageUrls(product.imageUrls);
        setStock(product.stock);
        handleCategoryChange(product.category);
        setLoading(false);
      })
      .catch((err: any) => {
        notify.error(err);
        setLoading(false);
      });
  }, [setValue, _id, setImageUrls, handleCategoryChange, setStock]);

  if (loading) {
    return <Loader />;
  }

  async function updateProduct(product: ProductModel) {
    try {
      product._id = _id;
      if (imageFiles) {
        product.images = imageFiles;
      }
      const productStock = stock.map((s) => {
        const { _id, ...rest } = s;
        return rest;
      });
      product.stock = productStock;
      await productsService.updateProduct(product);
      notify.success(`${product.name} has been updated successfully.`);
      navigate(`/products?name=${product.name}`);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={updateProduct}
        mode="edit"
        name={getValues("name")}
        isSubmitting={isSubmitting}
        inputs={[
          <SelectInput<ProductModel, AudienceModel>
            register={register}
            defaultValue={getValues("audienceId")}
            registerValue={"audienceId"}
            fnQuery={audiencesService.getAll}
            label="Audiences"
            name="Audience"
          />,
          <SelectInput<ProductModel, CategoryModel>
            register={register}
            onValueChange={handleCategoryChange}
            fnQuery={categoriesService.getAll}
            defaultValue={getValues("categoryId")}
            registerValue="categoryId"
            label="Categories"
            name="Category"
            disabled={true}
          />,
          <SelectInput<ProductModel, SubCategoryModel>
            register={register}
            defaultValue={getValues("subCategoryId")}
            registerValue="subCategoryId"
            fnQuery={() =>
              categoriesService.getSubCategoriesByCategory(
                getValues("categoryId")
              )
            }
            label="Subordinate Categories"
            name="SubCategory"
          />,
          <SelectInput<ProductModel, BrandModel>
            register={register}
            defaultValue={getValues("brandId")}
            fnQuery={brandsService.getAll}
            registerValue="brandId"
            label="Brands"
            name="Brand"
          />,
          <StringInput register={register} registerValue="name" label="Name" />,
          <StringInput
            register={register}
            registerValue="description"
            label="Description"
            large
          />,
          <NumberInput
            register={register}
            registerValue="price"
            label="Price"
            name="Price"
          />,
          <NumberInput
            register={register}
            registerValue="discount"
            label="Discount"
            name="Discount"
          />,

          <>
            {stock.map((s, index) => (
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
                  sizesByCategory={selectedCategory && sizes}
                  onChange={(stock: Stock) => handleStockChange(stock, index)}
                  defaultValue={s}
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
            required={false}
          />,
        ]}
      />
    </>
  );
}
