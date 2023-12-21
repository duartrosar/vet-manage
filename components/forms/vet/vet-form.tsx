import { genderOptions } from "@/lib/constants";
import { createVetWithUser, getUser, updateVet } from "@/lib/db";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setVetFormIsOpen } from "@/lib/redux/slices/form-slice";
import { addVetSlice, updateVetSlice } from "@/lib/redux/slices/vets-slice";
import { vetSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vet } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageSelector from "../inputs/image-selector";
import Input from "../inputs/input";
import DatePicker from "@/components/date-picker";
import Selector from "../inputs/selector";
import Address from "../inputs/address";

export default function VetForm() {
  const vet = useAppSelector((state) => state.form.vet);
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState("");
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const options = genderOptions;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Vet>({
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
    reset();

    if (vet) {
      setValues(vet);
    }
  }, []);

  const processForm: SubmitHandler<Vet> = async (data: Vet) => {
    console.log(data.id);

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
  };

  const addVetAsync = async (data: Vet) => {
    let { user } = await getUser(data.email);

    if (user) {
      console.log("Existing User: ", user);
      setEmailError("That email is already being used.");
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

    // TODO: set toast message
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
    // TODO: set toast message
  };

  function setValues(vet: Vet) {
    setValue("id", vet.id);
    setValue("firstName", vet.firstName);
    setValue("lastName", vet.lastName);
    setValue("dateOfBirth", vet.dateOfBirth);
    setValue("email", vet.email);
    setValue("mobileNumber", vet.mobileNumber);
    setValue("gender", vet.gender);
    setValue("address", vet.address);
    setValue("imageUrl", vet.imageUrl);
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="w-full p-4 xl:p-6 ">
      <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        <div className="">
          <ImageSelector setFile={setFile} imageUrl={vet?.imageUrl} />
        </div>
        <div className="w-full md:space-y-3 lg:col-span-2">
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Input<Vet>
              name="First Name"
              register={register}
              error={errors.firstName}
            />
            <Input<Vet>
              name="Last Name"
              register={register}
              error={errors.lastName}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <DatePicker
              name="Date Of Birth"
              type="date"
              setSelectedOption={setValue}
              dateValue={vet?.dateOfBirth}
              clearErrors={clearErrors}
              register={register}
              error={errors.dateOfBirth}
            />
            <Selector
              name="Gender"
              type="text"
              selectedOption={vet?.gender}
              setSelectedOption={setValue}
              register={register}
              error={errors.gender}
              clearErrors={clearErrors}
              options={options}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <span>
              <Input<Vet>
                // {Vet && readonly}
                readOnly={vet ? true : false}
                name="Email"
                type="email"
                register={register}
                error={errors.email}
              />
              {emailError && (
                <span className="text-right text-xs font-bold text-red-500">
                  {emailError}
                </span>
              )}
            </span>

            <Input<Vet>
              name="Mobile Number"
              type="tel"
              register={register}
              error={errors.mobileNumber}
            />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            {/* TODO: Fix errors display */}
            <Address<Vet> register={register} error={errors.address} />
            <Address<Vet> register={register} error={errors.address} />
          </div>
          <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
            <Address<Vet> register={register} error={errors.address} />
            <Address<Vet> register={register} error={errors.address} />
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
  );
}
