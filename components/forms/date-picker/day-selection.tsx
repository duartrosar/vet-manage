import React from "react";
import DayTile from "./day-tile";

export default function DaySelection() {
  const tiles: number[] = [];
  const weekDays: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  for (let i = 0; i < 35; i++) {
    tiles.push(i + 1);
  }

  return (
    <>
      <div className="grid grid-cols-7 w-full gap-1">
        {weekDays.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg text-cerulean-100/50 text-sm mb-2"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="h-[200px] grid grid-cols-7 w-full gap-1">
        {tiles.map((value, index) => (
          <DayTile day={index} key={index} />
        ))}
      </div>
    </>
  );
}
