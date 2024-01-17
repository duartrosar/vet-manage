"use client";

import React, { useContext } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import FormContainer from "../forms/form-container";
import { SchedulerContext } from "./scheduler-context";
import AppointmentFormHeader from "../forms/appointment/appointment-form-header";

export default function SchedulerModal() {
  const { isOpen, setIsOpen } = useContext(SchedulerContext);
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <DialogContent className="flex justify-center" id="panel">
          <div className="h-screen max-h-screen w-screen max-w-5xl overflow-y-auto border-0 border-cerulean-100/25 bg-cerulean-950 py-12 shadow-lg md:h-full md:w-[90vw] md:overflow-y-hidden md:rounded-lg md:py-0 lg:border-2 landscape:overflow-y-scroll">
            <AppointmentFormHeader />
            <div className="flex items-center justify-center"></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
