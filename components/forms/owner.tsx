"use client";

import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOwner } from "../../lib/data";
import ImageSelector from "./inputs/image-selector";
import Input from "./inputs/input";
import Selector from "./inputs/selector";
import { SubmitHandler, useForm } from "react-hook-form";
import { Owner } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import Address from "./inputs/address";
import { PutBlobResult } from "@vercel/blob";
import { genderOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import DatePicker from "../date-picker";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addOwner } from "@/lib/redux/slices/owners-slice";

export default function OwnerForm({ ownerId }: { ownerId?: number }) {
  const owner = useAppSelector((state) => state.form.owner);
  const dispatch = useAppDispatch();
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
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
    reset();

    if (owner) {
      setValues(owner);
    }
  }, []);

  const processForm: SubmitHandler<Owner> = async (data: Owner) => {
    // if (file) {
    //   data.imageUrl = await blobUpload();
    // }

    console.log(owner);
    // addOwner(data);
    dispatch(addOwner(data));
  };

  const addOwnerAsync = async (data: Owner) => {
    // TODO: Uncomment this
    // const result = await createOwner(data);
    // if (!result) {
    //   // TODO: if couldn't create owner, but blob was created then delete blob
    //   console.log("Something went wrong");
    //   throw new Error("Something went wrong");
    // }
    // if (result?.error) {
    //   console.log(result.error);
    //   return;
    // }
    // router.push("/app/owners");
    // setIsOpen(false);
  };

  const editOwner = async (data: any) => {
    const result = await createOwner(data);
    if (!result) {
      // TODO: if couldn't create owner, but blob was created then delete blob
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

  function setValues(owner: Owner) {
    setValue("firstName", owner.firstName);
    setValue("lastName", owner.lastName);
    setValue("dateOfBirth", owner.dateOfBirth);
    setValue("email", owner.email);
    setValue("mobileNumber", owner.mobileNumber);
    setValue("gender", owner.gender);
    setValue("address", owner.address);
    setValue("imageUrl", owner.imageUrl);
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="w-full p-4 xl:p-6 ">
      <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        <div className="">
          <ImageSelector setFile={setFile} imageUrl={owner?.imageUrl} />
        </div>
        <div className="w-full md:space-y-3 lg:col-span-2">
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Input<Owner>
              name="First Name"
              register={register}
              error={errors.firstName}
            />
            <Input<Owner>
              name="Last Name"
              register={register}
              error={errors.lastName}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <DatePicker
              name="Date Of Birth"
              type="date"
              setValue={setValue}
              dateValue={owner?.dateOfBirth}
              clearErrors={clearErrors}
              register={register}
              error={errors.dateOfBirth}
            />
            <Selector
              name="Gender"
              type="text"
              value={owner?.gender}
              setValue={setValue}
              register={register}
              error={errors.gender}
              clearErrors={clearErrors}
              options={options}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Input<Owner>
              name="Email"
              type="email"
              register={register}
              error={errors.email}
            />

            <Input<Owner>
              name="Mobile Number"
              type="tel"
              register={register}
              error={errors.mobileNumber}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Address<Owner> register={register} error={errors.address} />
            <Address<Owner> register={register} error={errors.address} />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Address<Owner> register={register} error={errors.address} />
            <Address<Owner> register={register} error={errors.address} />
          </div>
        </div>
        <div className="col-start-2 gap-1">
          <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              dispatch;
              if (pending) e.preventDefault;
            }}
            className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-3 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
          >
            Create Owner
          </button>
        </div>
      </div>
    </form>
  );
}
