import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { BrandModel } from "../../Models/BrandModel";
import { brandsService } from "../../Services/BrandsService";
import { notify } from "../../Utils/Notify";
import { useImageChange } from "../../hooks/FormHooks/useImageChange";
import { useTitle } from "../../hooks/useTitle";
import ImageInput from "../Common/Inputs/ImageInput/ImageInput";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function EditBrand(): JSX.Element {
  useTitle("Edit Brand");
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const { handleSubmit, register, setValue } = useForm<BrandModel>();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { imageUrl, setImageUrl, handleImageChange, imageFile } =
    useImageChange();
  async function editBrand(brand: BrandModel) {
    try {
      if (imageFile) {
        brand.image = imageFile;
      }
      brand._id = _id;
      await brandsService.updateOne(brand);
      notify.success(`${brand.name} has been added successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  useEffect(() => {
    brandsService.getOne(_id).then((brand) => {
      setBrand(brand);
      setValue("name", brand.name);
      setImageUrl(brand.imageUrl);
    });
  }, [_id, setValue, setImageUrl]);

  return (
    <GenericForm
      handleSubmit={handleSubmit}
      onSubmit={editBrand}
      mode="edit"
      name={brand?.name}
      inputs={[
        <StringInput<BrandModel>
          register={register}
          registerValue="name"
          label="Name"
        />,
        <ImageInput<BrandModel>
          register={register}
          registerName="image"
          onImageChange={handleImageChange}
          imageUrl={imageUrl}
          required={false}
        />,
      ]}
    />
  );
}
