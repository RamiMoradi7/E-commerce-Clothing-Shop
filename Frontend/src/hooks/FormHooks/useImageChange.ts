import { ChangeEvent, useState } from "react";

export function useImageChange() {
 const [imageUrl, setImageUrl] = useState<string>("");
 const [imageFile, setImageFile] = useState<File | null>(null);

 function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
   const file = event.target.files?.[0];
   if (file) {
     const imageUrl = URL.createObjectURL(file);
     setImageUrl(imageUrl);
     setImageFile(file);
   }
 }

 return { handleImageChange, imageUrl, setImageUrl, imageFile };
}