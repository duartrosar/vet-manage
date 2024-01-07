"use client";

import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOwnerWithUser, getUser, updateOwner } from "../../../lib/db";
import ImageSelector from "../inputs/image-selector";
import Selector from "../inputs/selector";
import { SubmitHandler, useForm } from "react-hook-form";
import { Owner } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import Address from "../inputs/address";
import { PutBlobResult } from "@vercel/blob";
import { genderOptions } from "@/lib/constants";
import DatePicker from "../../date-picker";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addOwnerSlice,
  updateOwnerSlice,
} from "@/lib/redux/slices/owners-slice";
import { setOwnerFormIsOpen } from "@/lib/redux/slices/form-slice";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextInput from "../inputs/text-input";

export default function OwnerForm({ ownerId }: { ownerId?: number }) {
  const owner = useAppSelector((state) => state.form.owner);
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState("");
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const options = genderOptions;

  const form = useForm<Owner>({
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
    form.reset();

    if (owner) {
      setValues(owner);
    }
  }, []);

  const onSubmit: SubmitHandler<Owner> = async (data: Owner) => {
    // TODO: Uncomment this
    // if (file) {
    //   data.imageUrl = await blobUpload();
    // }
    if (owner) {
      data.id = owner.id;
      await updateOwnerAsync(data);
    } else {
      await addOwnerAsync(data);
    }
  };

  const addOwnerAsync = async (data: Owner) => {
    let { user } = await getUser(data.email);

    if (user) {
      console.log("Existing User: ", user);
      setEmailError("That email is already being used.");
      return;
    }

    const { ownerUser, success, owner } = await createOwnerWithUser(data);

    if (!success || !ownerUser || !owner) {
      // TODO: if couldn't create owner, but blob was created then delete blob
      console.log("Something went wrong");
      // throw new Error("Something went wrong");
      console.log("Owner was not created.");
      return;
    }

    dispatch(addOwnerSlice(owner));
    dispatch(setOwnerFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Owner was created successfully." type="success" />
    ));
  };

  const updateOwnerAsync = async (data: Owner) => {
    // TODO: Don't allow email to be edited???
    const result = await updateOwner(data, data.id);

    if (!result?.success) {
      // TODO: figure out a way to check if the image changed or not, or if the user had an image already
      // TODO: If blob was created
      console.log("Something went wrong");
      throw new Error("Something went wrong");
    }

    dispatch(updateOwnerSlice(data));
    dispatch(setOwnerFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Owner was updated successfully." type="success" />
    ));
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
    form.setValue("id", owner.id);
    form.setValue("firstName", owner.firstName);
    form.setValue("lastName", owner.lastName);
    form.setValue("dateOfBirth", owner.dateOfBirth);
    form.setValue("email", owner.email);
    form.setValue("mobileNumber", owner.mobileNumber);
    form.setValue("gender", owner.gender);
    form.setValue("address", owner.address);
    form.setValue("imageUrl", owner.imageUrl);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 xl:p-6 "
      >
        <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
          <div className="">
            <ImageSelector setFile={setFile} imageUrl={owner?.imageUrl} />
          </div>
          <div className="w-full md:space-y-3 lg:col-span-2">
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <TextInput
                    label="First Name"
                    {...field}
                    placeholder="First Name"
                    error={form.formState.errors.firstName}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <TextInput
                    label="Last Name"
                    {...field}
                    placeholder="Last Name"
                    error={form.formState.errors.lastName}
                  />
                )}
              />
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              {/* <DatePicker
              name="Date Of Birth"
              type="date"
              setSelectedOption={setValue}
              dateValue={owner?.dateOfBirth}
              clearErrors={clearErrors}
              register={register}
              error={errors.dateOfBirth}
            />
            <Selector
              name="Gender"
              type="text"
              selectedOption={owner?.gender}
              setSelectedOption={setValue}
              register={register}
              error={errors.gender}
              clearErrors={clearErrors}
              options={options}
            /> */}
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <span>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      {...field}
                      placeholder="Email"
                      error={form.formState.errors.email}
                    />
                  )}
                />
                {/* <Input<Owner>
                // {owner && readonly}
                readOnly={owner ? true : false}
                name="Email"
                type="email"
                register={register}
                error={errors.email}
              /> */}
                {emailError && (
                  <span className="text-right text-xs font-bold text-red-500">
                    {emailError}
                  </span>
                )}
              </span>

              {/* <Input<Owner>
              name="Mobile Number"
              type="tel"
              register={register}
              error={errors.mobileNumber}
            /> */}
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              {/* TODO: Fix errors display */}
              {/* <Address<Owner> register={register} error={errors.address} />
            <Address<Owner> register={register} error={errors.address} /> */}
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              {/* <Address<Owner> register={register} error={errors.address} />
            <Address<Owner> register={register} error={errors.address} /> */}
            </div>
          </div>
          <div className="col-start-2 gap-1 text-end lg:text-start">
            <button
              type="submit"
              onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault;
              }}
              className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
            >
              {owner ? "Save owner" : "Create owner"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
