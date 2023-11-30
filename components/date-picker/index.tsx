"use client";

import React, { useState, useRef } from "react";
import DatePickerProvider from "./context/provider";
import DatePickerContainer from "./container";

export default function DatePicker() {
  return (
    <DatePickerProvider>
      <DatePickerContainer />
    </DatePickerProvider>
  );
}
