import Modal from "@/components/modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormVet, setVetFormIsOpen } from "@/lib/redux/slices/form-slice";
import React from "react";
import { IoAdd } from "react-icons/io5";
import FormContainer from "../form-container";
import VetForm from "./vet-form";

export default function VetFormModal() {
  const isOpen = useAppSelector((state) => state.form.isVetFormOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setVetFormIsOpen(true));
          dispatch(setFormVet(null));
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add user</span>
      </button>
      <Modal<"form/setVetFormIsOpen">
        setIsOpen={setVetFormIsOpen}
        isOpen={isOpen}
      >
        <FormContainer type="vet">
          <VetForm />
        </FormContainer>
      </Modal>
    </>
  );
}
