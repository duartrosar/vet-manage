"use client";

import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setOwnerFormIsOpen,
  setFormOwner,
} from "@/lib/redux/slices/form-slice";
import { IoAdd } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import OwnerForm from "./owner-form";
import Modal from "../../modal";
import FormContainer from "../form-container";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";

export default function OwnerFormModal() {
  const isOpen = useAppSelector((state) => state.form.isOwnerFormOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          // toast.custom((t) => <Toast message={t} type="success" />);
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
