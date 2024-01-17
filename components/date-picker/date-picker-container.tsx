import React, { useContext, useEffect, useRef, useState } from "react";
import DatePickerModal from "./modal";
import DatePickerContext from "./context/dp-context";
import { IoCalendarClearOutline } from "react-icons/io5";
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
import { useOnClickOutside } from "usehooks-ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CurrentDateDisplayer from "./date-displayer";
import clsx from "clsx";
import { FormMessage } from "@/components/ui/form";

export interface DatePickerProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  dateValue?: Date | null;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  clearErrors: UseFormClearErrors<T>;
}

export default function DatePickerContainer<T extends FieldValues>({
  name,
  label,
  dateValue,
  clearErrors,
  register,
  error,
  setValue,
}: DatePickerProps<T>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentDate, dropdownOpen, setDropdownOpen, setCurrentDate } =
    useContext(DatePickerContext);

  useOnClickOutside(contentRef, (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    const id = element.id;

    if (id === "toggler" || id === "icon") return;

    setDropdownOpen(!dropdownOpen);
  });

  useEffect(() => {
    setValue<Path<T>>(
      name as Path<T>,
      new Date(
        currentDate.selectedYear,
        currentDate.selectedMonth,
        currentDate.selectedDay,
      ) as PathValue<T, Path<T>>,
    );
  }, []);

  useEffect(() => {
    if (
      currentDate.selectedDay < 0 ||
      currentDate.selectedMonth < 0 ||
      currentDate.selectedYear < 0
    )
      return;

    const newDate = new Date(
      currentDate.selectedYear,
      currentDate.selectedMonth,
      currentDate.selectedDay,
    );

    setValue<Path<T>>(name as Path<T>, newDate as PathValue<T, Path<T>>);

    clearErrors(name as Path<T>);
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

  return (
    <div className="relative gap-1 space-y-0 rounded-tl-lg">
      <label htmlFor={name} className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </label>
      <input
        type="hidden"
        // value={format(new Date(), "PPP")}
        {...(register(name as Path<T>) as UseFormRegisterReturn)}
        className="hidden"
        name={name}
      />
      <Popover open={dropdownOpen}>
        <PopoverTrigger
          id="toggler"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={clsx(
            `flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`,
            error && "border-red-500",
          )}
        >
          <span
            className={clsx(currentDate.selectedYear > 0 && "text-gray-200")}
          >
            <CurrentDateDisplayer currentDate={currentDate} />
          </span>
          <span>
            <IoCalendarClearOutline
              id="icon"
              className="text-cerulean-100/25"
            />
          </span>
        </PopoverTrigger>
        {error && (
          <span className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500">
            {error.message}
          </span>
        )}
        <PopoverContent
          ref={contentRef}
          className="PopoverContent w-full rounded-lg border-0 bg-cerulean-900 p-0"
          id="modal"
        >
          <div className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 p-0">
            <DatePickerModal />
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500" />
    </div>
  );
}
