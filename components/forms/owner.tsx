"use client";

import React, { useContext, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOwner, getOwner } from "../../lib/data";
import ImageSelector from "./inputs/image-selector";
import Input from "./inputs/input";
import Selector from "./inputs/selector";
import { IoMdClose } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { Owner } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import Address from "./inputs/address";
import { PutBlobResult } from "@vercel/blob";
import { genderOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import DatePicker from "../date-picker";
import { Dialog } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import FormStateContext from "./context/form-context";

export default function OwnerForm({ ownerId }: { ownerId?: number }) {
  const { isOpen, setIsOpen, entityId } = useContext(FormStateContext);
  const [owner, setOwner] = useState<Owner | null>(null);
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
    reset();
    (async () => {
      const { owner } = await getOwner(entityId);
      if (owner) {
        setOwner(owner);
        console.log(owner);
        setValues(owner);
      }
    })();
  }, [entityId]);

  const processForm: SubmitHandler<Owner> = async (data) => {
    if (file) {
      data.imageUrl = await blobUpload();
    }

    console.log(data);
    await addOwner(data);
  };

  const addOwner = async (data: any) => {
    const result = await createOwner(data);
    if (!result) {
      // Todo: if couldn't create owner, but blob was created then delete blob
      console.log("Something went wrong");
      throw new Error("Something went wrong");
    }
    if (result?.error) {
      console.log(result.error);
      return;
    }
    router.push("/app/owners");

    // setIsOpen(false);
  };

  const editOwner = async (data: any) => {
    const result = await createOwner(data);
    if (!result) {
      // Todo: if couldn't create owner, but blob was created then delete blob
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

  const setValues = (owner: Owner) => {
    setValue("firstName", owner.firstName);
    setValue("lastName", owner.lastName);
    setValue("dateOfBirth", owner.dateOfBirth);
    setValue("email", owner.email);
    setValue("mobileNumber", owner.mobileNumber);
    setValue("gender", owner.gender);
    setValue("address", owner.address);
    setValue("imageUrl", owner.imageUrl);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          reset();
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 "
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="">Add user</span>
      </button>
      <Dialog
        className="relative z-50 "
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div
          className="fixed inset-0 bg-cerulean-950/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto ">
          <div className="flex min-h-full w-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-6xl rounded-lg border-2 border-cerulean-100/25 bg-cerulean-950 shadow-lg">
              <div className="flex items-center justify-between border-b border-cerulean-100/25 px-4 py-4 shadow-xl">
                <h1 className="text-xl text-cerulean-100">New Owner</h1>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="cursor-pointer rounded-lg p-1 text-cerulean-100/50 hover:bg-cerulean-800 hover:text-cerulean-100 hover:shadow-md"
                >
                  <IoMdClose className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <form
                  onSubmit={handleSubmit(processForm)}
                  className="w-full p-4 xl:p-6 "
                >
                  <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
                    <div className="">
                      <ImageSelector
                        setFile={setFile}
                        imageUrl={owner?.imageUrl}
                      />
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
                        <Address<Owner>
                          register={register}
                          error={errors.address}
                        />
                        <Address<Owner>
                          register={register}
                          error={errors.address}
                        />
                      </div>
                      <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
                        <Address<Owner>
                          register={register}
                          error={errors.address}
                        />
                        <Address<Owner>
                          register={register}
                          error={errors.address}
                        />
                      </div>
                    </div>
                    <div className="col-start-2 gap-1">
                      <button
                        type="submit"
                        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                          if (pending) e.preventDefault;
                        }}
                        className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-3 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
                      >
                        Create Owner
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
