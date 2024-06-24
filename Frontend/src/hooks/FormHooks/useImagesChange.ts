import { ChangeEvent, useState } from "react";

export function useImagesChange() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target?.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImageFiles(files);
    setImageUrls(urls);
  }
  return { handleImageChange, imageUrls, setImageUrls, imageFiles };
}
