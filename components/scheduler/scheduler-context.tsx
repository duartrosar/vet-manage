"use client";

import { createContext, Dispatch, SetStateAction, useRef } from "react";
import React, { useState } from "react";
import { AppointmentData } from "@/components/scheduler/scheduler-modal";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";

export interface SchedulerContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  appointmentData: AppointmentData | null;
  setAppointmentData: Dispatch<SetStateAction<AppointmentData | null>>;
  schedulerRef: React.RefObject<ScheduleComponent> | null;
}

export const SchedulerContext = createContext<SchedulerContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  appointmentData: null,
  setAppointmentData: () => {},
  schedulerRef: null,
});

export default function SchedulerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);
  const schedulerRef = useRef<ScheduleComponent>(null);

  return (
    <SchedulerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        appointmentData,
        setAppointmentData,
        schedulerRef,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}
