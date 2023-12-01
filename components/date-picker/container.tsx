import React, { useContext, useEffect, useRef, useState } from "react";
import DatePickerModal from "./modal";
import DatePickerContext from "./context/context";
import { IoCalendarClearOutline } from "react-icons/io5";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegisterReturn,
} from "react-hook-form";
import { CustomInputProps } from "@/lib/types";
import { toCamelCase } from "@/lib/utils";

export default function DatePickerContainer<T extends FieldValues>({
  name,
  type = "text",
  register,
  error,
  setValue,
  clearErrors,
}: CustomInputProps<T>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const { currentDate } = useContext(DatePickerContext);
  const inputId = toCamelCase(name);

  useEffect(() => {
    setValue<Path<T>>(
      inputId as Path<T>,
      new Date(
        currentDate.selectedYear,
        currentDate.selectedMonth,
        currentDate.selectedDay,
      ) as PathValue<T, Path<T>>,
    );

    if (containerRef.current && childRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (containerRect.y + 310 + 80 > windowHeight) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const newDate = new Date(
      currentDate.selectedYear,
      currentDate.selectedMonth,
      currentDate.selectedDay,
    );

    setValue<Path<T>>(inputId as Path<T>, newDate as PathValue<T, Path<T>>);
    clearErrors(inputId as Path<T>);
  }, [currentDate]);

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        className="w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 hidden"
      />
      <div
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center justify-between rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
      >
        <span>
          {`${currentDate.selectedDay < 10 ? "0" : ""}${
            currentDate.selectedDay
          }/${currentDate.selectedMonth < 10 ? "0" : ""}${
            currentDate.selectedMonth + 1
          }/${currentDate.selectedYear}`}
        </span>
        <span>
          <IoCalendarClearOutline className="text-cerulean-100/25" />
        </span>
      </div>
      {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )}
      {dropdownOpen && (
        <div ref={childRef}>
          <DatePickerModal direction={direction} />
        </div>
      )}
    </div>
  );
}
