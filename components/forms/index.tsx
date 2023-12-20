import React from "react";
import OwnerForm from "./owner/owner-form";
import OwnerFormModal from "./owner/owner-modal";

export default function Form({ type }: { type: string }) {
  return (
    <>
      <OwnerFormModal />
    </>
  );
}
