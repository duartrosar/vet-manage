// import { Dialog, Transition } from "@headlessui/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import OwnerForm from "../forms/owner/owner-form";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setOwnerFormIsOpen } from "@/lib/redux/slices/form-slice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";

export default function Modal<T extends string>({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: ActionCreatorWithPayload<boolean, T>;
}) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          dispatch(setIsOpen(false));
        }}
      >
        <DialogContent className="flex justify-center" id="panel">
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
