import { AppState } from "../../../Redux/AppState";
import { brandsService } from "../../../Services/BrandsService";
import { useFetch } from "../../../hooks/useFetch";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import Loader from "../../Common/Loader/Loader";

export default function Brands(): JSX.Element {
  const { result: brands, isLoading } = useFetch(
    brandsService.getAll,
    (appState: AppState) => appState.brands
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Brands
            </h2>
            <AddButton title="Brand" identifier="brands" />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {brands?.map((brand) => (
              <div
                key={brand._id}
                className="group flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-center mt-2 w-full px-4">
                  <EditButton _id={brand._id} identifier="brands" />
                  <DeleteButton
                    _id={brand._id}
                    name={brand.name}
                    fnQuery={brandsService.deleteOne}
                  />
                </div>
                <div className="aspect-w-2 h-50 w-3/4 overflow-hidden rounded-lg mb-2">
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="object-cover w-full h-full group-hover:opacity-75"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
