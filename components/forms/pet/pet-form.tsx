import { petSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Owner, Pet } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ImageSelector from "../inputs/image-selector";
import { useAppSelector } from "@/lib/hooks";
import Input from "../inputs/input";
import { useFormStatus } from "react-dom";
import { Listbox } from "@headlessui/react";
import ListboxWrapper from "../inputs/listbox-wrapper";
import InputTest from "../inputs/input-test";

export default function PetForm({
  owners,
  petId,
}: {
  owners?: Owner[] | null;
  petId?: number;
}) {
  const pet = useAppSelector((state) => state.form.pet);
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Pet>({
    defaultValues: {
      id: 0,
      name: "",
      imageUrl: "",
      type: "",
      ownerId: 0,
    },
    resolver: zodResolver(petSchema),
  });

  useEffect(() => {
    reset();

    // if (pet) {
    //   setValues(pet);
    // }
  }, []);

  const processForm: SubmitHandler<Pet> = async (data: Pet) => {
    console.log("Form pet: ", data);
    // TODO: Uncomment this
    // if (file) {
    //   data.imageUrl = await blobUpload();
    // }
    if (pet) {
      data.id = pet.id;
      // await updateOwnerAsync(data);
    } else {
      // await addOwnerAsync(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="w-full p-4 xl:p-6 ">
      <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        <div className="">
          <ImageSelector setFile={setFile} imageUrl={pet?.imageUrl} />
        </div>
        <div className="w-full space-y-3 lg:col-span-2">
          <Input<Pet> name="Name" register={register} error={errors.name} />
          <Input<Pet> name="Type" register={register} error={errors.type} />
          {owners && (
            <Controller
              name="ownerId"
              control={control}
              rules={{
                required: "Please select an owner",
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <ListboxWrapper
                  onChange={onChange}
                  value={value}
                  owners={owners}
                  error={errors.ownerId}
                />
              )}
            />
          )}
        </div>
        <div className="col-start-2 gap-1 text-end lg:text-start">
          <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              if (pending) e.preventDefault;
            }}
            className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
          >
            {pet ? "Save owner" : "Create owner"}
          </button>
        </div>
      </div>
    </form>
  );
}
