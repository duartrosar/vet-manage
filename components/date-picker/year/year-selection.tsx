import React, { Dispatch, SetStateAction } from "react";
import YearTile from "./year-tile";

export default function YearSelection() {
  const years: number[] = [];
  for (let i = 2013; i < 2013 + 12; i++) {
    years.push(i);
  }
  return (
    <div className="grid grid-cols-4 w-full gap-1 h-[228px]">
      {years.map((year, index) => (
        <YearTile key={index} year={year} />
      ))}
    </div>
  );
}