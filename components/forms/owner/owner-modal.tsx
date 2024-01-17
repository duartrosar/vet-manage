"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setOwnerFormIsOpen,
  setFormOwner,
} from "@/lib/redux/slices/form-slice";
import { IoAdd } from "react-icons/io5";
import OwnerForm from "./owner-form";
import Modal from "../../modal";
import FormContainer from "../form-container";

export default function OwnerFormModal() {
  const isOpen = useAppSelector((state) => state.form.isOwnerFormOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setOwnerFormIsOpen(true));
          dispatch(setFormOwner(null));
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add user</span>
      </button>
      <Modal<"form/setOwnerFormIsOpen">
        setIsOpen={setOwnerFormIsOpen}
        isOpen={isOpen}
      >
        <FormContainer type="owner">
          <OwnerForm />
        </FormContainer>
      </Modal>
    </>
  );
}
