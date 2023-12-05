"use client";

import React, { useState, useRef } from "react";
import DatePickerProvider from "./context/dp-provider";
import DatePickerContainer from "./dp-container";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { CustomInputProps } from "@/lib/types";

export default function DatePicker<T extends FieldValues>({
  name,
  type = "text",
  register,
  error,
  setValue,
  clearErrors,
  dateValue,
}: CustomInputProps<T>) {
  return (
    <DatePickerProvider>
      <DatePickerContainer
        name={name}
        type={type}
        dateValue={dateValue}
        register={register}
        error={error}
        setValue={setValue}
        clearErrors={clearErrors}
      />
    </DatePickerProvider>
  );
}
