"use client";

import React, { useState, useRef } from "react";
import DatePickerProvider from "./context/dp-provider";
import DatePickerContainer from "./date-picker-container";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { CustomInputProps } from "@/lib/types";
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
