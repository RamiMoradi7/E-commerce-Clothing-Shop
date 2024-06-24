import { Button, Card, Typography } from "@material-tailwind/react";
import { UseFormHandleSubmit } from "react-hook-form";
import React from "react";
import { notify } from "../../Utils/Notify";

interface GenericFormProps<T> {
  onSubmit: (value: T) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<T>;
  name: string;
  mode: "add" | "edit";
  inputs: React.ReactNode[];
  isSubmitting?: boolean;
}

export default function GenericForm<T>({
  onSubmit,
  handleSubmit,
  name,
  mode,
  inputs,
  isSubmitting,
}: GenericFormProps<T>) {
  async function handleFormSubmit(value: T) {
    try {
      await onSubmit(value);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center mt-7">
      <Card
        placeholder={""}
        color="white"
        shadow={true}
        className="w-full max-w-md p-8 shadow-lg rounded-lg bg-gray-100"
      >
        <Typography
          placeholder={""}
          variant="h4"
          color="blue-gray"
          className="mb-6 bg-white font-thin border border-black px-4 py-2 rounded-lg"
        >
          {mode === "edit" ? (
            <>
              Editing <br /> {name}
            </>
          ) : (
            <>Add {name}</>
          )}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            {inputs?.map((input, i) => (
              <React.Fragment key={i}>{input}</React.Fragment>
            ))}
          </div>
          <Button
            placeholder={""}
            type="submit"
            color="blue"
            className="mt-8 w-full"
          >
            {mode === "edit" ? `Edit` : `Add`}
            {isSubmitting && "Submitting..."}
          </Button>
        </form>
      </Card>
    </div>
  );
}
