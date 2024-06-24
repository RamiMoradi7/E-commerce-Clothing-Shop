import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BrandModel } from "../../Models/BrandModel";
import { brandsService } from "../../Services/BrandsService";
import { notify } from "../../Utils/Notify";
import { useImageChange } from "../../hooks/FormHooks/useImageChange";
import { useTitle } from "../../hooks/useTitle";
import ImageInput from "../Common/Inputs/ImageInput/ImageInput";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function AddBrand(): JSX.Element {
  useTitle("Add Brand");
  const { handleSubmit, register } = useForm<BrandModel>();
  const navigate = useNavigate();
  const { handleImageChange, imageUrl, imageFile } = useImageChange();
  async function addBrand(brand: BrandModel) {
    try {
      debugger;
      brand.image = imageFile;
      await brandsService.addOne(brand);
      notify.success(`${brand.name} has been added successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <GenericForm
      handleSubmit={handleSubmit}
      onSubmit={addBrand}
      mode="add"
      name="Brand"
      inputs={[
        <StringInput<BrandModel>
          register={register}
          registerValue="name"
          label="Name"
        />,
        <ImageInput<BrandModel>
          register={register}
          onImageChange={handleImageChange}
          imageUrl={imageUrl}
          registerName="image"
          required={true}
        />,
      ]}
    />
  );
}
