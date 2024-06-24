import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { categoriesService } from "../../../Services/CategoriesService";
import { useFetch } from "../../../hooks/useFetch";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import Loader from "../../Common/Loader/Loader";
import { CategoryModel } from "../../../Models/CategoryModel";

export default function Categories(): JSX.Element {
  const { isLoading } = useFetch(categoriesService.getAll);
  const categories = useSelector<AppState, CategoryModel[]>(
    (appState) => appState.categories
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Categories
          </h2>
          <AddButton title="Category" identifier="categories" />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="group flex flex-col items-center justify-center"
            >
              <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 mb-2">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:opacity-75"
                />
              </div>
              <h3 className="text-sm text-gray-700">{category.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <EditButton _id={category._id} identifier="categories" />
                <DeleteButton
                  _id={category._id}
                  name={category.name}
                  fnQuery={categoriesService.deleteOne}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
