import { CloudUploadSharp } from "@mui/icons-material";
import { FormLabel, Input } from "@mui/material";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import "../ImagesInput/ImagesInput.css";
interface ImagesInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  registerName: string;
  imageUrl?: string;
  required?: boolean;
}

export default function ImageInput<T>({
  onImageChange,
  imageUrl,
  required,
}: ImagesInputProps<T>) {
  const isSelected = !!imageUrl;

  return (
    <>
      <FormLabel htmlFor="image-upload" className="upload-label">
        <CloudUploadSharp className="upload-icon" />
        {isSelected ? "Change" : "Upload"}
      </FormLabel>
      <div className="image-container">
        {imageUrl && (
          <>
            <img width={220} src={imageUrl} alt={imageUrl} />
          </>
        )}

        <div className="image-input-container">
          <Input
            type="file"
            id="image-upload"
            name="image"
            onChange={onImageChange}
            autoFocus
            style={{ display: "none" }}
            required={required}
          />
        </div>
      </div>
    </>
  );
}
