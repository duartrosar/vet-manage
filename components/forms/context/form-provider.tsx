"use client";

import React, { useState } from "react";
import FormStateContext from "./form-context";

export default function FormStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [entityId, setEntityId] = useState<number>(0);

  return (
    <FormStateContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        entityId: entityId,
        setEntityId: setEntityId,
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
}
