import React, { useContext, useEffect, useRef, useState } from "react";
import DatePickerModal from "./modal";
import DatePickerContext from "./context/dp-context";
import { IoCalendarClearOutline } from "react-icons/io5";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegisterReturn,
} from "react-hook-form";
import { CustomInputProps } from "@/lib/types";
import { toCamelCase } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

export default function DatePickerContainer<T extends FieldValues>({
  name,
  type = "text",
  register,
  error,
  setSelectedOption: setValue,
  clearErrors,
  dateValue,
}: CustomInputProps<T>) {
  const [direction, setDirection] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const { currentDate, dropdownOpen, setDropdownOpen, setCurrentDate } =
    useContext(DatePickerContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (dateValue) {
      setCurrentDate({
        selectedDay: dateValue.getDate(),
        selectedMonth: dateValue.getMonth(),
        selectedYear: dateValue.getFullYear(),
      });
    }
  }, [dateValue]);

  useOnClickOutside(dropdownRef, (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const id = element.id;

    if (id === "toggler") return;
    if (childRef.current && childRef.current.contains(event.target as Node))
      return;

    setDropdownOpen(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        className="hidden w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
      <div
        ref={dropdownRef}
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center justify-between rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
      >
        <span>
          {`${currentDate.selectedDay < 10 ? "0" : ""}${
            currentDate.selectedDay
          }/${currentDate.selectedMonth < 9 ? "0" : ""}${
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
        <div ref={childRef} id="modal">
          <DatePickerModal direction={direction} />
        </div>
      )}
    </div>
  );
}
