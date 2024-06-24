import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SizeModel } from "../../Models/SizeModel";
import { sizesService } from "../../Services/SizesService";
import { notify } from "../../Utils/Notify";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function EditSize(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<SizeModel>();
  const { _id, sizeType } = useParams();
  const navigate = useNavigate();
  async function updateSize(size: SizeModel) {
    try {
      size._id = _id;
      console.log(size);
      await sizesService.updateSize(size);
      notify.success(`${size.name} has been updated successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  useEffect(() => {
    sizesService
      .getSize(_id, sizeType)
      .then((size) => {
        setValue("name", size.name);
        setValue("type", size.type);
      })
      .catch((err: any) => notify.error(err));
  }, [_id, setValue, sizeType]);

  return (
    <>
      <GenericForm<SizeModel>
        onSubmit={updateSize}
        handleSubmit={handleSubmit}
        mode="edit"
        name={"Size"}
        inputs={[
          <StringInput<SizeModel>
            register={register}
            registerValue="name"
            label="Size"
          />,
        ]}
      />
    </>
  );
}
