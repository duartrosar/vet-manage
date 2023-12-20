import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import OwnerForm from "../forms/owner/owner-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormIsOpen } from "@/lib/redux/slices/form-slice";
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
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="relative z-50 "
          open={isOpen}
          onClose={() => {
            dispatch(setIsOpen(false));
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-200"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className="fixed inset-0 bg-cerulean-950/60 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>
          <div className="fixed inset-0 w-screen overflow-y-auto ">
            <div className="flex min-h-full w-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-200"
                enterFrom="opacity-0 translate-y-7"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-7"
              >
                <Dialog.Panel className="flex w-full justify-center">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
