"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import FormStateContext from "./context/form-context";
import { useAppDispatch } from "@/lib/hooks";
import { addOwner } from "@/lib/redux/slices/owners-slice";

export default function OwnerForm({ ownerId }: { ownerId?: number }) {
  const { isOpen, setIsOpen, entityId, setEntityId } =
    useContext(FormStateContext);
  const [owner, setOwner] = useState<Owner | null>(null);
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const options = genderOptions;
  const dispatch = useAppDispatch();

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

  console.log(entityId);

  useEffect(() => {
    if (owner?.imageUrl) {
      setImageUrl(owner.imageUrl);
    }

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

  const processForm: SubmitHandler<Owner> = async (data: Owner) => {
    // if (file) {
    //   data.imageUrl = await blobUpload();
    // }

    console.log(owner);
    // addOwner(data);
    dispatch(addOwner(data));
    setIsOpen(false);
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
          setOwner(null);
          reset();
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add user</span>
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="relative z-50 "
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-200"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className="fixed inset-0 bg-cerulean-950/60 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>
          <div className="fixed inset-0 w-screen overflow-y-auto ">
            <div className="flex min-h-full w-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-200"
                enterFrom="opacity-0 translate-y-7"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-7"
              >
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
                            onClick={(
                              e: React.FormEvent<HTMLButtonElement>,
                            ) => {
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
