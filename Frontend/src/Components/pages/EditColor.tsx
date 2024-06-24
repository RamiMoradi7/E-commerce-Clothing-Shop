import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ColorModel } from "../../Models/ColorModel";
import { colorsService } from "../../Services/ColorsService";
import { notify } from "../../Utils/Notify";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function EditColor(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<ColorModel>();
  const { _id } = useParams();
  const navigate = useNavigate();

  async function updateColor(color: ColorModel) {
    try {
      color._id = _id;
      await colorsService.updateColor(color);
      notify.success(`${color.name} Color has been updated successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  useEffect(() => {
    colorsService.getColor(_id).then((color) => {
      setValue("name", color?.name);
      setValue("hex", color?.hex);
    });
  }, [_id, setValue]);

  return (
    <>
      <GenericForm<ColorModel>
        handleSubmit={handleSubmit}
        onSubmit={updateColor}
        mode="edit"
        name="Color"
        inputs={[
          <StringInput<ColorModel>
            register={register}
            name="Color"
            registerValue="name"
          />,
          <StringInput<ColorModel>
            register={register}
            name="Hex Code"
            registerValue="hex"
          />,
        ]}
      />
    </>
  );
}
