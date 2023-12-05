import React from "react";
import OwnerForm from "./owner";

export default async function FormBase({ type }: { type: string }) {
  // const {owner} = await getOwner
  return <div>{type === "owner" ? <OwnerForm /> : null}</div>;
}
