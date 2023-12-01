import { CustomInputProps } from "@/lib/types";
import { toCamelCase } from "@/lib/utils";
import React, { useState, useRef, MouseEvent as ReactMouseEvent } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";

export default function Selector<T extends FieldValues>({
  name,
  type,
  register,
  error,
  setValue,
  clearErrors,
  options,
}: CustomInputProps<T>) {
  const [selectedText, setSelectedText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const inputId = toCamelCase(name);

  function handleClick(e: ReactMouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const text = element.innerHTML;
    setDropdownOpen(false);
    setSelectedText(text);
    setValue<Path<T>>(inputId as Path<T>, text as PathValue<T, Path<T>>, {
      shouldDirty: false,
    });
    clearErrors(inputId as Path<T>);
  }

  useOnClickOutside(dropdownRef, (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const id = element.id;

    if (id === "toggler") return;

    setDropdownOpen(false);
  });

  return (
    <>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        className="hidden"
      />
      <div
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center justify-between rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 z-0`}
      >
        <p className={selectedText ? "text-gray-200" : "text-gray-500"}>
          {selectedText ? selectedText : "Select an option"}
        </p>
        <IoChevronDown className="justify-self-end text-cerulean-100/25" />
      </div>
      {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-20 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900"
        >
          <ul className="flex flex-col gap-3 py-2">
            {options &&
              options.map((value, index) => (
                <li
                  key={index}
                  onClick={(e) => handleClick(e)}
                  className="w-full cursor-pointer px-3 py-2 text-gray-500 transition hover:bg-cerulean-800 hover:shadow-md"
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
