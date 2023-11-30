import React, { Dispatch, SetStateAction, useContext } from "react";
import { View } from "../types";
import NavigationButton from "./navigation-button";
import DatePickerContext from "../context/context";

export default function Navigation({ views }: { views: string[] }) {
  return (
    <div className="flex items-center justify-around py-2 text-cerulean-100 bg-cerulean-950 rounded-lg border border-cerulean-100/25 px-2 gap-2">
      {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
    <GrFormPrevious className="text-sm" />
  </div> */}
      {views.map((view, index) => (
        <NavigationButton key={index} viewName={view} />
      ))}
      {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
    <GrFormNext className="text-sm" />
  </div> */}
    </div>
  );
}
