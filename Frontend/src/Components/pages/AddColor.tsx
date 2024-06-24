import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ColorModel } from "../../Models/ColorModel";
import { colorsService } from "../../Services/ColorsService";
import { notify } from "../../Utils/Notify";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";

export default function AddColor(): JSX.Element {
  const { register, handleSubmit } = useForm<ColorModel>();
  const navigate = useNavigate();
  async function addColor(color: ColorModel) {
    try {
      await colorsService.addColor(color);
      notify.success(`${color.name} has been added to Colors successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <>
      <GenericForm<ColorModel>
        handleSubmit={handleSubmit}
        onSubmit={addColor}
        mode="add"
        name="Color"
        inputs={[
          <StringInput<ColorModel>
            register={register}
            registerValue="name"
            label="Name"
          />,
          <StringInput<ColorModel>
            register={register}
            registerValue="hex"
            label="Hex Code"
          />,
        ]}
      />
    </>
  );
}
