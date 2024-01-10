"use client";

import { genderOptions } from "@/lib/constants";
import { createVetWithUser, getUser, updateVet } from "@/lib/db/actions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setVetFormIsOpen } from "@/lib/redux/slices/form-slice";
import { addVetSlice, updateVetSlice } from "@/lib/redux/slices/vets-slice";
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
  userId: number;
}

export default function VetForm() {
  const vet = useAppSelector((state) => state.form.vet);
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState("");
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const options = genderOptions;

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
    // TODO: Uncomment this
    // if (file) {
    //   data.imageUrl = await blobUpload();
    // }
    if (vet) {
      data.id = vet.id;
      await updateVetAsync(data);
    } else {
      await addVetAsync(data);
    }
  }

  const addVetAsync = async (data: Vet) => {
    let { user } = await getUser(data.email);

    if (user) {
      console.log("Existing User: ", user);
      setEmailError("That email is already being used");
      return;
    }

    const { vetUser, success, vet } = await createVetWithUser(data);
    // console.log("vetUser: ", vetUser.;

    if (!success || !vetUser || !vet) {
      // TODO: if couldn't create Vet, but blob was created then delete blob
      console.log("Something went wrong");
      // throw new Error("Something went wrong");
      console.log("Vet was not created.");
      return;
    }

    dispatch(addVetSlice(vet));
    dispatch(setVetFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Vet was created successfully." type="success" />
    ));
  };

  const updateVetAsync = async (data: Vet) => {
    console.log("Vet data: ", data);
    if (!data.id) {
      console.log(
        "User was not updated, please refresh the page and try again;",
      );
      return;
    }
    // TODO: Don't allow email to be edited???
    const result = await updateVet(data, data.id);

    if (!result?.success) {
      // TODO: figure out a way to check if the image changed or not, or if the user had an image already
      // TODO: If blob was created
      console.log("Something went wrong");
      throw new Error("Something went wrong");
    }

    dispatch(updateVetSlice(data));
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
    // form.setValue("address", vet.address);
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
            {/* <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <Address<Vet> register={register} error={errors.address} />
              <Address<Vet> register={register} error={errors.address} />
            </div>
            <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
              <Address<Vet> register={register} error={errors.address} />
              <Address<Vet> register={register} error={errors.address} />
            </div> */}
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
