import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { SizeModel } from "../../Models/SizeModel";
import { sizesService } from "../../Services/SizesService";
import { notify } from "../../Utils/Notify";
import StringInput from "../Common/Inputs/StringInput/StringInput";
import GenericForm from "../GenericForm/GenericForm";
;

export default function AddSize(): JSX.Element {
  const { sizeType } = useParams();
  const { register, handleSubmit } = useForm<SizeModel>();
  const navigate = useNavigate();
  async function addSize(size: SizeModel) {
    try {
      size.type = sizeType;
      await sizesService.addSize(size);
      notify.success(`${size.name} has been added successfully`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <>
      <GenericForm<SizeModel>
        onSubmit={addSize}
        handleSubmit={handleSubmit}
        name={sizeType}
        mode="add"
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
