import Modal from "@/components/modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormPet, setPetFormIsOpen } from "@/lib/redux/slices/form-slice";
import React from "react";
import { IoAdd } from "react-icons/io5";
import FormContainer from "../form-container";

export default function PetFormModal() {
  const isOpen = useAppSelector((state) => state.form.isPetFormOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setPetFormIsOpen(true));
          dispatch(setFormPet(null));
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add pet</span>
      </button>
      <Modal<"form/setPetFormIsOpen">
        setIsOpen={setPetFormIsOpen}
        isOpen={isOpen}
      >
        <FormContainer type="pet">
          Pet Form
          {/* <PetForm /> */}
        </FormContainer>
      </Modal>
    </>
  );
}
