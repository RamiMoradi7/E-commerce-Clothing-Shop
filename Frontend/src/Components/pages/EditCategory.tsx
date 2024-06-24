import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryModel } from "../../Models/CategoryModel";
import { SubCategoryModel } from "../../Models/SubCategoryModel";
import { categoriesService } from "../../Services/CategoriesService";
import { subCategoriesService } from "../../Services/SubCategoriesService";
import { notify } from "../../Utils/Notify";
import { useImageChange } from "../../hooks/FormHooks/useImageChange";
import { useSubCategories } from "../../hooks/FormHooks/useSubCategories";
import { useTitle } from "../../hooks/useTitle";
import ImageInput from "../Common/Inputs/ImageInput/ImageInput";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import EditSubCategory from "../EditSubCategory/EditSubCategory";
import GenericForm from "../GenericForm/GenericForm";

export default function EditCategory(): JSX.Element {
  useTitle("Edit Category");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<CategoryModel>();
  const { _id } = useParams();
  const { handleImageChange, imageUrl, setImageUrl, imageFile } =
    useImageChange();

  const [editModalOpenForSubcategory, setEditModalOpenForSubcategory] =
    useState<string | null>(null);

  const [initialSubCategories, setInitialSubCategories] = useState<
    SubCategoryModel[]
  >([]);

  const {
    subCategories,
    handleUpdateSubCategoryValue,
    addSubCategory,
    removeSubCategory,
  } = useSubCategories();

  useEffect(() => {
    categoriesService.getOne(_id).then((category) => {
      setValue("name", category.name);
      setValue("description", category.description);
      setValue("subCategories", category.subCategories);
      setInitialSubCategories(category.subCategories);
      setImageUrl(category.imageUrl);
    });
  }, [_id, setValue, setImageUrl]);

  const handleSubCategoryUpdated = (updatedSubCategory: SubCategoryModel) => {
    const updatedSubCategories = initialSubCategories.map((subCategory) =>
      subCategory._id === updatedSubCategory._id
        ? updatedSubCategory
        : subCategory
    );
    setInitialSubCategories(updatedSubCategories);
    setValue("subCategories", updatedSubCategories);
  };

  async function editCategory(category: CategoryModel) {
    try {
      if (imageFile) {
        category.image = imageFile;
      }
      const addedNewSubCategories = await subCategoriesService.addSubCategory(
        subCategories
      );
      category.subCategories = [
        ...initialSubCategories,
        ...addedNewSubCategories,
      ];
      category._id = _id;
      await categoriesService.updateOne(category);
      notify.success(`${category.name} has been updated successfully`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  const toggleEditModal = (subCategoryId: string) => {
    setEditModalOpenForSubcategory((prev) =>
      prev === subCategoryId ? null : subCategoryId
    );
  };
  const onClose = () => {
    setEditModalOpenForSubcategory(null);
  };

  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={editCategory}
        name={getValues("name")}
        isSubmitting={isSubmitting}
        mode="edit"
        inputs={[
          <StringInput<CategoryModel>
            key="name"
            register={register}
            registerValue="name"
            name="Name"
          />,
          <StringInput<CategoryModel>
            key="description"
            register={register}
            registerValue="description"
            name="Description"
            large
          />,
          initialSubCategories?.map((subCategory, index) => (
            <div key={index} className="flex items-center mb-4">
              <p className="mr-4 text-sm font-semibold">
                Subcategory #{index + 1}
              </p>
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-300"
                onClick={() => {
                  removeSubCategory(index);
                  setInitialSubCategories(
                    initialSubCategories.filter(
                      (sub) => sub._id !== subCategory._id
                    )
                  );
                }}
              >
                X
              </button>
              <Button
                placeholder={""}
                className="ml-4 flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-300"
                onClick={() => toggleEditModal(subCategory._id)}
                variant="text"
              >
                Edit
              </Button>
              <div className="ml-4">
                <StringInput<CategoryModel>
                  key={subCategory._id}
                  register={register}
                  onChange={(e) =>
                    handleUpdateSubCategoryValue(e, subCategory.name)
                  }
                  registerValue={`subCategories[${index}].name`}
                  disabled={editModalOpenForSubcategory !== subCategory._id}
                />
              </div>
              {editModalOpenForSubcategory === subCategory._id && (
                <EditSubCategory
                  key={`edit-${subCategory._id}`}
                  subCategory={subCategory}
                  open={true}
                  onClose={onClose}
                  handleSubCategoryUpdated={handleSubCategoryUpdated}
                />
              )}
            </div>
          )),
          subCategories?.map((subCategory, index) => (
            <div key={index} className="flex items-center">
              <StringInput<CategoryModel>
                register={register}
                onChange={(e) => {
                  handleUpdateSubCategoryValue(e, subCategory.name);
                }}
                name={`Subcategory #${index + 1 + initialSubCategories.length}`}
              />
              <button
                onClick={() => removeSubCategory(index)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition duration-300"
              >
                X
              </button>
            </div>
          )),
          <button
            onClick={addSubCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            + Add Sub-Category
          </button>,
          <ImageInput
            register={register}
            registerName="image"
            onImageChange={handleImageChange}
            imageUrl={imageUrl}
            required={false}
          />,
        ]}
      />
    </>
  );
}
