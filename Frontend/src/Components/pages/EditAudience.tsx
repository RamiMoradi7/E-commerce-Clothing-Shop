import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { AudienceModel } from "../../Models/AudienceModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { audiencesService } from "../../Services/AudiencesService";
import { notify } from "../../Utils/Notify";
import GenericForm from "../GenericForm/GenericForm";
import StringInput from "../Common/Inputs/StringInput/StringInput";


export default function EditAudience(): JSX.Element {
  useTitle("Edit Audience");
  const { register, handleSubmit, setValue } = useForm<AudienceModel>();
  const { _id } = useParams();
  const [audience, setAudience] = useState<AudienceModel | null>(null);
  const navigate = useNavigate();
  async function editAudience(audience: AudienceModel) {
    try {
      debugger;
      audience._id = _id;
      await audiencesService.updateOne(audience);
      notify.success(`${audience.name} has been updated successfully.`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  useEffect(() => {
    audiencesService
      .getOne(_id)
      .then((audience) => {
        setAudience(audience);
        setValue("name", audience.name);
        setValue("description", audience.description);
      })
      .catch((err: any) => notify.error(err));
  }, [setValue, _id]);

  return (
    <>
      <GenericForm
        handleSubmit={handleSubmit}
        onSubmit={editAudience}
        mode="edit"
        name={audience && audience.name}
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
