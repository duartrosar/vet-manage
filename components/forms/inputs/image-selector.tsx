"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";

export default function ImageSelector({
  setFile,
  imageUrl,
}: {
  imageUrl?: string | null | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  return (
    <div className="relative flex flex-col gap-1 lg:h-full">
      <label className="pl-3 text-sm font-bold text-gray-500">
        Owner Image
      </label>
      <div className="relative h-64 rounded-lg border-2 border-cerulean-100/25 p-3 hover:bg-cerulean-800 sm:h-96 lg:h-full">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="profile"
            className="absolute left-0 top-0 h-full w-full rounded-lg object-contain object-top"
          />
        )}
        {image && (
          <img
            src={image.toString()}
            alt="profile"
            className="absolute left-0 top-0 h-full w-full rounded-lg object-contain object-top"
          />
        )}
        <label
          htmlFor="picture"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg text-sm"
        >
          <div className="flex flex-col items-center justify-center">
            <IoCloudUpload className="z-20 h-12 w-12 text-gray-500" />
          </div>
          <input
            id="picture"
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
