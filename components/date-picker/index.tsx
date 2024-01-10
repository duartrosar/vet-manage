"use client";
import DatePickerProvider from "./context/dp-provider";
import DatePickerContainer from "./date-picker-container";
import { FieldValues } from "react-hook-form";
import { DatePickerProps } from "./date-picker-container";

export default function DatePicker<T extends FieldValues>({
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePickerProvider>
      <DatePickerContainer<T> {...props} />
    </DatePickerProvider>
  );
}
