"use client";

import React from "react";
import Modal from "../modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setDeleteFormIsOpen,
  setFormIsOpen,
} from "@/lib/redux/slices/form-slice";
import { IoTrash } from "react-icons/io5";
import { deleteUser } from "@/lib/db";
import {
  removeOwnerByUserIdSlice,
  removeOwnerSlice,
} from "@/lib/redux/slices/owners-slice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function DeleteForm() {
  const userId = useAppSelector((state) => state.form.userId);
  const isOpen = useAppSelector((state) => state.form.isDeleteFormOpen);
  const dispatch = useAppDispatch();
  const deleteUserWithId = deleteUser.bind(null, userId);

  const handleSubmit = async () => {
    await deleteUser(userId);
    dispatch(setDeleteFormIsOpen(false));
    dispatch(removeOwnerByUserIdSlice(userId));
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
          <IoTrash className="h-[50px] w-[50px] text-white" />
          <h2 className="text-white">
            Are you sure you want to delete this user?
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
              <span className="hidden 2xl:block">Cancel</span>
            </button>
            <button
              type="submit"
              className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
            >
              <span className="hidden 2xl:block">Delete</span>
            </button>
          </span>
        </form>
      </div>
    </Modal>
  );
}
