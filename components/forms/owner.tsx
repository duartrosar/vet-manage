"use client";

import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOwner } from "../../lib/data";
import ImageSelector from "./image-selector";
import Input from "./input";
import Selector from "./selector";
import DateSelector from "./date-selector";
import { SubmitHandler, useForm } from "react-hook-form";
import { Owner } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import Address from "./address";
import { PutBlobResult } from "@vercel/blob";
import { genderOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function OwnerForm() {
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<Owner>();
  const router = useRouter();
  const options = genderOptions;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Owner>({
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      email: "",
      mobileNumber: "",
      address: "",
      imageUrl: "",
      gender: "",
    },
    resolver: zodResolver(ownerSchema),
  });

  useEffect(() => {
    // console.log(da);
  }, [errors]);

  const processForm: SubmitHandler<Owner> = async (data) => {
    if (file) {
      data.imageUrl = await blobUpload();
    }
    const result = await createOwner(data);
    if (!result) {
      console.log("Something went wrong");
      throw new Error("Something went wrong");
    }

    if (result?.error) {
      console.log(result.error);
      return;
    }

    router.push("/app/owners");
  };

  const blobUpload = async () => {
    const response = await fetch(`/api/blob/upload?filename=${file!.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob.url;
  };

  return (
    <div className="h-full overflow-auto p-3">
      <form
        onSubmit={handleSubmit(processForm)}
        className="relative flex flex-col gap-3"
      >
        <ImageSelector setFile={setFile} />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Input<Owner>
              name="First Name"
              register={register}
              error={errors.firstName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Input<Owner>
              name="Last Name"
              register={register}
              error={errors.lastName}
            />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex w-full flex-col gap-1">
            <DateSelector />
            {/* {errors.dateOfBirth && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.dateOfBirth.message}
                </span>
              )} */}
          </div>
          <div className="relative flex flex-col gap-1">
            <Selector
              name="Gender"
              type="text"
              setValue={setValue}
              register={register}
              error={errors.gender}
              clearErrors={clearErrors}
              options={options}
            />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Input<Owner>
              name="Email"
              type="email"
              register={register}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Input<Owner>
              name="Mobile Number"
              type="tel"
              register={register}
              error={errors.mobileNumber}
            />
          </div>
        </div>
        <Address<Owner> register={register} error={errors.address} />
        <div className="flex flex-col gap-1">
          <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              if (pending) e.preventDefault;
            }}
            className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-3 py-2 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 text-cerulean-100"
          >
            Create Owner
          </button>
        </div>
      </form>
    </div>
  );
}
