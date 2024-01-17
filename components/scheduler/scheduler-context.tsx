"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import React, { useState } from "react";

export interface SchedulerContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SchedulerContext = createContext<SchedulerContextValue>({
  isOpen: false,
  setIsOpen: () => {},
});

export default function SchedulerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SchedulerContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}
