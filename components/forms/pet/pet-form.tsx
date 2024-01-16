import { petSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Owner, Pet } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageSelector from "../inputs/image-selector";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useFormStatus } from "react-dom";
import { deleteBlob, createPet, updatePet } from "@/lib/db/actions";
import { setPetFormIsOpen } from "@/lib/redux/slices/form-slice";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import { Form, FormField } from "@/components/ui/form";
import ControlledCombobox from "../inputs/controlled-combobox";
import ControlledTextInput from "../inputs/controlled-text-input";
import { useImageUpload } from "@/lib/hooks/useImageUpload";

interface FormData {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  ownerId: number;
}

export default function PetForm({ owners }: { owners?: Owner[] | null }) {
  const { upload, deleteImage } = useImageUpload();
  const pet = useAppSelector((state) => state.form.pet);
  const dispatch = useAppDispatch();
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File>();
  const form = useForm<FormData>({
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
    form.reset();

    if (pet) {
      setValues(pet);
    }
  }, []);

  async function onSubmit(data: FormData) {
    if (pet) {
      data.id = pet.id;
      data.imageUrl = pet.imageUrl ? pet.imageUrl : "";
      await updatePetAsync(data);
    } else {
      await addPetAsync(data);
    }
  }

  const addPetAsync = async (data: Pet) => {
    let wasUploaded = false;

    if (file) {
      const { url, ok } = await upload(file);

      wasUploaded = ok;
      data.imageUrl = url ?? null;
    }

    const { pet, success } = await createPet(data);

    if (!success || !pet) {
      // throw new Error("Something went wrong");
      console.log("Pet was not created.");
      toast.custom((t) => (
        <Toast t={t} message="Pet was not created." type="danger" />
      ));

      if (wasUploaded && data.imageUrl) {
        await deleteBlob(data.imageUrl);
      }
      return;
    }

    dispatch(setPetFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Pet was created successfully." type="success" />
    ));
  };

  const updatePetAsync = async (data: Pet) => {
    let wasUploaded = false;

    if (file) {
      if (data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      const { url, ok } = await upload(file);

      wasUploaded = ok;
      data.imageUrl = url ?? null;
    }

    const result = await updatePet(data);

    if (!result?.success) {
      console.log("Pet was not updated.");

      if (wasUploaded && data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
      return;
    }

    dispatch(setPetFormIsOpen(false));

    toast.custom((t) => (
      <Toast t={t} message="Pet was updated successfully." type="success" />
    ));
  };

  function setValues(pet: Pet) {
    form.setValue("id", pet.id);
    form.setValue("name", pet.name);
    form.setValue("type", pet.type);
    form.setValue("ownerId", pet.ownerId);
    form.setValue("imageUrl", pet.imageUrl ? pet.imageUrl : "");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 xl:p-6 "
      >
        <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
          <div className="">
            <ImageSelector setFile={setFile} imageUrl={pet?.imageUrl} />
          </div>
          <div className="w-full space-y-3 lg:col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <ControlledTextInput
                  label="Name"
                  {...field}
                  placeholder="Name"
                  error={form.formState.errors.name}
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <ControlledTextInput
                  label="Type"
                  {...field}
                  placeholder="Type"
                  error={form.formState.errors.name}
                />
              )}
            />
            {owners && (
              <FormField
                control={form.control}
                name="ownerId"
                render={({ field }) => (
                  <ControlledCombobox<FormData>
                    owners={owners}
                    setValue={form.setValue}
                    value={field.value}
                    label="Owner"
                    error={form.formState.errors.ownerId}
                    clearErrors={form.clearErrors}
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
              {pet ? "Save pet" : "Create pet"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
