import React, { Dispatch, SetStateAction, useState } from "react";
import MonthTile from "./month-tile";
import { MONTHS } from "../constants";

export default function MonthSelection() {
  return (
    <div className="grid w-full grid-cols-4 gap-1 pt-2">
      {MONTHS.map((month, index) => (
        <MonthTile key={index} month={index} />
      ))}
    </div>
  );
}
