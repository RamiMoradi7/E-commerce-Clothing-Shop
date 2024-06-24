import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { useForm } from "react-hook-form";
import { AudienceModel } from "../../Models/AudienceModel";
import { audiencesService } from "../../Services/AudiencesService";
import { notify } from "../../Utils/Notify";
import GenericForm from "../GenericForm/GenericForm";
import StringInput from "../Common/Inputs/StringInput/StringInput";

export default function AddAudience(): JSX.Element {
  useTitle("Add Audience");
  const { handleSubmit, register } = useForm<AudienceModel>();
  const navigate = useNavigate();
  async function addAudience(audience: AudienceModel) {
    try {
      await audiencesService.addOne(audience);
      notify.success(`${audience.name} has been added successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={addAudience}
        mode="add"
        name="Audience"
        inputs={[
          <StringInput<AudienceModel>
            register={register}
            registerValue="name"
            label="Name"
          />,
          <StringInput<AudienceModel>
            register={register}
            registerValue="description"
            label="Description"
          />,
        ]}
      />
    </>
  );
}
