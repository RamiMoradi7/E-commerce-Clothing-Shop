import { useState } from "react";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import "./Sizes.css";
import { useFetch } from "../../../hooks/useFetch";
import { sizesService } from "../../../Services/SizesService";
import Loader from "../../Common/Loader/Loader";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";

export default function Sizes(): JSX.Element {
  const [selectedSizeType, setSelectedSizeType] = useState("Cloth");
  const { result: sizes, isLoading } = useFetch(
    selectedSizeType === "Shoe"
      ? sizesService.getShoeSizes
      : sizesService.getSizes
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xl lg:px-2 flex justify-between items-start">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Sizes
        </h2>

        <AddButton
          title={`${selectedSizeType} Size`}
          identifier={`${selectedSizeType}-Size`}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="radio-inputs flex justify-center mb-8">
          <label className="radio">
            <input
              type="radio"
              name="radio"
              onChange={() => setSelectedSizeType("Shoe")}
              checked={selectedSizeType === "Shoe"}
            />
            <span className="name">Shoe Sizes</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              onChange={() => setSelectedSizeType("Cloth")}
              checked={selectedSizeType === "Cloth"}
            />
            <span className="name">Cloth Sizes</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              onChange={() => setSelectedSizeType("Accessory")}
              checked={selectedSizeType === "Accessory"}
            />
            <span className="name">Accessories Sizes</span>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sizes?.map((s) => (
            <div
              key={s._id}
              className="w-44 h-22 gap-4  bg-white font-semibold text-center rounded-3xl border shadow-lg  max-w-lg"
            >
              <div className="flex justify-between items-center mt-4">
                <EditButton
                  identifier={`${selectedSizeType.toLowerCase()}-size`}
                  _id={s._id}
                />
                <DeleteButton
                  _id={s._id}
                  name={s.name}
                  fnQuery={
                    s.type.startsWith("Shoe")
                      ? sizesService.deleteShoeSize
                      : sizesService.deleteClothSize
                  }
                />
              </div>
              <h1 className="text-lg text-gray-700">{s.name.toUpperCase()}</h1>
              <p className="text-xs text-gray-800 mt-4 overflow-hidden overflow-y-auto  max-h-32"></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
