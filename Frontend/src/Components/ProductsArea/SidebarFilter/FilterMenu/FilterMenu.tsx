import { useEffect, useState } from "react";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { BrandModel } from "../../../../Models/BrandModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { ColorModel } from "../../../../Models/ColorModel";
import { SizeModel } from "../../../../Models/SizeModel";
import { audiencesService } from "../../../../Services/AudiencesService";
import { brandsService } from "../../../../Services/BrandsService";
import { categoriesService } from "../../../../Services/CategoriesService";
import { colorsService } from "../../../../Services/ColorsService";
import { sizesService } from "../../../../Services/SizesService";
import { notify } from "../../../../Utils/Notify";
import useExtractSearchParams from "../../../../hooks/useExtractSearchParams";
import { useSearchNavigate } from "../../../../hooks/useSearchNavigate";
import SelectMultipleInput from "../../../Common/Inputs/SelectMultipleInput/SelectMultipleInput";
import GenericSelect from "../GenericSelect/GenericSelect";
import SubCategories from "../SubCategories/SubCategories";

export default function FilterMenu(): JSX.Element {
  const searchParams = useExtractSearchParams();
  const {
    audience: audienceId,
    category: categoryId,
    subCategory: subCategoryId,
    brand: brandId,
  } = searchParams;

  const [category, setCategory] = useState<CategoryModel>();

  useEffect(() => {
    if (categoryId) {
      categoriesService
        .getOne(categoryId)
        .then((category) => setCategory(category))
        .catch((err: any) => notify.error(err));
    }
  }, [categoryId]);

  const { setSearchParam } = useSearchNavigate();

  return (
    <section className="filter-section sm-w-full lg:w-72">
      <div className="filter-menu shadow-md rounded-lg bg-white">
        <div
          className="filter-menu-content p-4 lg:p-2"
          aria-labelledby="drawer-navigation-label"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Refine Your Search
          </h2>
          <div className="lg:max-h-96 overflow-y-auto">
            <GenericSelect<AudienceModel>
              fnQuery={audiencesService.getAll}
              label="Audience"
              setSearchParam={setSearchParam}
              searchKey="audience"
              defaultValue={audienceId}
            />
            <GenericSelect<CategoryModel>
              fnQuery={categoriesService.getAll}
              label="Category"
              defaultValue={category?._id}
              searchKey="category"
              setSearchParam={setSearchParam}
            />
            <SubCategories
              selectedCategory={category}
              defaultValue={subCategoryId}
              setSearchParam={setSearchParam}
            />
            <GenericSelect<BrandModel>
              setSearchParam={setSearchParam}
              searchKey={"brand"}
              fnQuery={brandsService.getAll}
              defaultValue={brandId}
              label="Brand"
            />
            <div className="mt-6">
              <SelectMultipleInput<SizeModel>
                label="Sizes"
                fnQuery={
                  category?.name === "Footwear"
                    ? sizesService.getShoeSizes
                    : sizesService.getSizes
                }
                searchKey="size"
                setSearchParam={setSearchParam}
              />
              <SelectMultipleInput<ColorModel>
                label="Colors"
                fnQuery={colorsService.getColors}
                searchKey="color"
                setSearchParam={setSearchParam}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
