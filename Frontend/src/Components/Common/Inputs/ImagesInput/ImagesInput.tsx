import { CloudUploadSharp } from "@mui/icons-material";
import { FormLabel, Input } from "@mui/material";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import ImageCarousel from "../../ImageCarousels/ImageCarousel";
import "./ImagesInput.css";
import { ProductModel } from "../../../../Models/ProductModel";
interface ImagesInputProps {
  register: ReturnType<typeof useForm<ProductModel>>["register"];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  required?: boolean;
}

export default function ImagesInput({
  register,
  onChange,
  imageUrls,
  required,
}: ImagesInputProps) {
  const isSelected = imageUrls?.length > 0 ? true : false;
  return (
    <>
      <FormLabel htmlFor="image-upload" className="upload-label">
        <CloudUploadSharp className="upload-icon" />
        {isSelected ? "Change" : "Upload"}
      </FormLabel>
      <div className="image-container">
        {imageUrls && (
          <>
            <ImageCarousel imageUrls={imageUrls} />
          </>
        )}

        <div className="image-input-container">
          <Input
            type="file"
            id="image-upload"
            name="image"
            autoFocus
            inputProps={{ multiple: true }}
            {...register("images")}
            onChange={onChange}
            style={{ display: "none" }}
            required={required}
          />
        </div>
      </div>
    </>
  );
}
