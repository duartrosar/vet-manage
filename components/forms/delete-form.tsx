"use client";

import React from "react";
import Modal from "../modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setDeleteFormIsOpen } from "@/lib/redux/slices/form-slice";
import { IoTrash } from "react-icons/io5";
import { deletePet, deleteUser } from "@/lib/db";
import { removeOwnerByUserIdSlice } from "@/lib/redux/slices/owners-slice";
import { removeVetByUserIdSlice } from "@/lib/redux/slices/vets-slice";
import { removePetSlice } from "@/lib/redux/slices/pets-slice";
import { Pet } from "@prisma/client";
import { toast } from "sonner";
import Toast from "../toast/toasters";

export default function DeleteForm({
  type,
}: {
  type: "owner" | "vet" | "pet";
}) {
  const userId = useAppSelector((state) => state.form.userId);
  const isOpen = useAppSelector((state) => state.form.isDeleteFormOpen);
  const pet = useAppSelector((state) => state.form.pet);
  const pets = useAppSelector((state) => state.pets.pets);
  const dispatch = useAppDispatch();
  const deleteUserWithId = deleteUser.bind(null, userId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "owner" || type === "vet") {
      await deleteUser(userId);

      type === "owner" && dispatch(removeOwnerByUserIdSlice(userId));
      type === "vet" && dispatch(removeVetByUserIdSlice(userId));
      toast.custom((t) => (
        <Toast
          t={t}
          message={`${type[0].toUpperCase()}${type.slice(
            1,
          )} was deleted successfully`}
          type="success"
        />
      ));
    } else {
      if (pet && pets) {
        const petIndex = pets.findIndex((p) => p.id === pet.id);
        dispatch(removePetSlice(petIndex));
        await deletePet(pet.id);
        toast.custom((t) => (
          <Toast
            t={t}
            message={`${type} was deleted successfully`}
            type="success"
          />
        ));
      }
    }

    dispatch(setDeleteFormIsOpen(false));
  };

  return (
    <Modal<"form/setDeleteFormIsOpen">
      isOpen={isOpen}
      setIsOpen={setDeleteFormIsOpen}
    >
      <div className="w-full max-w-md  rounded-lg border-2 border-cerulean-100/25 bg-cerulean-950 py-6 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <IoTrash className="h-[50px] w-[50px] text-cerulean-100/75" />
          <h2 className="text-cerulean-100/75">
            Are you sure you want to delete this {type}?
          </h2>
          <span className="flex max-w-xs flex-row justify-end gap-2">
            <button
              type="button"
              onClick={(e) => {
                dispatch(setDeleteFormIsOpen(false));
                // dispatch(removeOwnerSlice())
              }}
              className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
            >
              <span className="">Cancel</span>
            </button>
            <button
              type="submit"
              className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
            >
              <span className="">Delete</span>
            </button>
          </span>
        </form>
      </div>
    </Modal>
  );
}
