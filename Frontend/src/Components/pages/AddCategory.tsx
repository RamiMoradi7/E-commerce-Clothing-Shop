import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { CategoryModel } from "../../Models/CategoryModel";
import { categoriesService } from "../../Services/CategoriesService";
import { subCategoriesService } from "../../Services/SubCategoriesService";
import { notify } from "../../Utils/Notify";
import { useImageChange } from "../../hooks/FormHooks/useImageChange";
import { useSubCategories } from "../../hooks/FormHooks/useSubCategories";
import ImageInput from "../Common/Inputs/ImageInput/ImageInput";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function AddCategory(): JSX.Element {
  useTitle("Add Category");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CategoryModel>();
  const { handleImageChange, imageUrl, imageFile } = useImageChange();
  const {
    subCategories,
    addSubCategory,
    removeSubCategory,
    handleUpdateSubCategoryValue,
  } = useSubCategories();

  async function addCategory(category: CategoryModel) {
    try {
      const addedSubCategories = await subCategoriesService.addSubCategory(
        subCategories
      );
      category.subCategories = addedSubCategories;
      category.image = imageFile;
      await categoriesService.addOne(category);
      notify.success(`Category ${category?.name} has been added successfully`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={addCategory}
        name="Category"
        mode="add"
        inputs={[
          <StringInput<CategoryModel>
            register={register}
            registerValue="name"
            label="Name"
          />,
          <StringInput<CategoryModel>
            register={register}
            registerValue="description"
            label="Description"
          />,
          subCategories.map((subCategory, index) => (
            <div key={index} className="flex items-center gap-4">
              <StringInput<CategoryModel>
                key={subCategory._id}
                register={register}
                onChange={(e) =>
                  handleUpdateSubCategoryValue(e, subCategory.name)
                }
                label={`Subcategory #${index + 1}`}
              />
              <Button
                className=""
                placeholder={""}
                onClick={() => removeSubCategory(index)}
                variant="text"
              >
                X
              </Button>
            </div>
          )),
          <Button
            className=""
            placeholder={""}
            onClick={addSubCategory}
            variant="text"
          >
            + Add Sub Category
          </Button>,
          <ImageInput<CategoryModel>
            register={register}
            registerName="image"
            onImageChange={handleImageChange}
            imageUrl={imageUrl}
            required={true}
          />,
        ]}
      />
    </>
  );
}
