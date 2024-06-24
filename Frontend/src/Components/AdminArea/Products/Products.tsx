import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { ProductsState, productActions } from "../../../Redux/ProductsSlice";
import { appStore } from "../../../Redux/Store";
import { categoriesService } from "../../../Services/CategoriesService";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import { useFetch } from "../../../hooks/useFetch";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import ImageCarousel from "../../Common/ImageCarousels/ImageCarousel";
import Loader from "../../Common/Loader/Loader";
import AdminPagination from "./Pagination/AdminPagination";

export default function Products(): JSX.Element {
  const { result: categories, isLoading } = useFetch(
    categoriesService.getAll
  );

  const {
    result: { products, currentPage, totalPages },
  } = useSelector<AppState, ProductsState>((appState) => appState.result);

  async function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    try {
      const { value: categoryId } = event.target;
      if (!categoryId) return;
      const products = await productsService.getProducts({
        category: categoryId,
      });
      appStore.dispatch(productActions.initAll(products));
    } catch (err: any) {
      notify.error(err);
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex justify-between items-start">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Products
        </h2>
        <AdminPagination currentPage={currentPage} totalPages={totalPages} />
        <AddButton title="Product" identifier="products" />
      </div>
      <div className="relative flex items-center">
        <select
          defaultValue={""}
          onChange={handleCategoryChange}
          className="peer h-10 w-72 rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm text-blue-gray-700 outline-none focus:border-gray-900 focus:outline-none"
        >
          <option value={""} disabled>
            Select Category
          </option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="absolute left-3 text-[11px] text-blue-gray-400 pointer-events-none transition-all bottom-8">
          Select a Category
        </label>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          {products &&
            products?.map((p) => (
              <div
                key={p._id}
                className="flex flex-col justify-between rounded-md bg-gray-200 overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <ImageCarousel imageUrls={p.imageUrls} />
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-gray-700 mb-1">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <EditButton identifier="products" _id={p._id} />
                    <DeleteButton
                      _id={p._id}
                      name={p.name}
                      fnQuery={productsService.deleteProduct}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
