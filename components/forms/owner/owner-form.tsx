"use client";

import React, { useEffect, useState } from "react";
import { createOwnerWithUser, getUser, updateOwner } from "@/lib/db/actions";
import ImageSelector from "@/components/forms/inputs/image-selector";
import { useForm } from "react-hook-form";
import { Owner } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import { genderOptions } from "@/lib/constants";
import DatePicker from "@/components/date-picker";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setOwnerFormIsOpen } from "@/lib/redux/slices/form-slice";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import { Form, FormField } from "@/components/ui/form";
import ControlledTextInput from "@/components/forms/inputs/controlled-text-input";
import ControlledSelector from "@/components/forms/inputs/controlled-selector";
import { useImageUpload } from "@/lib/hooks/useImageUpload";

interface OnwerFormData {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  mobileNumber: string;
  address: string;
  imageUrl: string;
  userId: string;
}

export default function OwnerForm() {
  const { upload, deleteImage } = useImageUpload();
  const owner = useAppSelector((state) => state.form.owner);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File>();

  const form = useForm<OnwerFormData>({
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

  async function onSubmit(data: OnwerFormData) {
    if (owner) {
      data.id = owner.id;
      data.imageUrl = owner.imageUrl ? owner.imageUrl : "";
      await updateOwnerAsync(data);
    } else {
      await addOwnerAsync(data);
    }
  }

  async function addOwnerAsync(data: Owner) {
    let { user } = await getUser(data.email);

    if (user) {
      console.log("Existing User: ", user);

      form.setError("email", {
        type: "custom",
        message: "That email is already being used",
      });
      return;
    }

    let wasUploaded = false;

    if (file) {
      const { url, ok } = await upload(file);

      wasUploaded = ok;
      data.imageUrl = url ?? null;
    }

    const { ownerUser, success, owner } = await createOwnerWithUser(data);

    if (!success || !ownerUser || !owner) {
      console.log("Owner was not created.");
      toast.custom((t) => (
        <Toast t={t} message="Owner was not created." type="danger" />
      ));

      if (wasUploaded && data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      return;
    }

    dispatch(setOwnerFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Owner was created successfully." type="success" />
    ));
  }

  const updateOwnerAsync = async (data: Owner) => {
    let newImageUploaded = false;
    let oldImage = data.imageUrl;

    if (file) {
      const { url, ok } = await upload(file);

      newImageUploaded = ok;

      if (ok) {
        data.imageUrl = url;
      }
    }

    const result = await updateOwner(data, data.id);

    if (!result?.success) {
      toast.custom((t) => (
        <Toast t={t} message="Owner could not be updated" type="danger" />
      ));

      if (newImageUploaded && data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      return;
    }

    if (oldImage && newImageUploaded) {
      await deleteImage(oldImage);
    }

    dispatch(setOwnerFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Owner was updated successfully." type="success" />
    ));
  };

  function setValues(owner: Owner) {
    form.setValue("id", owner.id);
    form.setValue("firstName", owner.firstName);
    form.setValue("lastName", owner.lastName);
    form.setValue("email", owner.email);
    form.setValue(
      "dateOfBirth",
      owner.dateOfBirth ? owner.dateOfBirth : new Date(),
    );
    form.setValue("mobileNumber", owner.mobileNumber ? owner.mobileNumber : "");
    form.setValue("gender", owner.gender ? owner.gender : "");
    form.setValue("imageUrl", owner.imageUrl ? owner.imageUrl : "");
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
                  <ControlledTextInput
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
                  <ControlledTextInput
                    label="Last Name"
                    {...field}
                    placeholder="Last Name"
                    error={form.formState.errors.lastName}
                  />
                )}
              />
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <ControlledSelector
                    label="Gender"
                    placeholder="Please select an option"
                    options={genderOptions}
                    onChange={field.onChange}
                    defaultValue={owner?.gender ? owner?.gender : ""}
                    error={form.formState.errors.gender}
                    value={field.value}
                  />
                )}
              />
              <DatePicker<OnwerFormData>
                label="Date Of Birth"
                name="dateOfBirth"
                dateValue={owner?.dateOfBirth}
                setValue={form.setValue}
                register={form.register}
                clearErrors={form.clearErrors}
                error={form.formState.errors.dateOfBirth}
              />
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <span>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <ControlledTextInput
                      label="Email"
                      {...field}
                      readOnly={owner ? true : false}
                      placeholder="Email"
                      error={form.formState.errors.email}
                    />
                  )}
                />
              </span>
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <ControlledTextInput
                    label="Mobile Number"
                    {...field}
                    placeholder="Mobile Number"
                    error={form.formState.errors.mobileNumber}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-start-2 gap-1 text-end lg:text-start">
            <button
              type="submit"
              className="w-full whitespace-nowrap rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
            >
              {owner ? "Save owner" : "Create owner"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
