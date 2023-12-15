"use client";

import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormIsOpen, setFormOwner } from "@/lib/redux/slices/form-slice";
import { IoAdd } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import OwnerForm from "./owner";

export default function FormModal() {
  const isOpen = useAppSelector((state) => state.form.isOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setFormIsOpen(true));
          dispatch(setFormOwner(null));
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add user</span>
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="relative z-50 "
          open={isOpen}
          onClose={() => {
            dispatch(setFormIsOpen(false));
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
                <Dialog.Panel className="w-full max-w-6xl rounded-lg border-2 border-cerulean-100/25 bg-cerulean-950 shadow-lg">
                  <div className="flex items-center justify-between border-b border-cerulean-100/25 px-4 py-4 shadow-xl">
                    <h1 className="text-xl text-cerulean-100">New Owner</h1>
                    <button
                      onClick={() => {
                        dispatch(setFormIsOpen(false));
                      }}
                      type="button"
                      className="cursor-pointer rounded-lg p-1 text-cerulean-100/50 hover:bg-cerulean-800 hover:text-cerulean-100 hover:shadow-md"
                    >
                      <IoMdClose className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <OwnerForm />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
