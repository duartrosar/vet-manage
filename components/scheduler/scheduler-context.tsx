"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { AppointmentData } from "@/components/scheduler/scheduler-modal";

export interface SchedulerContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  appointmentData: AppointmentData | null;
  setAppointmentData: Dispatch<SetStateAction<AppointmentData | null>>;
}

export const SchedulerContext = createContext<SchedulerContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  appointmentData: null,
  setAppointmentData: () => {},
});

export default function SchedulerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);

  return (
    <SchedulerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        appointmentData,
        setAppointmentData,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}
