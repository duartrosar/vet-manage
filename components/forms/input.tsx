import { toCamelCase } from "@/lib/utils";
import React from "react";

export default function Input({
  name,
  type = "text",
}: {
  name: string;
  type?: string;
}) {
  const inputId = toCamelCase(name);
  console.log(inputId);

  return (
    <>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        type={type}
        name={inputId}
        className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
    </>
  );
}
