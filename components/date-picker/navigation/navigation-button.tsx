import React, { Dispatch, SetStateAction, useContext } from "react";
import { View } from "../types";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/dp-context";

interface NavigationButtonProps {
  name: string;
  value: string | number;
}

export default function NavigationButton({
  name,
  value,
}: NavigationButtonProps) {
  const { selectedView, setSelectedView } = useContext(DatePickerContext);
  return (
    <div
      className={`flex-1 rounded px-4 py-1 text-center text-sm transition duration-75 hover:cursor-pointer hover:bg-cerulean-800 ${
        name === selectedView ? "bg-cerulean-800" : ""
      }`}
      onClick={() => {
        setSelectedView(name);
      }}
    >
      {value}
    </div>
  );
}
