import { colorsService } from "../../../Services/ColorsService";
import { useFetch } from "../../../hooks/useFetch";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import Loader from "../../Common/Loader/Loader";

export default function Colors(): JSX.Element {
  const { result: colors, isLoading } = useFetch(colorsService.getColors);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-white">
        <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xl lg:px-2 flex justify-between items-start">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Colors
          </h2>

          <AddButton title="Color" identifier="colors" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {colors?.map((c) => (
              <div
                key={c._id}
                className="w-44 h-22 gap-4 font-semibold border  text-center rounded-3xl  shadow-lg max-w-lg"
                style={{ backgroundColor: `${c.hex}80` }}
              >
                <div className="flex justify-between items-center mt-4">
                  <EditButton identifier="colors" _id={c._id} />
                  <DeleteButton
                    _id={c._id}
                    name={c.name}
                    fnQuery={colorsService.deleteColor}
                  />
                </div>
                <p className="text-xs text-gray-800 mt-4 overflow-hidden overflow-y-auto  max-h-32">
                  {c.hex}
                </p>
                <h1 className="text-lg text-gray-700">{c.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
