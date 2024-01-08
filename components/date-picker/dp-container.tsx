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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Console } from "console";
import CurrentDateDisplayer from "./date-displayer";
import clsx from "clsx";

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
  const ref = useRef<HTMLDivElement>(null);
  const { currentDate, dropdownOpen, setDropdownOpen, setCurrentDate } =
    useContext(DatePickerContext);
  const inputId = toCamelCase(name ? name : "");

  useOnClickOutside(ref, (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    const id = element.id;

    if (id === "toggler") return;
    setDropdownOpen(!dropdownOpen);
  });

  useEffect(() => {
    return;
    setValue<Path<T>>(
      inputId as Path<T>,
      new Date(
        currentDate.selectedYear,
        currentDate.selectedMonth,
        currentDate.selectedDay,
      ) as PathValue<T, Path<T>>,
    );
  }, [dropdownOpen]);

  useEffect(() => {
    const newDate = new Date(
      currentDate.selectedYear,
      currentDate.selectedMonth,
      currentDate.selectedDay,
    );

    console.log("dp-Container.tsx - New Date: ", newDate);

    console.log("dp-Container.tsx - Current Date: ", [
      currentDate.selectedYear,
      currentDate.selectedMonth,
      currentDate.selectedDay,
    ]);

    setValue<Path<T>>(inputId as Path<T>, newDate as PathValue<T, Path<T>>);
    clearErrors(inputId as Path<T>);
  }, [currentDate]);

  // useEffect(() => {
  //   if (dateValue) {
  //     setCurrentDate({
  //       selectedDay: dateValue.getDate(),
  //       selectedMonth: dateValue.getMonth(),
  //       selectedYear: dateValue.getFullYear(),
  //     });
  //   }
  // }, [dateValue]);

  return (
    <div className="gap-1" ref={containerRef}>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        className="hidden w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
      <Popover open={dropdownOpen}>
        <PopoverTrigger
          id="toggler"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
        >
          <span
            className={clsx(currentDate.selectedYear > 0 && "text-gray-200")}
          >
            <CurrentDateDisplayer currentDate={currentDate} />
          </span>
          <span>
            <IoCalendarClearOutline className="text-cerulean-100/25" />
          </span>
        </PopoverTrigger>
        {error && (
          <span className="text-right text-xs font-bold text-red-500">
            {error.message}
          </span>
        )}
        <PopoverContent
          ref={ref}
          className="PopoverContent w-full rounded-lg border-0 bg-cerulean-900 p-0"
          id="modal"
        >
          <div className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 p-0">
            <DatePickerModal direction={direction} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
