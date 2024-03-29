"use client";

import { genderOptions } from "@/lib/constants";
import { getUser } from "@/lib/db/actions/user-actions";
import { createVetWithUser, updateVet } from "@/lib/db/actions/vet-actions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setVetFormIsOpen } from "@/lib/redux/slices/form-slice";
import { vetSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vet } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import ImageSelector from "@/components/forms/inputs/image-selector";
import DatePicker from "@/components/date-picker";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import { Form, FormField } from "@/components/ui/form";
import ControlledTextInput from "@/components/forms/inputs/controlled-text-input";
import ControlledSelector from "@/components/forms/inputs/controlled-selector";
import { useForm } from "react-hook-form";
import { useImageUpload } from "@/lib/hooks/useImageUpload";

interface FormData {
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

export default function VetForm() {
  const { upload, deleteImage } = useImageUpload();
  const vet = useAppSelector((state) => state.form.vet);
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState("");
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();

  const form = useForm<FormData>({
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
    resolver: zodResolver(vetSchema),
  });

  useEffect(() => {
    form.reset();

    if (vet) {
      setValues(vet);
    }
  }, []);

  async function onSubmit(data: Vet) {
    if (vet) {
      data.id = vet.id;
      data.imageUrl = vet.imageUrl ? vet.imageUrl : "";
      await updateVetAsync(data);
    } else {
      await addVetAsync(data);
    }
  }

  const addVetAsync = async (data: Vet) => {
    let { user } = await getUser(data.email);

    if (user) {
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

    const { vetUser, success, vet } = await createVetWithUser(data);

    if (!success || !vetUser || !vet) {
      ("Vet was not created.");
      toast.custom((t) => (
        <Toast t={t} message="Vet was not created." type="danger" />
      ));

      if (wasUploaded && data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      return;
    }

    dispatch(setVetFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Vet was created successfully." type="success" />
    ));
  };

  const updateVetAsync = async (data: Vet) => {
    let newImageUploaded = false;
    let oldImage = data.imageUrl;

    if (file) {
      const { url, ok } = await upload(file);
      newImageUploaded = ok;

      if (ok) {
        data.imageUrl = url;
      }
    }
    const result = await updateVet(data, data.id);

    if (!result?.success) {
      ("Vet could not be updated");

      toast.custom((t) => (
        <Toast t={t} message="Vet could not be updated" type="danger" />
      ));

      if (newImageUploaded && data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      return;
    }

    if (oldImage && newImageUploaded) {
      await deleteImage(oldImage);
    }

    dispatch(setVetFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Vet was updated successfully." type="success" />
    ));
  };

  function setValues(vet: Vet) {
    form.setValue("id", vet.id);
    form.setValue("firstName", vet.firstName);
    form.setValue("lastName", vet.lastName);
    form.setValue(
      "dateOfBirth",
      vet.dateOfBirth ? vet.dateOfBirth : new Date(),
    );
    form.setValue("email", vet.email);
    form.setValue("mobileNumber", vet.mobileNumber ? vet.mobileNumber : "");
    form.setValue("gender", vet.gender ? vet.gender : "");
    form.setValue("imageUrl", vet.imageUrl ? vet.imageUrl : "");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 xl:p-6 "
      >
        <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
          <div className="">
            <ImageSelector setFile={setFile} imageUrl={vet?.imageUrl} />
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
                    defaultValue={vet?.gender ? vet?.gender : ""}
                    error={form.formState.errors.gender}
                    value={field.value}
                  />
                )}
              />
              <DatePicker<FormData>
                label="Date Of Birth"
                name="dateOfBirth"
                dateValue={vet?.dateOfBirth}
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
                      readOnly={vet ? true : false}
                      placeholder="Email"
                      error={form.formState.errors.email}
                    />
                  )}
                />
                {emailError && (
                  <div className="w-full pr-3 pt-1 text-right text-xs font-bold text-red-500">
                    {emailError}
                  </div>
                )}
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
              onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault;
              }}
              className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
            >
              {vet ? "Save vet" : "Create vet"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
