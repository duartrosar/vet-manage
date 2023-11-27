"use client";

import { uploadBlob } from "@/lib/data";
import { PutBlobResult } from "@vercel/blob";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoCloudUpload } from "react-icons/io5";

export default function ImageSelector({
  isSubmitting,
  setFile,
}: {
  isSubmitting: boolean;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  // useEffect(() => {
  //   if (isSubmitting) {
  //     blobUpload();
  //   }
  // }, [isSubmitting]);

  // const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  // console.log(isSubmitting);
  return (
    <div className="relative flex flex-col gap-1">
      <div className="relative rounded-lg border-2 border-cerulean-100/25 p-3 hover:bg-cerulean-800">
        {image && (
          <img
            src={image.toString()}
            alt="profile"
            className="absolute left-0 top-0 h-full w-full rounded-lg object-contain object-top"
          />
        )}
        <label
          htmlFor="picture"
          className="flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-lg text-sm md:h-[640px]"
        >
          <div className="flex flex-col items-center justify-center">
            <IoCloudUpload className="z-20 h-12 w-12 text-gray-500" />
          </div>
          <input
            id="picture"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={inputFileRef}
          />
        </label>
      </div>
    </div>
  );
}
